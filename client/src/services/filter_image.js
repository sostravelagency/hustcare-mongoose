import axiosConfig from '../axiosConfig'

export const apiFilterImage = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'post',
                url: '/api/v1/image/filter',
                data: payload
            })
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}