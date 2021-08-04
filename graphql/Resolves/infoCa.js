const { UserInputError } = require('apollo-server');
const Ca = require('../../models/Ca');

module.exports = {
    Query: {
        async getCa(_) {
            try {
                const ca = await Ca.findOne().skip(0).limit(1);

                return {
                    ...ca,
                    tableData: JSON.parse(ca.tableData),
                    _id: ca._id,
                    createdAt: ca.createdAt,
                    totalCa: JSON.parse(ca.totalCa)
                };
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        async createCa(_, { caInput }, context) {
            try {
                if (caInput?.length <= 0) {
                    throw new UserInputError('News is empty!', {
                        news: 'Info ca field is empty !'
                    })
                };

                const newCa = new Ca(caInput);

                const result = await newCa.save();

                context.pubsub.publish('NEW_CA', {
                    newCa: {
                        ...result,
                        tableData: JSON.parse(result.tableData),
                        _id: result._id,
                        createdAt: result.createdAt,
                        totalCa: JSON.parse(result.totalCa)
                    }
                })

                return { message: 'Create success!' };
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Subscription: {
        newCa: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_CA')
        }
    }
};
