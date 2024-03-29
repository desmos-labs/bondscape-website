import { EventRequestParams } from "@/types/event";
import { ResultAsync } from "neverthrow";
import axiosInstance from "../../index";

const CreateEvent = ({
  status,
  coverPicUrl,
  eventName,
  eventDetails,
  startDate,
  endDate,
  organizersAddresses,
  categoriesIds,
  placeId,
  tags,
  website,
  isPrivate,
}: EventRequestParams): ResultAsync<any, Error> => {
  return ResultAsync.fromPromise(
    axiosInstance.post("/events", {
      status,
      name: eventName,
      description: eventDetails,
      cover_picture_url: coverPicUrl,
      start_date: startDate,
      end_date: endDate,
      website: website,
      google_place_id: placeId,
      organizers_addresses: organizersAddresses,
      categories_ids: categoriesIds,
      tags: tags,
      is_private: isPrivate,
    }),
    (e: any) => e ?? Error("Error creating event"),
  ).map((response) => {
    return {
      data: {
        event_id: response.data.event_id,
      },
      type: "create",
    };
  });
};

export default CreateEvent;
