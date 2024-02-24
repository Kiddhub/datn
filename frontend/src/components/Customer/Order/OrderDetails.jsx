import { Box, FormControl, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddressForm from './AddressForm'
import { useLocation } from 'react-router-dom'
import useRequireAuth from '../Auth/RequireAuth'
import { getFetch } from '../../../network'

const OrderDetails = () => {
    const token = useRequireAuth();
    const param = useLocation();
    const orderId = param.state?.orderId
    const [order, setOrder] = useState([]);
    const loadOrder = async () => {
        try {
            const res = await getFetch(`/user/order/${orderId}`, token)
            console.log(">>>", res);
            setOrder(res)
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        loadOrder();
    }, [token])
    return (
        <>
            <Typography variant='h5' sx={{ alignContent: 'center', paddingBottom: 2 }}>
                Chi tiết hóa đơn
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: '1 0 40%' }}>
                    <Paper sx={{ padding: '1rem' }}>
                        <Box>
                            <TextField
                                name="firstName"
                                variant="outlined"
                                color="secondary"
                                type="text"
                                sx={{ mb: 3 }}
                                fullWidth
                                readOnly                                                      
                                value={order.firstName}
                            />
                            <TextField
                                name="lastName"
                                variant="outlined"
                                color="secondary"
                                type="text"                               
                                fullWidth
                                readOnly
                                sx={{ mb: 3 }}                             
                                value={order.lastName}
                            />
                            <TextField
                                name="address"
                                variant="outlined"
                                color="secondary"
                                type="text"                              
                               readOnly
                                sx={{ mb: 3 }}
                                fullWidth                           
                                value={order.address}
                            />
                            <TextField
                                name="city"                            
                                variant="outlined"
                                color="secondary"
                                readOnly
                                type="text"
                                fullWidth
                                sx={{ mb: 3 }}                            
                                value={order.city}
                            />
                            <TextField
                                name="mobile"
                                variant="outlined"
                                color="secondary"
                                type="text"
                                fullWidth
                                readOnly
                                sx={{ mb: 3 }}
                                value={order.mobile}
                            />
                        </Box>
                    </Paper>
                    <Paper sx={{ padding: '1rem', marginTop: '1rem' }}>
                        <Box sx={{ display: 'flex', fontSize: '1.2rem' }}>
                            <div>Tổng sản phẩm:</div>
                            <Typography sx={{ marginLeft: 'auto', fontSize: '1.2rem' }}>{order.totalItem}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', fontSize: '1.2rem' }}>
                            <div>Tổng tiền:</div>
                            <Typography sx={{ marginLeft: 'auto', fontSize: '1.2rem' }}>{order.totalPrice} vnđ</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', fontSize: '1.2rem' }}>
                            <div>Tổng tiền giảm giá:</div>
                            <Typography sx={{ marginLeft: 'auto', fontSize: '1.2rem' }}>{order.discountPrice} vnđ</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', fontSize: '1.2rem', alignItems: 'center', paddingBottom: '1rem' }}>
                            <div>Phương thức thanh toán</div>
                            <Typography sx={{ marginLeft: 'auto', fontSize: '1.2rem' }}>{order.payment}</Typography>
                        </Box>
                    </Paper>
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
                                {order.orderItems?.map((row) => (
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
        </>
    )
}

export default OrderDetails