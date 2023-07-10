import fs from 'fs-extra';
import { ApolloServer, gql } from 'apollo-server';
import { typeDefs as importedTypeDefs } from '../graphql/schema';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  age: number;
  // country: string;
  email: string;
  password: string;
}

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    contactNumber: String!
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
      contactNumber: String!
      age: Int!
      # country: String!
      email: String!
      password: String!
    ): User!

    updateUser(
      id: ID!
      firstName: String
      lastName: String
      contactNumber: String
      age: Int
      # country: String
      email: String
      password: String
    ): User!

    deleteUser(id: ID!): Boolean!
  }
`;

const DB_PATH = './db.json';

const readDbFile = async () => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeDbFile = async (data: any) => {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error('Failed to write to the database file.');
  }
};

const resolvers = {
  Query: {
    getUser: async (parent: any, { id }: { id: string }) => {
      const users = await readDbFile();
      return users.find((user: User) => user.id === id);
    },
    getAllUsers: async () => {
      return await readDbFile();
    },
  },
  Mutation: {
    createUser: async (
      parent: any,
      {
        firstName,
        lastName,
        contactNumber,
        age,
        /*country,*/ email,
        password,
      }: User
    ) => {
      const users = await readDbFile();

      const user = {
        id: String(users.length + 1),
        firstName,
        lastName,
        contactNumber,
        age,
        // country,
        email,
        password,
      };

      users.push(user);

      await writeDbFile(users);

      return user;
    },
    updateUser: async (
      parent: any,
      {
        id,
        firstName,
        lastName,
        contactNumber,
        age,
        /*country,*/ email,
        password,
      }: User
    ) => {
      const users = await readDbFile();

      const user = users.find((user: User) => user.id === id);

      if (!user) {
        throw new Error('User not found');
      }

      if (firstName) {
        user.firstName = firstName;
      }

      if (lastName) {
        user.lastName = lastName;
      }

      if (contactNumber) {
        user.contactNumber = contactNumber;
      }

      if (age) {
        user.age = age;
      }

      // if (country) {
      //   user.country = country;
      // }

      if (email) {
        user.email = email;
      }

      if (password) {
        user.password = password;
      }

      await writeDbFile(users);

      return user;
    },
    deleteUser: async (parent: any, { id }: { id: string }) => {
      const users = await readDbFile();

      const index = users.findIndex((user: User) => user.id === id);

      if (index === -1) {
        throw new Error('User not found');
      }

      users.splice(index, 1);

      await writeDbFile(users);

      return true;
    },
  },
};

// Rest of your server setup code
const server = new ApolloServer({ typeDefs: importedTypeDefs });
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
