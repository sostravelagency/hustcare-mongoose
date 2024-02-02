import mongoose from 'mongoose';
import UserModel from '../models/user';
import PostModel from '../models/post';
import AttributeModel from '../models/attribute';
import ImageModel from '../models/image';
import OverviewModel from '../models/overview';
import ProvinceModel from '../models/province';
import PriceModel from '../models/price';
import AreaModel from '../models/area';
import LabelModel from '../models/label';

import bcryptjs from 'bcryptjs';
import { v4 } from 'uuid';
import chothuecanho from '../../data/chothuecanho.json';
import chothuephongtro from '../../data/chothuephongtro.json';
import chothuenha from '../../data/nhachothue.json';
import { getNumberFromString, getNumberFromStringv2 } from '../utils/common';
import generateCode from '../utils/generateCode';
import { dataPrice, dataArea } from '../utils/data';

require('dotenv').config();

const dataBody = [
    {
        body: chothuephongtro.body,
        code: 'CTPT',
    },
    {
        body: chothuecanho.body,
        code: 'CTCH',
    },
    {
        body: chothuenha.body,
        code: 'CTN',
    },
];

const hashPassword = (password) => {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(12));
};

export const insertService = async () => {
    try {
        const provinceCodes = [];
        const labelCodes = [];

        for (const cate of dataBody) {
            for (const item of cate.body) {
                let postId = v4();
                let labelCode = generateCode(item?.header?.class?.classType).trim();

                if (!labelCodes.some((item) => item?.code === labelCode)) {
                    labelCodes.push({
                        code: labelCode,
                        value: item?.header?.class?.classType.trim(),
                    });
                }

                let attributeId = v4();
                let userId = v4();
                let overviewId = v4();
                let imageId = v4();
                let currentArea = getNumberFromString(item?.header?.attributes?.acreage);
                let currentPrice = getNumberFromString(item?.header?.attributes?.price);
                let provinceCode = generateCode(item?.header?.address?.split(',').slice(-1)[0]);

                if (!provinceCodes.some((item) => item?.code === provinceCode)) {
                    provinceCodes.push({
                        code: provinceCode,
                        value: item?.header?.address?.split(',').slice(-1)[0],
                    });
                }

                await PostModel.create({
                    id: postId,
                    title: item?.header?.title,
                    star: item?.header?.star,
                    labelCode: labelCode,
                    address: item?.header?.address,
                    attributeId,
                    categoryCode: cate.code,
                    description: JSON.stringify(item?.mainContent?.content),
                    status: 'checked',
                    userId,
                    overviewId,
                    imageId,
                    areaCode: dataArea.find((area) => area.max > currentArea && area.min <= currentArea)?.code,
                    priceCode: dataPrice.find((price) => price.max > currentPrice && price.min <= currentPrice)?.code,
                    provinceCode,
                    priceNumber: getNumberFromStringv2(item?.header?.attributes?.price),
                    areaNumber: getNumberFromStringv2(item?.header?.attributes?.acreage),
                });

                await AttributeModel.create({
                    id: attributeId,
                    price: item?.header?.attributes.price,
                    acreage: item?.header?.attributes.acreage,
                    published: item?.header?.attributes.published,
                    hashtag: item?.header?.attributes.hashtag,
                });

                await ImageModel.create({
                    id: imageId,
                    image: JSON.stringify(item?.images),
                });

                await OverviewModel.create({
                    id: overviewId,
                    code: item?.overview?.content.find((i) => i.name === 'Mã tin:')?.content,
                    area: item?.overview?.content.find((i) => i.name === 'Khu vực')?.content,
                    type: item?.overview?.content.find((i) => i.name === 'Loại tin rao:')?.content,
                    target: item?.overview?.content.find((i) => i.name === 'Đối tượng thuê:')?.content,
                    bonus: item?.overview?.content.find((i) => i.name === 'Gói tin:')?.content,
                    created: item?.overview?.content.find((i) => i.name === 'Ngày đăng:')?.content,
                    expire: item?.overview?.content.find((i) => i.name === 'Ngày hết hạn:')?.content,
                });

                await UserModel.create({
                    id: userId,
                    name: item?.contact?.content.find((i) => i.name === 'Liên hệ:')?.content,
                    password: hashPassword('123456'),
                    phone: item?.contact?.content.find((i) => i.name === 'Điện thoại:')?.content,
                    zalo: item?.contact?.content.find((i) => i.name === 'Zalo')?.content,
                });

                await ProvinceModel.findOrCreate({
                    where: { code: provinceCode },
                    defaults: {
                        code: provinceCode,
                        value: item?.header?.address?.split(',').slice(-1)[0],
                    },
                });
            }
        }

        for (const item of provinceCodes) {
            await ProvinceModel.create(item);
        }

        for (const item of labelCodes) {
            await LabelModel.create(item);
        }

        return 'oke !';
    } catch (error) {
        throw error;
    }
};

export const createPriceAndArea = async () => {
    try {
        for (const item of dataPrice) {
            await PriceModel.create({
                code: item?.code,
                value: item?.value,
            });
        }

        for (const item of dataArea) {
            await AreaModel.create({
                code: item?.code,
                value: item?.value,
            });
        }

        return 'add prices and areas oke !';
    } catch (error) {
        throw error;
    }
};
