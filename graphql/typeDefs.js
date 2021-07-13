const gql = require('graphql-tag');

module.exports = gql`
    type Post {
        id: ID!
        username: String!
        body: String!
        user: String!
        createdAt: String!
        likes: [Like!]
        comments: [Comment!]
    }
    type Comment{
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like{
        id: ID!
        createdAt: String!
        username: String!
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
    input PostParams {
        postId: String!
    }
    input CreateParams {
        body: String!
    }
    type Query {
        getPosts: [Post]
        getPost(post: PostParams): Post
    }
    type Mutation {
        register(registerInput: RegisterInput): User
        login(loginInput: LoginInput): User
        createPost(post: CreateParams): Post
    }
`;
