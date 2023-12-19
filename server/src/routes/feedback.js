import express from 'express'
import * as feedbackController from '../controllers/feedback'
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.get('/reviews/:postId', feedbackController.getReviewPost)
router.use(verifyToken)
router.post('/reviews', feedbackController.createReview)

export default router