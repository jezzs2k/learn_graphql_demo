const { ApolloServer } = require('apollo-server');

const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const MONGO_DB = require('./config').mongoDB;
const resolvers = require('./graphql/Resolves');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
});

mongoose.connect(MONGO_DB, {
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB connected');
    return server.listen(5000);
}).then((res) => console.log(`Server running at ${res.url}`));