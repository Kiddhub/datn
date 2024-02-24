import { Avatar, Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { getFetch } from '../../../network'
import { useNavigate } from 'react-router-dom';

const CategoryInProducts = ({setProducts,setChildCategory}) => {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();
    const loadCategory = async () => {
        try {
            const res = await getFetch('/admin/category/parent', "")
            setCategories(res)
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
          setProducts(res)
          setChildCategory(category)
        } catch (err) {
          console.error(err);
        }
      };
    const responsive = {
        0: { items: 2 },
        600: { items: 3 },
        1024: { items: 12 },
    };

    return (
        <Box sx={{paddingY: "1rem", borderRadius: "1rem",paddingTop:"1rem" }}>
            <Box sx={{ paddingLeft: "1rem" }}>
                <AliceCarousel responsive={responsive} 
                disableDotsControls 
                disableButtonsControls 
                autoPlay 
                infinite
                autoPlayInterval={100}>
                    {categories.map((category, rowIndex) => (
                        <Box
                            key={rowIndex}
                            sx={{
                                paddingTop: '1rem',
                                paddingRight: '0.6rem',
                                width: '120px',
                                alignItems: 'center',
                                border: "solid",
                                display: 'flex',
                                borderColor: "#F2F1EB",
                                height: "180px",
                                flexDirection: 'column',
                                gap: 2,
                                background: "#F5F7F8",
                                cursor: "pointer"
                            }}
                            onClick={() => {
                                getProducts(category)
                            }}
                        >
                            <Avatar src={category.imageUrl} sx={{ height: '60%', width: '100%', backgroundRepeat: "no-repeat" }} />
                            <Typography sx={{ fontSize: '0.875rem', textAlign: 'center', fontWeight: 'bold' }}>
                                {category.name}
                            </Typography>
                        </Box>

                    ))}
                </AliceCarousel>
            </Box>

        </Box>
    );
};

export default CategoryInProducts;