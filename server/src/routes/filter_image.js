import express from 'express'
import { filterImage } from '../controllers/filter_image';
const router = express.Router();

router.post('/', filterImage)



export default router