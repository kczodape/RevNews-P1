import { gql } from 'apollo-angular';

export const DELETE_USER = gql`
  mutation ($id: ID!) {
    removeUser(id: $id) {
      id
    }
  }
`;
