import React, { useState } from 'react';
import { Typography, Rating, TextField, Button, Divider } from '@mui/material';
import instance from '../../axiosConfig';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';

const WriteReview = ({ postId, setChange }) => {
    const [titlePost, setTitlePost] = useState('');
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const data = useSelector((state) => state.auth);
    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleSubmit = async () => {
        try {
            const res = await instance.post("/api/v1/feedback/reviews", {
                postId,
                titlePost,
                rating,
                content,
            },
                {
                    headers: {
                        "Authorization": "Bearer " + data.token
                    }
                })
            const result = await res.data
            setRating(0)
            setTitlePost("")
            setContent("")
            swal("Thông báo", "Gủi đánh giá thành công", "success")
                .then(() => setChange(prev => !prev))
            // Optionally, you can update the local state with the new review
            // to avoid making an additional request to get the updated reviews.
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div>
            <div style={{ margin: "12px 0" }}></div>

            <Typography variant="h5">Viết đánh giá</Typography>
            <form>
                <div style={{ margin: "12px 0" }}></div>
                <TextField
                    label="Tiêu đề đánh giá"
                    variant="outlined"
                    fullWidth
                    value={titlePost}
                    onChange={(e) => setTitlePost(e.target.value)}
                />
                <div style={{ margin: "12px 0" }}></div>
                {/* <Rating
                    name="write-rating"
                    value={rating}
                    precision={0.5}
                    onChange={handleRatingChange}
                /> */}
                <div style={{ margin: "12px 0" }}></div>
                <TextField
                    label="Nội dung đánh giá"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div style={{ margin: "12px 0" }}></div>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Gửi đánh giá
                </Button>
                <div style={{ margin: "12px 0" }}></div>
            </form>
        </div>
    );
};

export default WriteReview;
