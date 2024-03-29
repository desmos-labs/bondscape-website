import { gql } from "@apollo/client";
import EventsFields from "./fragments/EventsFields";

const GetMyPastEvents = gql`
  ${EventsFields}
  query GetMyPastEvents(
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
          { start_date: { _lt: $currentDate } }
          { end_date: { _lt: $currentDate } }
          { status: { _eq: "published" } }
        ]
      }
    ) {
      ...EventsFields
    }
  }
`;

export default GetMyPastEvents;
