import { Avatar, Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { getFetch } from '../../../network'
import { useNavigate } from 'react-router-dom';
import CategoryModal from './CategoryModal';

const Category = () => {
    const [category, setCategory] = useState([]);
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const navigate = useNavigate();

    const loadCategory = async () => {
        try {
            const res = await getFetch('/admin/category/parent', "")
            setCategory(res)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        loadCategory()
    }, [])
    const getProducts = async (category) => {
        try {
            const res = await getFetch(`/user/product/${category.id}`, "");
            navigate(`/products?category=${category.name}`, { state: { products: res, categories: category } });
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <Box sx={{ background: "#FFFBF5", padding: "1rem", width: "190px" }}>
            <Typography variant="h6" sx={{ paddingX: "1rem", margin: "auto" }}>Danh mục</Typography>
            {category.map((category, rowIndex) => (
                <Box
                    key={rowIndex}
                    sx={{
                        paddingTop: '1rem',
                        paddingRight: '0.6rem',
                        width: '150px',
                        alignItems: 'center',
                        border: "solid",
                        display: 'flex',
                        borderColor: "#F2F1EB",
                        height: "72px",
                        flexDirection: 'column',
                        gap: 2,
                        background: "#D4E7C5",
                        cursor: "pointer",
                        marginTop: "0.5rem"
                    }}
                    onClick={() => {
                        getProducts(category)
                    }}
                >
                    <Typography sx={{ fontSize: '0.875rem', textAlign: 'center', fontWeight: 'bold' }}>
                        {category.name}
                    </Typography>
                </Box>
            ))}
            <Box
                sx={{
                    paddingTop: '1rem',
                    paddingRight: '0.6rem',
                    width: '150px',
                    alignItems: 'center',
                    border: "solid",
                    display: 'flex',
                    borderColor: "#F2F1EB",
                    height: "72px",
                    flexDirection: 'column',
                    gap: 2,
                    background: "#D4E7C5",
                    cursor: "pointer",
                    marginTop: "0.5rem"
                }}
                onClick={() => {
                    getProducts(category)
                }}
            >
                <Typography sx={{ fontSize: '0.875rem', textAlign: 'center', fontWeight: 'bold' }} onClick={() => handleOpen()}>
                    Xem thêm
                </Typography>
            </Box>

            <CategoryModal open={open} onClose={handleClose}/>
        </Box>
    );
};

export default Category;
