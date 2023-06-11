import db from '../models'

//GET ALL CATEGORY
export const getCategoriesService = () => {
    return new Promise( async(resolve, reject) => {
        try {
            let response = await db.Category.findAll({
                raw:true,
            })
            resolve({
                err: response ? 0 : 1,
                msg: response ? 'oke' : 'fail to get all category',
                response
            })
        } catch (error) {
            reject(error);
        }
    })
}
export const createCategoryService= async (data)=> {
    try {
        const response= await db.Category.create({
            ...data
        })
        return {response, err: response ? 0 : 1, msg: response  ? 'oke' : "fail to get all category"}
    } catch (error) {
        return error
    }
}