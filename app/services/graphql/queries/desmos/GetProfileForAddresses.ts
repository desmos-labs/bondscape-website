import { gql } from "@apollo/client";
import ProfileFields from "./fragments/ProfilesFields";

const GetProfileForAddresses = gql`
  ${ProfileFields}
  query GetProfileForAddresses($addresses: [String!]) @api(name: desmos) {
    profile(where: { address: { _in: $addresses } }) {
      ...ProfileFields
    }
  }
`;

export default GetProfileForAddresses;
