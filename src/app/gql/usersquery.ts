import { gql } from 'apollo-angular';

export const GET_USERS = gql`
  {
    allUsers {
      id
      firstName
      lastName
      age
      # country
      email
      password
      contactNumber
    }
  }
`;
