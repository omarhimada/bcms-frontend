import { gql } from "@apollo/client";

// Get all services
export const GET_SERVICES = gql`
  query ServiceCategories {
    serviceCategories {
      title
      services {
        name
        price
        per
        onSale
      }
    }
  }
`;
