import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProductCart from './ProductCart'
import useRequireAuth from '../Auth/RequireAuth'
import { getFetch } from '../../../network'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const token = useRequireAuth();
  const [selectedRow, setSelectedRow] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [carts, setCarts] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    loadCart()
  }, [])
  const loadCart = async () => {
    try {
      const res = await getFetch('/user/cart/', token)
      setCarts(res)
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    // Calculate totalProducts and totalAmount based on selected row
    let totalProductsCount = 0;
    let totalAmountValue = 0;

    if (selectedRow !== null) {
      const selectedCart = carts.find((cart) => cart.shopId === selectedRow);
      if (selectedCart) {
        selectedCart.cartItems.forEach((item) => {
          totalProductsCount += item.quantity;
          totalAmountValue += item.price;
        });
      }
    }

    setTotalProducts(totalProductsCount);
    setTotalAmount(totalAmountValue);
  }, [selectedRow, carts]);

  const isAnyRowSelected = selectedRow !== null;
  console.log(">>> is",selectedRow)
  return (<>
    <Box sx={{ padding: "2rem" }}>
      <Typography variant='h4' sx={{ marginBottom: "1rem" }}>Giỏ hàng 🛒</Typography>
      <Box sx={{ display: "flex", gap: 2 }}>

        <Paper sx={{ flex: "1 0 60%" }}>
          {carts.map((cart, index) => (
            <Box sx={{ paddingY: "1.5rem" }} key={index}>
              <ProductCart
                setSelectedRow={(value) => setSelectedRow(value === selectedRow ? null : value)}
                shopId={cart.shopId}
                cartItems={cart.cartItems}
              />
            </Box>
          ))}

        </Paper>
        <Paper sx={{ flex: "1 0 40%", height: "15rem", padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Typography variant='h4'>Thống kê: </Typography>
          <Box sx={{ display: "flex", fontSize: "1.2rem" }}>
            <div>Tổng sản phẩm:</div>
            <Typography sx={{ marginLeft: "auto", fontSize: "1.2rem" }}>
              {totalProducts}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", fontSize: "1.2rem" }}>
            <div>Tổng tiền:</div>
            <Typography sx={{ marginLeft: "auto", fontSize: "1.2rem" }}>
              {totalAmount} vnđ
            </Typography>
          </Box>
          <Button sx={{
            width: "10rem",
            padding: "1rem",
            height: "1rem",
            fontSize: "1rem",
            marginLeft: "auto",
            '&:hover': { background: "#FF9800" }
          }}
            disabled={!isAnyRowSelected}
            onClick={() => {
              navigate('/order/new',{state:selectedRow})
            }}
          >
            Thanh toán
          </Button>
        </Paper>
      </Box>
    </Box>
  </>)


}

export default Cart