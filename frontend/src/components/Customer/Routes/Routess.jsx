import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../Global/Header'
import Customer from '..'
import ProductDetails from '../Product/ProductDetails'
import Product from '../Product'
import Cart from '../Cart/Cart'
import Order from '../Order'
import Chat from '../Chat/Chat'
import Shop from '../Shop'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import Footer from '../Global/Footer'

const Routess = () => {
    const token = useSelector((state) => state.token.value);
    return (
        <Box>
            <Header setToken={token} />
            <Box sx={{background:"#E3E6E6"}}>
                <Routes>
                    <Route path='/' element={<Customer />} />
                    <Route path='/products' element={<Product />} />
                    <Route path='/products/:id' element={<ProductDetails />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/order/*' element={<Order />} />
                    <Route path='/chat/*' element={<Chat />} />
                    <Route path='/page/:id' element={<Shop />} />
                </Routes>
            </Box>
            <Footer/>
        </Box>
    )
}

export default Routess