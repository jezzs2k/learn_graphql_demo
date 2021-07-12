const postResol = require('./posts');
const userResol = require('./users');

module.exports = {
    Query: {
        ...postResol.Query
    },
    Mutation: {
        ...userResol.Mutation
    }
}