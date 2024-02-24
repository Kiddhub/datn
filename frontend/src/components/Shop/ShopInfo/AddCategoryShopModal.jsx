import { Modal, Box, Typography, TextField, Button, LinearProgress, Alert, AlertTitle } from '@mui/material';
import React, { useState } from 'react';
import { postFetch } from '../../../network';
import { useSelector } from 'react-redux';
const AddCategoryShopModal = ({ open, handleClose, setShowAlert, setAlertSeverity, setAlertMessage }) => {
    const token = useSelector((state) => state.token.value)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSaveClick = async () => {
        console.log('Form Data:', formData);
        try {
            const res = await postFetch('shop/categoryShop/create', formData, token);
            setShowAlert(true)
            setAlertSeverity("success")
            setAlertMessage("Thêm thành công");
        } catch (err) {
            setShowAlert(true)
            setAlertSeverity("error")
            setAlertMessage("Thêm thất bại");
            console.error(err);
        }
        setFormData({
            name: '',
            description: '',
            image: '',
        })
        handleClose()
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    width: '50%',
                    maxWidth: '600px',
                    maxHeight: '80%',
                    overflow: 'auto',
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: "1rem" }}>
                    Add new Category
                </Typography>

                {/* Form nhập liệu */}
                <Box component="form" noValidate autoComplete="off" sx={{ marginBottom: "1rem" }}>
                    <TextField
                        id="category-input"
                        name="name"
                        label="Category"
                        variant="outlined"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                        sx={{ marginBottom: "1rem" }}
                    />
                    <TextField
                        id="secondcategory-input"
                        name="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        value={formData.description}
                        onChange={handleChange}
                        sx={{ marginBottom: "1rem" }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSaveClick}
                        sx={{ marginTop: "1rem",width:"50%" }}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddCategoryShopModal;