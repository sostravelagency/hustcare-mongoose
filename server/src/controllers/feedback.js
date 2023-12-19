import db from '../models'

export const getReviewPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const reviews = await db.Feedback.findAll({
            where: { postId },
            include: [{ model: db.Post, as: 'post' }, { model: db.User, as: 'user' }],
        });
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const createReview = async (req, res) => {
    try {
        const { id: userId } = req.user
        const { postId, titlePost, rating, content } = req.body;

        // Kiểm tra xem các trường cần thiết có được cung cấp không
        if (!userId || !postId || !titlePost || !rating || !content) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Tạo đánh giá mới trong cơ sở dữ liệu
        const newReview = await db.Feedback.create({
            userId,
            postId,
            titlePost,
            rating,
            content,
        });

        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}