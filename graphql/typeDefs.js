const gql = require('graphql-tag');

module.exports = gql`
    type CommentItem{
        id: ID!
        createdAt: String!
        username: String!
        body: String!
        user: String!
    }
    type Like{
        id: ID!
        createdAt: String!
        username: String!
        user: String!
    }
    type Post {
        id: ID!
        username: String!
        body: String!
        user: String!
        createdAt: String!
        likes: [Like!]
        comments: [CommentItem!]
        likeCount: Int!
        commentCount: Int!
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
    type ResponseDeletePost {
            message: String
    }
    type Query {
        getPosts: [Post]
        getPost(post: PostParams): Post
    }
    type Mutation {
        register(registerInput: RegisterInput): User
        login(loginInput: LoginInput): User
        createPost(post: CreateParams): Post
        likePost(postId: String): Post
        deletePost(postId: String): ResponseDeletePost
        createComment(postId: String, body: String): Post
        deleteComment(postId: String, commentId: String): Post
    }
    type Subscription {
        newPost: Post!
    }
`;
