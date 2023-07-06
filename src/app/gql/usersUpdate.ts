import { gql } from 'apollo-angular';

export const UPDATE_USER = gql`
  mutation (
    $id: ID!
    $firstName: String!
    $lastName: String!
    $age: String!
    $contactNumber: String!
    $email: String!
    $country: String!
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      age: $age
      contactNumber: $contactNumber
      email: $email
      country: $country
    ) {
      firstName
      lastName
      age
      contactNumber
      email
      country
    }
  }
`;
