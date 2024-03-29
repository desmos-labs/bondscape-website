import useCustomLazyQuery from "@/hooks/graphql/useCustomLazyQuery";
import GetEventById from "@/services/graphql/queries/bondscape/GetEventById";
import { CreateEventValues, GQLEventsResult } from "@/types/event";
import { FormikProps } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";

const useHooks = (eventId?: string) => {
  const [getEventById] = useCustomLazyQuery<GQLEventsResult>(GetEventById);
  const [isLoading, setIsLoading] = useState(eventId !== undefined);
  const [initialValues, setInitialValues] = useState<CreateEventValues>({
    status: "draft",
    eventName: "",
    eventDetails: "",
    organizers: [],
    website: "",
    tags: [],
    categories: [],
    coverPicUrl: "",
    coverPic: undefined,
    startDate: undefined,
    endDate: undefined,
    placeId: undefined,
    location: undefined,
    ticketsCategories: [],
    isPrivate: false,
  });

  // Memoized values
  const title = useMemo(() => {
    if (eventId) return "Edit Event";
    return "Create Event";
  }, [eventId]);

  const draftButtonText = useMemo(() => {
    if (eventId) return "Edit Draft";
    return "Save as Draft";
  }, [eventId]);

  const publishButtonText = useMemo(() => {
    if (eventId) return "Edit and Publish";
    return "Create Event";
  }, [eventId]);

  // Callbacks
  /**
   * Set initial values from atom state
   */
  const setInitialValuesFromQuery = useCallback(async () => {
    if (!eventId) return;
    setIsLoading(true);
    const result = await getEventById({
      variables: {
        eventId,
      },
    });
    setIsLoading(false);
    if (!result) return;
    const event = result.events[0];
    setInitialValues((prev) => {
      return {
        ...prev,
        eventName: event.name,
        eventDetails: event.description,
        coverPicUrl: event.coverPic,
        startDate: event.startDate,
        startDateLocalized: event.startDateLocalized,
        endDate: event.endDate,
        endDateLocalized: event.endDateLocalized,
        categories: event.categories.map((category) => category.category),
        placeId: event.googlePlaceId,
        location: event.location,
        organizers: event.organizers,
        tags: event.tags,
        website: event.website,
        isPrivate: event.isPrivate,
        ticketsCategories: event.ticketsCategories.map((ticketCategory) => {
          return {
            id: ticketCategory.id,
            category: ticketCategory.name,
            description: ticketCategory.description,
            availableFrom: ticketCategory.startDateLocalized,
            availableUntil: ticketCategory.endDateLocalized,
            ticketsSold: ticketCategory.ticketsSold?.aggregate.count || 0,
            maxQuantityPerPerson: ticketCategory.ticketsPerUser,
            maxQuantityPerCategory: ticketCategory.totalTicketsAvailable,
            validators: ticketCategory.validators || [],
            coverPicUrl: ticketCategory.coverPicUrl,
          };
        }),
      };
    });
  }, [eventId, getEventById]);

  const handleButtonClick = async (
    formikProps: FormikProps<CreateEventValues>,
  ) => {
    const { submitForm } = formikProps;
    await submitForm();
  };

  // Effects
  useEffect(() => {
    setInitialValuesFromQuery();
  }, [setInitialValuesFromQuery]);

  // Form validation
  const validateSchema = Yup.object().shape({
    eventName: Yup.string().required("The event name is required."),
    eventDetails: Yup.string().required("Event's details are required."),
  });

  return {
    isLoading,
    draftButtonText,
    publishButtonText,
    title,
    initialValues,
    validateSchema,
    handleButtonClick,
  };
};

export default useHooks;
