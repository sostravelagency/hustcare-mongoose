import * as nsfwjs from 'nsfwjs';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import fs from "fs"
import http from "http"

export const filterImage = async (req, res) => {
        try {
            console.log(req.body)
            const model = await nsfwjs.load();
            let {imageUrl } = req.body;
            imageUrl= imageUrl.replace("https", "http")
            console.log("Image url", imageUrl)
            const savePath= "./uploads/1.jpg"
            await http.get(imageUrl, (response) => {
                const fileStream = fs.createWriteStream(savePath);
                response.pipe(fileStream);
                fileStream.on('finish', () => {
                  console.log('Lưu ảnh thành công.');
                });
              }).on('error', (error) => {
                console.error('Lỗi khi tải xuống ảnh:', error);
              });
            // const imageResponse = await fetch(imageUrl)
            // const imageData = await imageResponse.buffer();
            const predictions = await model.classify(imageUrl);

            return res.status(200).json({
                err: response ? 0 : 1,
                msg: response ? 'oke' : 'fail to get all category',
                response: predictions
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({error, msg: "Helo"});
        }
    
}
