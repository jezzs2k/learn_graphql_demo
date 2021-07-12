const gql = require('graphql-tag');

module.exports = gql`
    type Post {
        id: ID!
        username: String!
        body: String!
        createdAt: String!
    }
    type User {
        id: ID!
        email: String!
        username: String!
        token: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        comfirmPassword: String!
        email: String!
    }
    input LoginInput {
        username: String!
        password: String!
    }
    type Query {
        getPosts: [Post]
    }
    type Mutation {
        register(registerInput: RegisterInput): User
        login(loginInput: LoginInput): User
    }
`;
