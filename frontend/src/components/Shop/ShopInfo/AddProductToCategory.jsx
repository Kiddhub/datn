import { Modal, Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getFetch, postFetch } from '../../../network';
import { useSelector } from 'react-redux';
import useRequireAuth from '../AuthShop/RequireAuth';

const AddProductToCategory = ({ open, handleClose, categoryId, setShowAlert, setAlertSeverity, setAlertMessage,products }) => {
    const token = useRequireAuth();
    const [selectedProducts, setSelectedProducts] = useState([]);
    
    const handleProductSelect = (productId) => {
        // Nếu productId đã được chọn, loại bỏ nó khỏi danh sách
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else { // Nếu productId chưa được chọn, thêm nó vào danh sách
            setSelectedProducts([...selectedProducts, productId]);
        }
    };

    const handleSaveClick = async () => {
        console.log('Selected Products:', selectedProducts);
        const formData = {
            categoryShopId: categoryId,
            productId: selectedProducts,
        };
        console.log('Selected Products:', formData);
        try {
            
            const res = await postFetch('shop/categoryShop/products/new', formData, token);
            console.log(">>> res",res)
            setShowAlert(true)
            setAlertSeverity("success")
            setAlertMessage("Thêm thành công");
        } catch (err) {
            setShowAlert(true)
            setAlertSeverity("error")
            setAlertMessage("Thêm thất bại");
            console.error(err);
        }
        handleClose();
        setSelectedProducts([]);
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
                    Add Products to Category
                </Typography>

                {/* Danh sách sản phẩm */}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {/*
                        Lặp qua danh sách sản phẩm và tạo Checkbox cho mỗi sản phẩm.
                        Khi người dùng chọn hoặc bỏ chọn, gọi handleProductSelect để cập nhật danh sách sản phẩm được chọn.
                    */}
                    {products.map(product => (
                        <FormControlLabel
                            key={product.id}
                            control={<Checkbox checked={selectedProducts.includes(product.id)} onChange={() => handleProductSelect(product.id)} />}
                            label={product.name}
                        />
                    ))}
                </Box>

                {/* Button lưu */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSaveClick}
                    sx={{ marginTop: "1rem" }}
                >
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

export default AddProductToCategory;
