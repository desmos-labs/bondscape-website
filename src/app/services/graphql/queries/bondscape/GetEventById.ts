import { gql } from "@apollo/client";
import EventsFields from "@/services/graphql/queries/bondscape/fragments/EventsFields";
import ProfileFields from "@/services/graphql/queries/desmos/fragments/ProfilesFields";
import ImageHashFields from "@/services/graphql/queries/bondscape/fragments/ImageHashFields";

const GetEventById = gql`
  ${EventsFields}
  ${ProfileFields}
  ${ImageHashFields}
  query GetEventById($activeAddress: String, $eventId: String)
  @api(name: bondscape) {
    events(where: { id: { _eq: $eventId } }) {
      ...EventsFields
      userLikesAggregate: likes_aggregate(
        where: { liker_address: { _eq: $activeAddress } }
      ) {
        aggregate {
          count
        }
      }
      memories(limit: 4, order_by: { creation_time: desc }) {
        id
        eventId: event_id
        creator {
          ...ProfileFields
        }
        imageHash: image_hash {
          ...ImageHashFields
        }
        creationTime: creation_time
        likesCount: likes_count
        detailsLink: details_link
      }
    }
  }
`;

export default GetEventById;