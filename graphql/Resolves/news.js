const { UserInputError } = require('apollo-server');
const News = require('../../models/News');
const Devices = require('../../models/Devices');
const { ParseDate } = require('../../utils/ParseDateStringToTimp');
const { PushNotifier } = require('../../utils/PushNotification');

const pushNotifier = new PushNotifier();

module.exports = {
    Query: {
        async getNews(_, { pageIndex }) {
            try {
                const numPageIndex = Number(pageIndex);

                const start = numPageIndex ? (numPageIndex - 1) * 20 : 0;

                const news = await News.find({}, {}, { sort: { 'createdAt': -1, 'realTimeOfNews': -1 } }).skip(start).limit(20);

                return news
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        async createNews(_, { news }, context) {
            try {
                let parseNews = JSON.parse(news);
                if (parseNews?.length <= 0) {
                    throw new UserInputError('News is empty!', {
                        news: 'News field is empty !'
                    })
                };

                parseNews = parseNews.map(item => {
                    return {
                        ...item,
                        realTimeOfNews: ParseDate(item.date)
                    }
                });

                const getAllNews = await News.find({}, {}, { sort: { 'createdAt': -1 } }).limit(20);

                const newsData = parseNews.filter((value) => {
                    return getAllNews.findIndex(item => {
                        return item.newId === value.newId
                    }) === -1
                });

                if (newsData?.length <= 0) {
                    throw new UserInputError('News is duplicated!', {
                        news: 'News field is duplicates news in the database !'
                    })
                };

                const devices = await Devices.find();

                if (devices.length > 0) {
                    const deviceTokens = devices.map(item => item.deviceToken);
                    pushNotifier.sendNotificationToDeviceIOS(deviceTokens, newsData[0]);
                };

                await News.insertMany(newsData, (err, doc) => {
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
