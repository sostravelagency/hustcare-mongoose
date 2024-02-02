import PriceModel from '../models/price';

export const getPricesService = async () => {
    try {
        const response = await PriceModel.find({
            raw: true,
            attributes: ['code', 'value']
        });

        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Fail to get all prices',
            response
        };
    } catch (error) {
        throw error;
    }
};
