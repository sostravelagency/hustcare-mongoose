import FeedbackModel from '../models/feedback'; // Đảm bảo đường dẫn đúng

export const getReviewPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const reviews = await FeedbackModel.find({ postId }).populate('postId userId');
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createReview = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { postId, titlePost, rating, content } = req.body;

        // Kiểm tra xem các trường cần thiết có được cung cấp không
        if (!userId || !postId || !titlePost || !content) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Tạo đánh giá mới trong cơ sở dữ liệu
        const newReview = await FeedbackModel.create({
            userId,
            postId,
            titlePost,
            rating: rating || 0,
            content,
        });

        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
