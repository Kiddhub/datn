import React, { useEffect, useState } from 'react';
import { Box, Typography, MenuItem, Select } from '@mui/material';
import ProductCard from './ProductCard';
import Filter from './Filter';
import Pagination from './Pagination';
import { useLocation } from 'react-router-dom';
import CategoryInProducts from '../Global/CategoryInProducts';

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const location = useLocation();
  const { state: 
    locationState } = location;
  const [products, setProducts] = useState(locationState.products);
  const pageCount = 10;
  const [sortBy, setSortBy] = useState(''); // State to track sorting option
  const [firstProducts,setFirstProducts] = useState(locationState.products);
  const [childCategory,setChildCategory] = useState(locationState.categories || [])
  // Function to sort products based on selected option
  const sortProducts = (products, sortBy) => {
    switch (sortBy) {
      case 'asc':
        return [...products].sort((a, b) => a.sizes[0].price - b.sizes[0].price);
      case 'desc':
        return [...products].sort((a, b) => b.sizes[0].price - a.sizes[0].price);
      case 'bestSeller':
        // Implement your logic to sort by best seller
        return products; // Just return the original list for now
      default:
        return products;
    }
  };

  useEffect(() => {
    // Sort products when sortBy state changes
    console.log(">>>>",location)
    const sortedProducts = sortProducts(products, sortBy);
    setProducts(sortedProducts);
  }, [sortBy]);

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <>
    <Box>
      <CategoryInProducts setProducts={setProducts} setChildCategory={setChildCategory}/>
    </Box>
      <Box>
        <Box sx={{ display: "flex", paddingLeft: "1rem", paddingTop: "1rem" }}>
          <Box sx={{ flex: "1 0 10%" }}>
            <Filter category={childCategory} setProducts={setProducts} products={firstProducts} />
          </Box>
          <Box sx={{ flex: "1 0 80%", overflowY: "auto", paddingX: "1rem" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom:"1rem" }}>
              <Typography>Sắp xếp theo</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2}}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortBy}
                  onChange={handleChange}
                  sx={{ width: "150px",height:"40px" }}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="asc">Tăng dần</MenuItem>
                  <MenuItem value="desc">Giảm dần</MenuItem>
                  <MenuItem value="bestSeller">Bán chạy</MenuItem>
                </Select>
              </Box>
            </Box>
            <ProductCard products={products} currentPage={currentPage} itemsPerPage={itemsPerPage} />
            <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Product;
