import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography, Rating, Avatar } from '@mui/material';
import instance from '../../axiosConfig';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    reviewContainer: {
        marginRight: theme.spacing(2),
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    userContainer: {
        marginRight: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        marginRight: theme.spacing(2),
        width: '50px',
        height: '50px',
    },
}));

const ReviewList = ({ postId, change }) => {
    const classes = useStyles();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await instance.get(`/api/v1/feedback/reviews/${postId}`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [postId, change]);

    return (
        <div>
            <Typography variant="h5">Các đánh giá</Typography>
            <List>
                {reviews.map((review) => (
                    <div key={review.id} className={classes.reviewContainer}>
                        <ListItem style={{alignItems: "center", padding: 0}}>
                            <div className={classes.userContainer}>
                                {review.user && (
                                    <Avatar src={review.user.avatar} alt={review.user.name} className={classes.avatar} />
                                )}
                                <Typography variant="h6">{review.user ? review.user.name : 'Anonymous'}</Typography>
                            </div>
                            <Rating name="read-only" value={review.rating} readOnly />
                            <Typography variant="h6">{review.titlePost}</Typography>
                        </ListItem>
                        <Typography>{review.content}</Typography>
                        <Typography variant="caption" color="textSecondary">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </Typography>
                    </div>
                ))}
            </List>
        </div>
    );
};

export default ReviewList;
