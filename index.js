const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');

const MONGO_DB = require('./config').mongoDB;

const typeDefs = gql`
    type Post {
        id: ID!
        username: String!
        body: String!
        createAt: String!
    }
    type Query {
        getPosts: [Post]
    }
`;

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();

                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGO_DB, {
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB connected');
    return server.listen(5000);
}).then((res) => console.log(`Server running at ${res.url}`));