const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Devices = require('../../models/Devices');
const { UserInputError } = require('apollo-server');

const { validateRegisterForm, validateLoginInput } = require('../../utils/validateRegisterForm');
const User = require('../../models/User');
const config = require('config');

function genarateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, config.Customer.secret.key, { expiresIn: '1h' })
}

module.exports = {
    Mutation: {
        async registerDeviceToken(_, { deviceToken }) {
            const devices = await Devices.find();

            if (devices?.length <= 0) {
                const newDeive = new Devices({
                    deviceToken
                });

                await newDeive.save();

                return { message: 'Write new device success' };
            }

            const deviceIndex = devices.findIndex(item => item.deviceToken === deviceToken);

            if (deviceIndex === -1) {
                const newDeive = new Devices({
                    deviceToken
                });

                await newDeive.save();

                return { message: 'Write new device success' }
            } else {
                return { message: 'DeviceToken is exists' }
            }
        },
        async login(_, { loginInput: { username, password } }) {
            //validate login inputs
            const { valid, errors } = validateLoginInput({ username, password });

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ username });

            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError("User credential!", {
                    errors,
                });
            }

            const isMatchPassword = await bcrypt.compare(password, user.password);

            if (!isMatchPassword) {
                throw new UserInputError("Password incorrect !", {
                    errors: {
                        password: 'Password credential',
                    }
                });
            };

            return {
                ...user._doc,
                id: user._id,
                token: genarateToken(user),
            }
        },
        async register(_, { registerInput: { username, email, password, comfirmPassword } }, context, info) {
            //validate register inputs
            const { valid, errors } = validateRegisterForm({ username, email, password, comfirmPassword });

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            password = await bcrypt.hash(password, 12);

            const user = await User.findOne({ username });

            if (user) {
                throw new UserInputError('This username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }

            const newUser = new User({
                username,
                password,
                email,
            });

            const res = await newUser.save();

            return {
                ...res._doc,
                id: res._id,
                token: genarateToken(res),
            }
        }
    }
};
