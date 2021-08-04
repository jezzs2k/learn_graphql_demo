const { ApolloServer, PubSub } = require('apollo-server');

const mongoose = require('mongoose');
const config = require('config');

//config
const dbConfig = config.get('Customer.dbConfig');

//DYNO_HEROKU
const wakeUpDyno = require('./wakeUpDyno');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/Resolves');

const PORT = process.env.PORT || 5000;

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res, pubsub })
});

mongoose.connect(dbConfig.mongoDB, {
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB connected');
    wakeUpDyno(28)
    return server.listen(PORT);
}).then((res) => console.log(`Server running at ${res.url}`));