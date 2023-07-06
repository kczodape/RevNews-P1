import { gql } from 'apollo-angular';

const GET_ALL_USERS = gql`
  query {
    users {
        id
        firstName
        lastName
        contactNumber
        age
        country
        email
        password
    }
  }
`;

const ADD_ALL_USERS = gql`
  mutation addAllUsers($firstName: String!, $lastName: String!, $contactNumber: number!, $age: numer!, $country: String!, $email: String!, $password: String!) {
    addTodo(firstName: $firstName, lastName: $lastName, contactNumber: $contactNumber, age: $age, country: $country, email: $email, password: $password) {
      id
      firstName
      lastName
      contactNumber
      age
      country
      email
      password
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

export { GET_ALL_USERS, ADD_ALL_USERS, DELETE_USER };
