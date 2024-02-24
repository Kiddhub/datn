import { Box, Input, MenuItem, Select, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import {  getFetchWithParams } from '../../../network';
import { useParams } from 'react-router-dom';
import { debounce, sortBy } from 'lodash';

const Filter = ({ category, setProduct }) => {
    const [filer, setFilter] = useState([])
    const params = useParams();
    const item = [
        {
            id: 0,
            name: "Tất cả sản phẩm"
        },
        ...(Array.isArray(category) ? category : [])
    ];
    const buttonItem = [
        {
            id: 0,
            name: ""
        },
        {
            id: 1,
            name: "Phổ biến",
        },
        {
            id: 2,
            name: "Tăng dần",
        },
        {
            id: 3,
            name: "Giảm dần",
        },
    ];
    const [selectFilter, setSelectFilter] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
    const handleCategoryClick = async (name, index) => {
        const filterProduct = {
            shopId: params.id,
            ...(name !== "Tất cả sản phẩm" && { categoryName: name }),
        };
        try {
            const res = await getFetchWithParams("/user/product/filter1", filterProduct)
            setProduct(res)
            setFilter(res)
        } catch (err) {
            console.error(err)
        }
        setSelectedCategoryIndex(index);
    };
    const handleChange = (event) => {
        const value = event.target.value;
        setSelectFilter(value);
        let sortedProducts = []
        switch (value) {
            case 0:
                sortedProducts = filer;
                break;
            case 1: 
                sortedProducts = sortBy(filer, 'popularity'); 
                break;
            case 2: 
                sortedProducts = sortBy(filer, (product) => product.sizes[0]?.price || 0);
                break;
            case 3: 
                sortedProducts = sortBy(filer, (product) => -(product.sizes[0]?.price || 0));
                break;
            default:
                break;
        }

        
        setProduct(sortedProducts);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        const data = {
            shopId: params.id,
            name: value || null,
        };
        searchProducts(data)
    };
    const searchProducts = debounce(async (data) =>{
        try {
            const res = await getFetchWithParams("/user/product/search", data);
            console.log(">>>res", res);
            setProduct(res);
        } catch (err) {
            console.error(err);
        }
    },300)
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", alignItems: "center" }}>
                <Box>
                    <Tabs value={selectedCategoryIndex} sx={{ borderRadius: "0.4rem" }}>
                        {item?.map((categoryItem, index) => (
                            <Tab
                                key={categoryItem.id}
                                label={categoryItem.name}
                                onClick={() => handleCategoryClick(categoryItem.name, index)}
                                sx={{
                                    background:
                                        selectedCategoryIndex === index
                                            ? '#93BFCF'
                                            : '#F5F7F8',
                                }}
                            />
                        ))}
                    </Tabs>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography>Sắp xếp theo</Typography>
                    <Select
                        value={selectFilter}
                        onChange={handleChange}
                        sx={{ borderRadius: "0.4rem", height: '50px', marginRight: '10px' }}
                    >
                        {buttonItem.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <Input
                        placeholder="Tìm kiếm"
                        value={searchValue}
                        onChange={handleSearchChange}
                        sx={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '0.4rem',
                            width: '200px',
                            height: '50px', // Set the height for Input to match the height of Select
                        }}
                    />
                </Box>
            </Box>

        </>
    );
};

export default Filter;
