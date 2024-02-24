import React, { useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import CouponModal from './CouponModal';
import Coupon from './Coupon';
import AddressForm from './AddressForm';
import { getFetch, postFetch } from '../../../network';
import { useLocation, useNavigate } from 'react-router-dom';
import useRequireAuth from '../Auth/RequireAuth';
import { set } from 'react-hook-form';

const OrderForm = () => {
    const token = useRequireAuth();
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const [selectedShopCoupon, setSelectedShopCoupon] = useState(null);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [formOrder, setFormOrder] = useState([])
    const [total, setTotal] = useState(0);
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const [cart, setCarts] = useState([]);
    const [cartItem, setCartItem] = useState([]);
    const shopId = location.state;
    const [showAlert, setShowAlert] = useState(true);
    const [alertSeverity, setAlertSeverity] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const handleChange = (event) => {
        setStatus(event.target.value);
        setFormOrder((prevForm) => ({
            ...prevForm,
            payment: event.target.value,
        }));
    };
    const handleApplyShopCoupon = (couponValue) => {
        setSelectedShopCoupon(couponValue);
        handleCloseModal();
        calculateTotal(couponValue, selectedCoupon);
        setFormOrder((prevForm) => ({
            ...prevForm,
            voucherShop: couponValue,
        }));
    };
    const handleApplyCoupon = (couponValue) => {
        setSelectedCoupon(couponValue);
        handleCloseModal();
        calculateTotal(selectedShopCoupon, couponValue);
        setFormOrder((prevForm) => ({
            ...prevForm,
            voucher: couponValue,
        }));
    };

    const calculateTotal = (shopCoupon, regularCoupon) => {
        let discountedTotal = price;

        if (shopCoupon && shopCoupon.discountType === 'PERCENT') {
            discountedTotal *= 1 - shopCoupon.number / 100;
        } else if (shopCoupon && shopCoupon.discountType === 'VND') {
            discountedTotal -= shopCoupon.number;
        }

        if (regularCoupon && regularCoupon.discountType === 'PERCENT') {
            discountedTotal *= 1 - regularCoupon.number / 100;
        } else if (regularCoupon && regularCoupon.discountType === 'VND') {
            discountedTotal -= regularCoupon.number;
        }
        setTotal(discountedTotal);
        setFormOrder((prevForm) => ({
            ...prevForm,
            discountPrice: discountedTotal
        }));
    };
    const openCoupon = () => {
        setIsCouponModalOpen(true);
    };
    const closeCoupon = () => {
        setIsCouponModalOpen(false);
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        createNewOrder(formOrder)

    };
    const createNewOrder = async (data) => {
        try {
            const res = await postFetch('user/order/create', data, token)
            console.log(">>> res", res)
            navigate('/order')
        } catch (err) {
            console.error(err);
            setShowAlert(true)
            setAlertSeverity("error")
            setAlertMessage("Tạo hóa đơn thất bại")
        }
    }
    const newOrder = async () => {
        try {
            const res = await getFetch(`/user/cart/${shopId}`, token);
            setCarts(res);
            setCartItem(res.cartItems);
            setTotal(res.totalPrice);
            setPrice(res.totalPrice);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        newOrder();
        setFormOrder((prevForm) => ({
            ...prevForm,
            shopId: shopId,
            totalPrice: price
        }));
    }, [token]);
    return (
        <>
            <Typography variant='h5' sx={{ alignContent: 'center', paddingBottom: 2 }}>
                Tạo Hóa Đơn
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: '1 0 40%' }}>
                    <Paper sx={{ padding: '1rem' }}>
                        <AddressForm setFormOrder={setFormOrder} />
                    </Paper>
                    <Paper sx={{ padding: '1rem', marginTop: '1rem' }}>
                        <Box sx={{ display: 'flex', fontSize: '1.2rem' }}>
                            <div>Tổng sản phẩm:</div>
                            <Typography sx={{ marginLeft: 'auto', fontSize: '1.2rem' }}>{cart.totalItem}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', fontSize: '1.2rem' }}>
                            <div>Tổng tiền:</div>
                            <Typography sx={{ marginLeft: 'auto', fontSize: '1.2rem' }}>{cart.totalPrice} vnđ</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', fontSize: '1.2rem', alignItems: 'center' }}>
                            <div>Mã giảm giá của shop</div>
                            {selectedShopCoupon ? (
                                <>
                                    <Typography sx={{ marginLeft: 'auto', fontSize: '1.2rem' }}>{selectedShopCoupon.code}</Typography>
                                    <Button onClick={() => handleApplyShopCoupon(null)}>Xoá mã</Button>
                                </>
                            ) : (
                                <Button sx={{ marginLeft: 'auto', fontSize: '1rem' }} onClick={handleOpenModal}>
                                    Thêm mã
                                </Button>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', fontSize: '1.2rem', alignItems: 'center' }}>
                            <div>Voucher</div>
                            {selectedCoupon ? (
                                <>
                                    <Typography sx={{ marginLeft: 'auto', fontSize: '1.2rem' }}>{selectedCoupon.code}</Typography>
                                    <Button onClick={() => handleApplyCoupon(null)}>Xoá mã</Button>
                                </>
                            ) : (
                                <Button sx={{ marginLeft: 'auto', fontSize: '1rem' }} onClick={openCoupon}>
                                    Thêm mã
                                </Button>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', fontSize: '1.2rem', alignItems: 'center', paddingBottom: '1rem' }}>
                            <div>Phương thức thanh toán</div>
                            <Box sx={{ marginLeft: 'auto', height: 'auto', width: 'auto' }}>
                                <FormControl fullWidth>
                                    <Select value={status} placeholder='payment' onChange={handleChange}>
                                        <MenuItem value={'COD'}>COD</MenuItem>
                                        <MenuItem value={'Banking'}>Banking</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', fontSize: '1.2rem', alignItems: 'center', borderTop: 'solid 1px', paddingTop: '1.5rem' }}>
                            <div>Total</div>
                            <Typography sx={{ marginLeft: 'auto', fontSize: '1.2rem' }}>{total} vnđ</Typography>
                        </Box>
                        <Button variant='outlined' color='secondary' type='submit' sx={{ marginTop: '1rem', marginLeft: 'auto' }} onClick={handleSubmit}>
                            Tạo
                        </Button>
                    </Paper>
                    <CouponModal isOpen={isModalOpen} onClose={handleCloseModal} onApply={handleApplyShopCoupon} shopId={shopId} price={price} />
                    <Coupon couponOpen={isCouponModalOpen} couponClose={closeCoupon} onApply={handleApplyCoupon} price={price} />
                </Box>
                <Box sx={{ flex: '1 0 50%' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tên sản phẩm</TableCell>
                                    <TableCell align='center'>Loại</TableCell>
                                    <TableCell align='center'>Ảnh</TableCell>
                                    <TableCell align='center'>Số lượng</TableCell>
                                    <TableCell align='center'>Giá tiền</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItem.map((row) => (
                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component='th' scope='row'>
                                            {row.product?.name}
                                        </TableCell>
                                        <TableCell align='center'>{row.size}</TableCell>
                                        <TableCell align='center'>
                                            <img src={row.product?.imageUrl} className='h-32 w-32 mx-auto' />
                                        </TableCell>
                                        <TableCell align='center'>{row.quantity}</TableCell>
                                        <TableCell align='center'>{row.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            <Box sx={{ padding: "2rem", justifyContent: 'space-between' }}>
                {/* ... (các phần khác của ListCategory) */}
                {
                    showAlert && (
                        <Alert
                            severity={alertSeverity}
                            onClose={() => setShowAlert(false)}
                            sx={{
                                marginBottom: "1rem",
                                position: 'absolute',
                                top: "8rem",
                                right: 0,
                            }}
                            open={showAlert}
                        >
                            {alertMessage}
                        </Alert>
                    )
                }
            </Box>
        </>
    );
};

export default OrderForm;
