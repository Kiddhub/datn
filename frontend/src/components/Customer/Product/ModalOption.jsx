import { Box, Button, Modal, Select, TextField, Typography, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import useRequireAuth from '../Auth/RequireAuth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postFetch } from '../../../network';

const ModalOption = ({ open, onClose, setData,setShowAlert,setAlertMessage,
    setAlertSeverity }) => {
    const [maxInput, setMaxInput] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price,setPrice] = useState(0)
    const token = useSelector((state) => state.token.value);
    const sizes = setData?.sizes;
    const navigate = useNavigate()
    const handleChange = (event) => {
        const selectedSize = setData.sizes.find((size) => size.name === event.target.value);
        setMaxInput(selectedSize ? selectedSize.quantity : 0);
        setPrice(selectedSize? selectedSize.price : 0)
        setSelectedSize(event.target.value);
        
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleSubmit = () => {
        const totalPrice = parseInt(quantity) * price
        if (selectedSize && quantity > 0) {
            const form = {
                productId: setData?.id,
                size: selectedSize,
                quantity: parseInt(quantity),
                price:totalPrice
            };
            console.log(">>> form",form)
            addItemToCart(form)
            onClose();
        } else {
            console.error("Please select a size and enter a valid quantity.");
        }
        
    };
    const addItemToCart = async (form) => {
        if(token === ''){
            navigate('/login')
        }
        try{
            const res = await postFetch('user/cart_items/create', form,token)
            console.log(">>> check cart",res)
            setShowAlert(true)
            setAlertSeverity("success")
            setAlertMessage("Thêm vào giỏ hàng thành công")
        }catch(err){
            console.error(err);
            setShowAlert(true)
            setAlertSeverity("error")
            setAlertMessage("Thêm vào giỏ hàng thất bại")
        }
    }
   

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
                    Thêm vào giỏ hàng
                </Typography>
                {/* Form nhập liệu */}
                <Box component="form" noValidate autoComplete="off" sx={{ marginBottom: "1rem" }}>
                    <Box>
                        <Typography> Chọn loại</Typography>
                        <Select labelId="sizes" id="sizes-input" sx={{ width: "100%" }} onChange={handleChange} defaultValue=''>
                            {sizes?.map((size) => (
                                <MenuItem value={size.name} key={size.name}>
                                    {size.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box>
                        <Typography> Số lượng</Typography>
                        <TextField
                            id="category-input"
                            name="name"
                            label=""
                            type='number'
                            variant="outlined"
                            fullWidth
                            inputProps={{ max: maxInput }}
                            sx={{ marginBottom: "1rem" }}
                            onChange={handleQuantityChange}
                        />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: "1rem" }}
                            onClick={handleSubmit}
                        >
                            Thêm vào giỏ hàng
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: "1rem" }}
                            onClick={onClose}>
                            Hủy
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalOption;
