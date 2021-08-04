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
    type TableCaData {
        dies: String!
        province: String!
        todayCa: String!
        totalCa: String!
    }
    type contryTotal {
        beingTreated: String!
        die: String!
        title: String!
        treatment: String!
    } 
    type TotalCa {
        vi: contryTotal
        world: contryTotal
    }
    type Ca {
        createdAt: String!
        _id: ID!
        totalCa: TotalCa!
        tableData: [TableCaData!]
    }
    type News {
        image: String!
        title: String!
        date: String!
        content: String!
        detail: String!
        newId: String!
        createdAt: String!
        _id: ID!
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
    input NewsInput {
        image: String!
        title: String!
        date: String!
        content: String!
        detail: String!
        newId: String!
    }
    input CaInput {
        totalCa: String!
        tableData: String!
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
        getNews(pageIndex: String!): [News!]
        getCa: Ca!
    }
    type Mutation {
        register(registerInput: RegisterInput): User
        login(loginInput: LoginInput): User
        createPost(post: CreateParams): Post
        likePost(postId: String): Post
        deletePost(postId: String): ResponseDeletePost
        createComment(postId: String, body: String): Post
        deleteComment(postId: String, commentId: String): Post
        createNews(news: [NewsInput!]): ResponseDeletePost
        createCa(caInput: CaInput!): ResponseDeletePost
    }
    type Subscription {
        newPost: [News!]
        newCa: Ca!
    }
`;
