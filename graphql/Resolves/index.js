const postResol = require('./posts');
const userResol = require('./users');
const commentResol = require('./comments');
const newsResol = require('./news');
const caResol = require('./infoCa');
const wakeupDynoResol = require('./wakeupDyno');

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postResol.Query,
        ...newsResol.Query,
        ...caResol.Query,
        ...wakeupDynoResol.Query
    },
    Mutation: {
        ...userResol.Mutation,
        ...postResol.Mutation,
        ...commentResol.Mutation,
        ...newsResol.Mutation,
        ...caResol.Mutation
    },
    Subscription: {
        ...newsResol.Subscription,
        ...caResol.Subscription
    }
}