import ProvinceModel from '../models/province';

export const getProvincesService = async () => {
    try {
        const response = await ProvinceModel.find({
            raw: true,
            attributes: ['code', 'value']
        });

        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Fail to get all provinces',
            response
        };
    } catch (error) {
        throw error;
    }
};
