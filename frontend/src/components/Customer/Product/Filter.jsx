import React, { useEffect, useState } from 'react';
import { Box, Typography, Rating } from '@mui/material';
import { getFetch, getFetchWithParams } from '../../../network';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const Filter = ({ category, setProducts, products }) => {
    const [categoryId, setCategoryId] = useState(0);
    const [ratingValue, setRatingValue] = useState(0);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(false);
    const [selectedRating, setSelectedRating] = useState(false);
    const loadSubCategory = async () => {
        try {
            const res = await getFetch(`/admin/category/parent/${category.id}`, '');
            setCategories(res);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCategory = (categoryId) => {
        setCategoryId(categoryId);
        setSelectedCategory(true);
    };

    const handleRating = (rating) => {
        setRatingValue(rating);
        setSelectedRating(true);
    };

    const handleSearch = () => {
        const filterProduct = {};
        if (categoryId !== 0) {
            filterProduct.categoryId = categoryId;
        }
        if (ratingValue !== 0) {
            filterProduct.ratingValue = ratingValue;
        }
        searchProducts(filterProduct);

    };

    const searchProducts = async (filterProduct) => {
        try {
            const res = await getFetchWithParams('/user/product/filter', filterProduct, "");
            setProducts(res);
        } catch (err) {
            console.error(err);
        }
    };

    const handleReset = () => {
        setCategoryId(0);
        setRatingValue(0);
        setProducts(products)
        setSelectedCategory(false);
        setSelectedRating(false);
    };

    useEffect(() => {
        loadSubCategory();
    }, [category]);

    useEffect(() => {
        if (selectedCategory || selectedRating) {
            handleSearch();
        }
    }, [selectedCategory, selectedRating]);

    return (
        <>
            <Box sx={{ borderRight: '1px solid #000' }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6">⚙ Bộ lọc tìm kiếm </Typography>
                    <RestartAltIcon sx={{ cursor: "pointer" }} onClick={handleReset} />
                </Box>

                <Box sx={{ borderBottom: 'solid 1px #F2F1EB', paddingY: '1rem' }}>
                    <Typography sx={{ fontSize: '1.2rem' }}>Danh mục sản phẩm </Typography>
                    <Box sx={{ flexDirection: 'column', marginLeft: '0.5rem' }}>
                        {categories.map((category, rowIndex) => (
                            <Typography
                                key={rowIndex}
                                sx={{
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    color: selectedCategory ? (selectedCategory === rowIndex ? '#0766AD' : 'black') : 'black',
                                }}
                                onClick={() => handleCategory(category.id)}
                            >
                                {category.name}
                            </Typography>
                        ))}
                    </Box>
                </Box>
                <Box sx={{ borderBottom: 'solid 1px #F2F1EB', paddingY: '1rem' }}>
                    <Typography sx={{ fontSize: '1.2rem' }}>Đánh giá </Typography>
                    <Box sx={{ flexDirection: 'column' }}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <Box
                                key={value}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleRating(value)}
                            >
                                <Rating value={value} readOnly></Rating>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Filter;
