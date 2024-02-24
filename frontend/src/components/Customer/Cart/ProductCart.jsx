import React, { useEffect, useState } from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography, Checkbox, Modal, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFetch } from '../../../network';

const ProductCart = ({ setSelectedRow, shopId, cartItems }) => {
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [shop, setShop] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [totalItem,setTotalItem] = useState(0)
    const [totalPrice,setTotalPrice] = useState(0)
    const handleOpen = (quantity, product) => {
        setSelectedQuantity(quantity);
        setSelectedProduct(product);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const findShopById = async () => {
        try {
            const res = await getFetch(`/user/shop/${shopId}`);
            setShop(res);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        findShopById();
    }, []);
    useEffect(() => {

    })

    return (
        <>
            <TableContainer component={Paper}>
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox onChange={() => setSelectedRow(shopId)} />
                    {shop?.name}
                </Typography>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên sản phẩm</TableCell>
                            <TableCell align="center">Loại</TableCell>
                            <TableCell align='center'>Ảnh</TableCell>
                            <TableCell align="center">Số lượng</TableCell>
                            <TableCell align="center">Giá tiền</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.product.name}
                                </TableCell>
                                <TableCell align="center">{row.product.category.name}</TableCell>
                                <TableCell align='center'><img src={row.product.imageUrl} className='h-32 w-32 mx-auto' alt={row.product.name} /></TableCell>
                                <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align='center' >
                                    <DeleteIcon sx={{ cursor: "pointer" }} onClick={() => handleOpen(row.quantity, row.product)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2 id="child-modal-title">Thông tin sản phẩm</h2>
                    <p id="child-modal-description">
                        Tên sản phẩm: {selectedProduct?.name}<br />
                        Số lượng hiện tại: {selectedQuantity}
                    </p>
                    <Button onClick={handleClose}>Đóng Modal</Button>
                </Box>
            </Modal>
        </>

    );
};

export default ProductCart;
