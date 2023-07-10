import { gql } from 'apollo-angular';

export const CREATE_USER = gql`
  mutation (
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $age: String!
    $contactNumber: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      #   country: $country
      age: $age
      contactNumber: $contactNumber
    ) {
      firstName
      lastName
      email
      password
      #   country
      age
      contactNumber
    }
  }
`;
