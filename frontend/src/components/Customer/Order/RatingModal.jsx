import React, { useState } from 'react';
import { Modal, Box, Typography, Rating, TextField, Button } from '@mui/material';
import { postFetch } from '../../../network';
import useRequireAuth from '../Auth/RequireAuth';

const RatingModal = ({ openModal, handleClose, productId,setShowAlert,setAlertMessage,setAlertSeverity }) => {
    const token =useRequireAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Gửi dữ liệu đánh giá
        const reviewData = {
            productId: productId,
            rating: rating,
            review: comment
        };
        createReview(reviewData);
        handleClose();
    };
    const createReview = async (reviewData) => {
        try{
            const res = await postFetch('user/rating/new',reviewData,token)
            console.log(">> res",res)
            setShowAlert(true)
            setAlertSeverity("success")
            setAlertMessage("Đánh giá sản phẩm thành công")
        }catch(err){
            console.error(err);
            setShowAlert(true)
            setAlertSeverity("error")
            setAlertMessage("Đánh giá sản phẩm thất bại")
        }
    }

    return (
        <Modal
            open={openModal}
            onClose={handleClose}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: '20px',
                    width: "500px",
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Typography variant='h5' sx={{ margin: "auto" }}>Đánh giá sản phẩm</Typography>
                <Rating name="rating" value={rating} onChange={handleRatingChange} /> {/* Rating component */}
                <TextField
                    label="Nhận xét"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    value={comment}
                    onChange={handleCommentChange}
                /> {/* TextField for comment */}
                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: '10px' }}>
                    Gửi đánh giá
                </Button> {/* Submit button */}
            </Box>
        </Modal>
    );
};

export default RatingModal;
