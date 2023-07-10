import { gql } from 'apollo-angular';

export const GET_USERS_EMAIL = gql`
  {
    allUsers {
      email
    }
  }
`;
