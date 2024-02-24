import React, { useEffect, useState } from 'react';
import useRequireAuth from '../Login/RequireAuth';
import { getFetch } from '../../../network';
import { Grid, Paper, Typography } from '@mui/material';
import Header from '../Global/Header';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonIcon from '@mui/icons-material/Person';
import TableProduct from './TableProduct'
import TableReport from './TableReport';
const Dashboard = () => {
    const token = useRequireAuth();
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [users,setUsers] = useState([])
    const [reports,setReports] = useState([])
    const loadProducts = async () => {
        try {
            const res = await getFetch('/admin/product/', token);
            setProducts(res);
        } catch (err) {
            console.error(err);
        }
    };

    const loadOrders = async () => {
        try {
            const res = await getFetch('/admin/order/', token);
            setOrders(res);
            const total = res.reduce((acc, order) => acc + order.totalPrice, 0);
            setTotalPrice(total);
        } catch (err) {
            console.error(err);
        }
    };
    const loadUsers = async () => {
        try {
            const res = await getFetch('/admin/dashboard/user', token);
            setUsers(res);
        } catch (err) {
            console.error(err);
        }
    };
    const loadReports = async () => {
        try {
            const res = await getFetch('/admin/report/', token);
            setUsers(res);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadProducts();
        loadOrders();
        loadUsers();
        loadReports();
    }, [token]);

    return (
        <>
            <div className="px-10 py-10">
                <Header title="Dashboard" />
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper className="p-4 h-[10rem] items-center justify-center flex flex-col" sx={{ background: "#FFBE98" }}>
                            <InventoryIcon sx={{fontSize:"4rem"}}/>
                            <Typography sx={{fontSize:"3rem",fontWeight:"100px"}}>{products.length}</Typography>
                            <Typography sx={{fontSize:"1rem"}}>SẢN PHẨM</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper className="p-4 h-[10rem] items-center justify-center flex flex-col" sx={{ background: "#FEECE2" }}>
                            <LocalShippingIcon sx={{fontSize:"4rem"}}/>
                            <Typography sx={{fontSize:"3rem",fontWeight:"100px"}}>{orders.length}</Typography>
                            <Typography sx={{fontSize:"1rem"}}>HÓA ĐƠN</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper className="p-4 h-[10rem] items-center justify-center flex flex-col" sx={{ background: "#F7DED0" }}>
                            <PointOfSaleIcon sx={{fontSize:"4rem"}}/>
                            <Typography sx={{fontSize:"3rem",fontWeight:"100px"}}>{totalPrice} vnđ</Typography>
                            <Typography sx={{fontSize:"1rem"}}>DOANH THU</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper className="p-4 h-[10rem] items-center justify-center flex flex-col" sx={{ background: "#E2BFB3" }}>
                            <PersonIcon sx={{fontSize:"4rem"}}/>
                            <Typography sx={{fontSize:"3rem",fontWeight:"100px"}}>{users.length}</Typography>
                            <Typography sx={{fontSize:"1rem"}}>NGƯỜI DÙNG</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{marginTop:"2rem"}}>
                    <Grid item xs={6}>
                        <TableProduct products={products}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TableReport reports={reports}/>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Dashboard;
