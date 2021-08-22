const { ApolloServer, PubSub } = require('apollo-server');

const mongoose = require('mongoose');
const config = require('config');

//config
const dbConfig = config.get('Customer.dbConfig');

//DYNO_HEROKU
// const wakeUpDyno = require('./wakeUpDyno');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/Resolves');

const PORT = process.env.PORT || 5001;

const pubsub = new PubSub();

const myPlugin = {
    // Fires whenever a GraphQL request is received from a client.
    async requestDidStart(requestContext) {
        console.log('Request started! Query:\n' +
            requestContext.request.query);

        return {
            // Fires whenever Apollo Server will parse a GraphQL
            // request to create its associated document AST.
            async parsingDidStart(requestContext) {
                console.log('Parsing started!');
            },

            // Fires whenever Apollo Server will validate a
            // request's document AST against your GraphQL schema.
            async validationDidStart(requestContext) {
                console.log('Validation started!');
            },

        }
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res, pubsub }),
    plugins: [myPlugin]
});

mongoose.connect(dbConfig.mongoDB, {
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB connected');
    // wakeUpDyno(28)
    return server.listen(PORT);
}).then((res) => console.log(`Server running at ${res.url}`));