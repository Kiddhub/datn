import { Box, Typography } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OrderForm from './OrderForm'
import useRequireAuth from '../Auth/RequireAuth'
import ListOrder from './ListOrder'
import OrderDetails from './OrderDetails'

const Order = () => {
    const token = useRequireAuth();
    return (
        <>
            <Box sx={{ padding: "1rem" }}>
                <Routes>
                    <Route path='/new' element={<OrderForm />} />
                    <Route path='/' element={<ListOrder/>}/>
                    <Route path='/:orderId' element={<OrderDetails/>}/>
                </Routes>
            </Box>
        </>

    )
}

export default Order