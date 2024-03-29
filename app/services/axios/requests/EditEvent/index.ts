import { EventRequestParams } from "@/types/event";
import { ResultAsync } from "neverthrow";
import axiosInstance from "../../index";

const EditEvent = ({
  eventId,
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
}: EventRequestParams & {
  eventId: string;
}): ResultAsync<
  {
    data: {
      event_id: string;
    };
    type: "create" | "edit";
  },
  Error
> => {
  return ResultAsync.fromPromise(
    axiosInstance.put(`/events/${eventId}`, {
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
    (e: any) => e ?? Error("Error editing event"),
  ).map((response) => {
    return {
      data: {
        event_id: response.data.event_id,
      },
      type: "edit",
    };
  });
};

export default EditEvent;
