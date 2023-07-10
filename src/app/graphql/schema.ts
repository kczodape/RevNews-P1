import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    contactNumber: Int!
    age: Int!
    # country: String!
    email: String!
    password: String!
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User!]!
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      contactNumber: Int!
      age: Int!
      # country: String!
      email: String!
      password: String!
    ): User!

    updateUser(
      id: ID!
      firstName: String
      lastName: String
      contactNumber: Int
      age: Int
      # country: String
      email: String
      password: String
    ): User!

    deleteUser(id: ID!): Boolean!
  }
`;
