import PostModel from '../models/post';
import ImageModel from '../models/image';
import AttributeModel from '../models/attribute';
import OverviewModel from '../models/overview';
import UserModel from '../models/user';
import ProvinceModel from '../models/province';
import LabelModel from '../models/label';
import { Op } from 'sequelize';
import moment from 'moment';
import { v4 as generateId } from 'uuid';
import generateCode from '../utils/generateCode.js';
import generateDate from '../utils/generateDate.js';
import PostLikeModel from '../models/postLike.js';

export const getPosts = async () => {
    try {
        const response = await PostModel.findAll({
            raw: true,
            nest: true,
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'title', 'star', 'address', 'description', 'status'],
            include: [
                {
                    model: ImageModel,
                    as: 'images',
                    attributes: ['image']
                },
                {
                    model: AttributeModel,
                    as: 'attributes',
                    attributes: ['price', 'acreage', 'hashtag', 'published']
                },
                {
                    model: OverviewModel,
                    as: 'overviews',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: UserModel,
                    as: 'users',
                    attributes: ['name', 'phone', 'zalo', 'fbUrl']
                },
            ],
        });
        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Fail to get all posts service!',
            response
        };
    } catch (error) {
        throw error;
    }
};

export const getPostsLimitService = async ({ page, limit, order, address, ...query }, { priceNumber, areaNumber }) => {
    try {
        let offset = !page || +page <= 1 ? 0 : (+page - 1);
        const lim = +limit || +process.env.LIMIT;
        const options = {
            limit: lim,
            skip: +lim * offset,
            sort: order ? { [order]: 1 } : { createdAt: -1 },
        };

        if (priceNumber) query.priceNumber = { $gte: priceNumber[0], $lte: priceNumber[1] };
        if (areaNumber) query.areaNumber = { $gte: areaNumber[0], $lte: areaNumber[1] };
        if (address) {
            query.address = {
                $or: [
                    { $regex: address[0] },
                    { $regex: address[0]?.replace('Quận ', '') },
                    { $regex: address[0]?.replace('Huyện ', '') },
                    { $regex: address[0]?.replace('Tỉnh ', '') },
                    { $regex: address[0]?.replace('Thành phố ', '') }
                ]
            };
        }
        console.log(query)
        if (query.id) {
            query._id = query.id
        }
        if (query._id) {
            const posts = await PostModel.findById(query._id, null, options)
                .populate({
                    path: 'imageId',
                    select: 'image',
                    model: 'Image',
                    options: { refPath: 'imageId' },
                })
                .populate({
                    path: 'attributeId',
                    select: 'price acreage hashtag published',
                    model: 'Attribute',
                })
                .populate({
                    path: 'overviewId',
                    select: '-createdAt -updatedAt',
                    model: 'Overview',
                })
                .populate({
                    path: 'userId',
                    select: 'id avatar name phone zalo fbUrl positionCode',
                    model: 'User',
                })
                .select('id title star address categoryCode description priceCode status');

            const totalCount = await PostModel.countDocuments(query);

            return {
                err: posts ? 0 : 1,
                msg: posts ? 'OK' : 'Fail get all posts service!',
                response: {
                    count: totalCount,
                    rows: posts,
                },
            };
        }
        const posts = await PostModel.find(query, null, options)
            .populate({
                path: 'imageId',
                select: 'image',
                model: 'Image',
                options: { refPath: 'imageId' },
            })
            .populate({
                path: 'attributeId',
                select: 'price acreage hashtag published',
                model: 'Attribute',
            })
            .populate({
                path: 'overviewId',
                select: '-createdAt -updatedAt',
                model: 'Overview',
            })
            .populate({
                path: 'userId',
                select: 'id avatar name phone zalo fbUrl positionCode',
                model: 'User',
            })
            .select('id title star address categoryCode description priceCode status');

        const totalCount = await PostModel.countDocuments(query);

        return {
            err: posts ? 0 : 1,
            msg: posts ? 'OK' : 'Fail get all posts service!',
            response: {
                count: totalCount,
                rows: posts,
            },
        };
    } catch (error) {
        throw error;
    }
};


export const getNewPostsService = async () => {
    try {
        const response = await PostModel.findAll({
            raw: true,
            nest: true,
            include: [
                {
                    model: ImageModel,
                    as: 'images',
                    attributes: ['image']
                },
                {
                    model: AttributeModel,
                    as: 'attributes',
                    attributes: ['price', 'acreage', 'hashtag', 'published']
                },
                {
                    model: OverviewModel,
                    as: 'overviews',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
            ],
            attributes: ['id', 'title', 'star', 'createdAt', 'status'],
            offset: 0,
            limit: 10,
            order: [['createdAt', 'DESC']]
        });

        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Fail get all posts service!',
            response
        };
    } catch (error) {
        throw error;
    }
};

export const createNewPostsService = async (body, userId) => {
    try {
        const attributeId = generateId();
        const imageId = generateId();
        const overviewId = generateId();
        const labelCode = generateCode(body.label);
        const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
        const currentDate = generateDate();
        const arrUtilities = body.utilities.map(item => item.val);

        const attributeDoc = await AttributeModel.create({
            price: +body.priceNumber < 1 ? `${+body.priceNumber * 1000000} đồng/tháng` : `${body.priceNumber} triệu/tháng`,
            acreage: `${body.areaNumber} m2`,
            published: moment(new Date()).format('DD/MM/YYYY'),
            hashtag,
        });

        const imageDoc = await ImageModel.create({
            image: JSON.stringify(body.images)
        });

        const overviewDoc = await OverviewModel.create({
            code: hashtag,
            area: body.area,
            type: body.category,
            target: body.target,
            bonus: 'Tin miễn phí',
            created: currentDate.today,
            expire: currentDate.expireDay,
        });
        await PostModel.create({
            id: generateId(),
            title: body.title || null,
            labelCode: labelCode,
            address: body.address || null,
            attributeId: attributeDoc._id,
            categoryCode: body.categoryCode || null,
            description: JSON.stringify(body.description) || null,
            status: 'unChecked',
            userId,
            overviewId: overviewDoc._id,
            imageId: imageDoc._id,
            areaCode: body.areaCode || null,
            priceCode: body.priceCode || null,
            provinceCode: body?.province?.includes('Thành phố')
                ? generateCode(body?.province?.replace('Thành phố', ''))
                : generateCode(body?.province?.replace('Tỉnh', '')),
            priceNumber: body.priceNumber,
            areaNumber: body.areaNumber,
            utilities: arrUtilities.join('|')
        });

        const province = await ProvinceModel.findOneAndUpdate(
            {
                $or: [
                    { value: body?.province?.replace('Thành phố ', '') },
                    { value: body?.province?.replace('Tỉnh ', '') }
                ]
            },
            {
                $setOnInsert: {
                    code: body?.province?.includes('Thành phố')
                        ? generateCode(body?.province?.replace('Thành phố', ''))
                        : generateCode(body?.province?.replace('Tỉnh', '')),
                    value: body?.province?.includes('Thành phố')
                        ? body?.province?.replace('Thành phố ', '')
                        : body?.province?.replace('Tỉnh ', '')
                }
            },
            { upsert: true, new: true }
        );

        const label = await LabelModel.findOneAndUpdate(
            { code: labelCode },
            { $setOnInsert: { code: labelCode, value: body.label } },
            { upsert: true, new: true }
        );

        return {
            err: 0,
            msg: 'OK',
            province,
            label
        };
    } catch (error) {
        throw error;
    }
};


// Các hàm khác giữ nguyên theo cấu trúc hiện tại



export const getPostsLimitAdminService = async (page, query, id) => {
    try {
        const offset = !page || +page <= 1 ? 0 : (+page - 1);
        const queries = { ...query, userId: id };

        const response = await PostModel.find(queries)
            .sort({ createdAt: -1 })
            .populate({
                path: 'imageId',
                model: ImageModel,
                select: 'image'
            })
            .populate({
                path: 'attributeId',
                model: AttributeModel,
                select: 'price acreage hashtag published'
            })
            .populate({
                path: 'userId',
                model: UserModel,
                select: 'name phone zalo'
            })
            .populate({
                path: 'overviewId',
                model: OverviewModel
            })
            .skip(offset * +process.env.LIMIT)
            .limit(+process.env.LIMIT)
            .lean();

        const totalCount = await PostModel.countDocuments(queries);

        return {
            err: response ? 0 : 1,
            msg: response ? 'oke !' : 'Fail get all posts service!',
            response: {
                count: totalCount,
                rows: response
            }
        };
    } catch (error) {
        throw error;
    }
};


export const updatePost = async ({ postId, overviewId, attributeId, imageId, ...body }) => {
    try {
        const labelCode = generateCode(body.label);

        await PostModel.findByIdAndUpdate(postId, {
            title: body.title || null,
            labelCode: labelCode,
            address: body.address || null,
            categoryCode: body.categoryCode || null,
            description: JSON.stringify(body.description) || null,
            status: 'unChecked',
            areaCode: body.areaCode || null,
            priceCode: body.priceCode || null,
            provinceCode: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố', '')) : generateCode(body?.province?.replace('Tỉnh', '')),
            priceNumber: body.priceNumber,
            areaNumber: body.areaNumber
        });

        await AttributeModel.findByIdAndUpdate(attributeId, {
            price: +body.priceNumber < 1 ? `${+body.priceNumber * 1000000} đồng/tháng` : `${body.priceNumber} triệu/tháng`,
            acreage: `${body.areaNumber} m2`,
        });

        await ImageModel.findByIdAndUpdate(imageId, {
            image: JSON.stringify(body.images)
        });

        await OverviewModel.findByIdAndUpdate(overviewId, {
            area: body.area,
            type: body.category,
            target: body.target,
        });

        await ProvinceModel.findOneAndUpdate(
            {
                $or: [
                    { value: body?.province?.replace('Thành phố ', '') },
                    { value: body?.province?.replace('Tỉnh ', '') }
                ]
            },
            {
                $setOnInsert: {
                    code: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố', '')) : generateCode(body?.province?.replace('Tỉnh', '')),
                    value: body?.province?.includes('Thành phố') ? body?.province?.replace('Thành phố ', '') : body?.province?.replace('Tỉnh ', '')
                }
            },
            { upsert: true, new: true }
        );

        await LabelModel.findOneAndUpdate(
            { code: labelCode },
            { $setOnInsert: { code: labelCode, value: body.label } },
            { upsert: true, new: true }
        );

        return {
            err: 0,
            msg: 'update oke !',
        };
    } catch (error) {
        throw error;
    }
};

export const deletePost = async (postId) => {
    try {
        const response = await PostModel.deleteOne({ _id: postId });
        return {
            err: response.deletedCount > 0 ? 0 : 1,
            msg: response.deletedCount > 0 ? 'Delete OK!' : 'Fail delete posts service!',
        };
    } catch (error) {
        throw error;
    }
};

export const deletePostAdmin = async (id) => {
    try {
        const response = await PostModel.deleteOne({ _id: id });
        return {
            err: response.deletedCount > 0 ? 0 : 1,
            msg: `${response.deletedCount} post(s) deleted`,
        };
    } catch (error) {
        throw error;
    }
};

export const updatePostAdmin = async ({ id, ...data }) => {
    try {
        const response = await PostModel.updateOne(
            { _id: id },
            {
                $set: {
                    title: data.title,
                    status: data.status,
                    star: data.star,
                },
            }
        );

        const overviewResponse = await OverviewModel.updateOne(
            { _id: data.oid },
            {
                $set: {
                    expire: moment(data.expire).format('DD/MM/YYYY'),
                },
            }
        );

        return {
            err: response.nModified > 0 || overviewResponse.nModified > 0 ? 0 : 1,
            msg: `${response.nModified} user(s) updated`,
            response: {
                post: response,
                overview: overviewResponse,
            },
        };
    } catch (error) {
        throw error;
    }
};

export const createPostLike = async (id, postId) => {
    try {
        const response = await PostLikeModel.create({
            userId: id,
            postId,
        });

        return {
            err: 0,
            msg: 'PostLike OK!',
            response,
        };
    } catch (error) {
        throw error;
    }
};

export const deletePostLike = async (id, postId) => {
    try {
        const response = await PostLikeModel.deleteOne({
            userId: id,
            postId,
        });

        return {
            err: response.deletedCount > 0 ? 0 : 1,
            msg: response.deletedCount > 0 ? 'Delete OK!' : 'Fail delete posts service!',
        };
    } catch (error) {
        throw error;
    }
};

export const getPostLike = async (id) => {
    try {
        const response = await PostLikeModel.find({
            userId: id,
        })
            .populate('postId', ['title', 'star'])
            .populate('userId', ['name', 'phone', 'zalo', 'fbUrl'])
            .exec();

        return {
            err: response ? 0 : 1,
            msg: response ? 'OK!' : 'Fail get all posts like service!',
            response,
        };
    } catch (error) {
        throw error;
    }
};
