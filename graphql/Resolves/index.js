const postResol = require('./posts');
const userResol = require('./users');
const commentResol = require('./comments');
const newsResol = require('./news');

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postResol.Query,
        ...newsResol.Query
    },
    Mutation: {
        ...userResol.Mutation,
        ...postResol.Mutation,
        ...commentResol.Mutation,
        ...newsResol.Mutation,
    },
    Subscription: {
        ...newsResol.Subscription
    }
}