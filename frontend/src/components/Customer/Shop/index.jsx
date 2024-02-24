import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getFetch } from '../../../network';
import ShopTab from './ShopTab';
import Filter from './Filter';
import ShopProductCard from './ShopProductCard';
import ShopPagination from './Pagination';
import SideFilter from './SideFilter';

const Shop = () => {
  const shopId = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct] = useState([])
  const itemsPerPage = 10;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const pageCount = 10;
  const [shop, setShop] = useState([])
  const loadShop = async (id) => {
    try {
      const res = await getFetch(`/user/shop/${id}`)
      setShop(res)
    } catch (err) {
      console.error(err)
    }
  }
  const loadProduct = async (id) => {
    try {
      const res = await getFetch(`/user/product/shop/${id}`)
      setProduct(res)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    loadShop(shopId.id)
    loadProduct(shopId.id)
  }, [shopId])

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <ShopTab
        name={shop.name}
        image={shop.imageUrl}
        category={shop.categoryShops}
        slogan={shop.slogan} />
      <Box sx={{display:"flex"}}>
        <Box sx={{width:"100%"}}>
          <Filter category={shop.categoryShops} setProduct={setProduct} />
          <ShopProductCard
            products={product}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
          <ShopPagination pageCount={pageCount} onPageChange={handlePageChange} />
        </Box>
        

      </Box>
    </Box>

  )
}

export default Shop