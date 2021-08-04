const { UserInputError } = require('apollo-server');
const News = require('../../models/News');

module.exports = {
    Query: {
        async getNews(_, { pageIndex }) {
            try {
                const numPageIndex = Number(pageIndex);

                const start = numPageIndex ? (numPageIndex - 1) * 20 : 0;

                const news = await News.find().skip(start).limit(20);

                return news
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        async createNews(_, { news }, context) {
            try {
                const parseNews = JSON.parse(news);
                if (parseNews?.length <= 0) {
                    throw new UserInputError('News is empty!', {
                        news: 'News field is empty !'
                    })
                };

                await News.insertMany(parseNews, (err, doc) => {
                    if (err) {
                        console.log(err);
                    } else {
                        context.pubsub.publish('NEWS_POST', {
                            newPost: doc
                        });
                    }
                })

                return { message: 'Create success!' };
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Subscription: {
        newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEWS_POST')
        }
    }
};
