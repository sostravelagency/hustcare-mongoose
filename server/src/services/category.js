import CategoryModel from '../models/category';

// GET ALL CATEGORY
export const getCategoriesService = async () => {
    try {
        const categories = await CategoryModel.find().lean();
        return {
            err: categories ? 0 : 1,
            msg: categories ? 'OK' : 'Fail to get all categories',
            response: categories,
        };
    } catch (error) {
        throw error;
    }
};

// CREATE CATEGORY
export const createCategoryService = async (data) => {
    try {
        const response = await CategoryModel.create({ ...data });
        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Fail to create category',
            response: response,
        };
    } catch (error) {
        throw error;
    }
};
