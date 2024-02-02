import UserModel from '../models/user';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
require('dotenv').config();

const hashPassword = (password) => {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(12));
};

export const registerService = ({ phone, password, name }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findOne({ phone });

            if (user) {
                resolve({
                    err: 2,
                    msg: 'Phone number has already existed',
                    token: null,
                });
            } else {
                const newUser = new UserModel({
                    id: v4(),
                    name,
                    password: hashPassword(password),
                    phone,
                    roleCode: 'R2',
                    positionCode: 'P1',
                });

                await newUser.save();

                const token = jwt.sign(
                    {
                        id: newUser.id,
                        phone: newUser.phone,
                        roleCode: newUser.roleCode,
                    },
                    process.env.SECRET_KEY,
                    { expiresIn: '2d' }
                );

                resolve({
                    err: token ? 0 : 2,
                    msg: token ? 'Register is successful' : 'Failed to register',
                    token: token || null,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const loginService = ({ phone, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findOne({ phone });

            if (user) {
                const isCorrectPassword = bcryptjs.compareSync(password, user.password);

                if (isCorrectPassword) {
                    const token = jwt.sign(
                        {
                            id: user.id,
                            phone: user.phone,
                            roleCode: user.roleCode,
                        },
                        process.env.SECRET_KEY,
                        { expiresIn: '2d' }
                    );

                    resolve({
                        err: token ? 0 : 2,
                        msg: token ? 'Login is successful' : 'Failed to login',
                        token: token || null,
                    });
                } else {
                    resolve({
                        err: 2,
                        msg: 'Password is wrong!',
                        token: null,
                    });
                }
            } else {
                resolve({
                    err: 2,
                    msg: 'Phone number not found!',
                    token: null,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
