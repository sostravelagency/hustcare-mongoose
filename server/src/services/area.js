import AreaModel from '../models/area';

// GET ALL Areas
export const getAreasService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await AreaModel.find({}, { code: 1, value: 1, _id: 0 }); // Chỉ lấy các trường 'code' và 'value'

            resolve({
                err: response ? 0 : 1,
                msg: response ? 'OK' : 'Fail to get all areas',
                response
            });
        } catch (error) {
            reject(error);
        }
    });
};
