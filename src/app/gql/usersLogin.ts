import { gql } from 'apollo-angular';

export const LOGIN_USER = gql`
  query login($variable: UserFilter) {
    allUsers(filter: $variable) {
      id
      firstName
      lastName
      age
      # country
      email
      contactNumber
      password
    }
  }
`;
