import { gql } from "@apollo/client";
import EventsFields from "./fragments/EventsFields";
import ProfileFields from "../desmos/fragments/ProfilesFields";
import ImageHashFields from "./fragments/ImageHashFields";

const GetMyUpcomingEvents = gql`
  ${EventsFields}
  ${ProfileFields}
  ${ImageHashFields}
  query GetMyUpcomingEvents(
    $creatorAddress: String
    $currentDate: timestamptz!
    $offset: Int!
    $limit: Int!
  ) @api(name: bondscape) {
    events(
      offset: $offset
      limit: $limit
      order_by: { start_date: asc }
      where: {
        _and: [
          { organizers: { organizer_address: { _eq: $creatorAddress } } }
          {
            _or: [
              { end_date: { _gte: $currentDate } }
              { end_date: { _is_null: true } }
            ]
          }
          { status: { _eq: "published" } }
        ]
      }
    ) {
      ...EventsFields
    }
  }
`;

export default GetMyUpcomingEvents;
