import React, { useEffect, useState } from 'react';
import { getFetch } from '../../../network';
import { Grid, Paper, Typography } from '@mui/material';
import Header from '../Global/Header';
import InventoryIcon from '@mui/icons-material/Inventory';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import useRequireAuth from '../AuthShop/RequireAuth';
import TableRating from './TableRating';
import TableOrder from './TableOrder';
import GradeIcon from '@mui/icons-material/Grade';
const Dashboard = () => {
    const token = useRequireAuth();
    const [products, setProducts] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [sales,setSales] = useState([])
    const[orders,setOrders] = useState([])
    const loadProducts = async () => {
        try {
            const res = await getFetch('/shop/product/', token);
            setProducts(res);
        } catch (err) {
            console.error(err);
        }
    };

    const loadRatings = async () => {
        try {
            const res = await getFetch('/shop/order/', token);
            setRatings(res);
            const sumRating = res.reduce((acc, rating) => acc + rating.rating, 0);
            const average = sumRating / res.length;
            setAverageRating(average);
            const total = res.reduce((acc, order) => acc + order.totalPrice, 0);
            setTotalPrice(total);
        } catch (err) {
            console.error(err);
        }
    };
    const loadSales = async () => {
        try {
            const res = await getFetch('/admin/sale/', token)
            setSales(res);
        } catch (err) {
            console.error(err);
        }
    };
    const loadOrders = async () => {
        try {
            const res = await getFetch('/shop/order/', token)
            setOrders(res);
            const total = res.reduce((acc, order) => acc + order.totalPrice, 0);
            setTotalPrice(total);
        } catch (err) {
            console.error(err);
        }
    };
    
    useEffect(() => {
        loadProducts();
        loadRatings();
        loadSales();
        loadOrders();
    }, [token]);

    return (
        <>
            <div className="px-10 py-10">
                <Header title="Dashboard" />
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className="p-4 h-[10rem] items-center justify-center flex flex-col" sx={{ background: "#FFBE98" }}>
                            <InventoryIcon sx={{fontSize:"4rem"}}/>
                            <Typography sx={{fontSize:"3rem",fontWeight:"100px"}}>{products.length}</Typography>
                            <Typography sx={{fontSize:"1rem"}}>SẢN PHẨM</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className="p-4 h-[10rem] items-center justify-center flex flex-col" sx={{ background: "#FEECE2" }}>
                            <GradeIcon sx={{fontSize:"4rem"}}/>
                            <Typography sx={{fontSize:"3rem",fontWeight:"100px"}}>{averageRating.toFixed(2)}</Typography>
                            <Typography sx={{fontSize:"1rem"}}>/5</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className="p-4 h-[10rem] items-center justify-center flex flex-col" sx={{ background: "#F7DED0" }}>
                            <PointOfSaleIcon sx={{fontSize:"4rem"}}/>
                            <Typography sx={{fontSize:"3rem",fontWeight:"100px"}}>{totalPrice} vnđ</Typography>
                            <Typography sx={{fontSize:"1rem"}}>DOANH THU</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{marginTop:"2rem"}}>
                    <Grid item xs={6}>
                        <TableRating ratings={ratings}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TableOrder orders={orders}/>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Dashboard;
