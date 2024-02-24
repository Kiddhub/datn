import React, { useEffect, useState } from 'react'
import Header from './Global/Header'
import { Box, Paper, Typography } from '@mui/material'
import Category from './Global/CategorySide'
import { SlideAds1 } from './Global/SlideAds1'
import { SlideAds2 } from './Global/SlideAds2'
import { SlideAds3 } from './Global/SlideAds3'
import AdsCard from './Ads/AdsCard'
import AdsCategory from './Ads/AdsCategory'
import SuggestProduct from './Ads/SuggestProduct'
import { getFetch } from '../../network'
const Customer = () => {
  const[products,setProducts] = useState([])
  const loadProducts = async () =>{
    try{
      const res = await getFetch('/user/product/',"")
      console.log(">> res",res)
      setProducts(res)
    }catch(err){
      console.error();
    }
  }
  useEffect(()=>{
  loadProducts()
  },[])
  const getRandomElements = (array, n) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }
  const filterProductsByShop = (products, shopName) => {
    return products.filter(product => product.shop.name === shopName);
  }

  const appleStoreProducts = filterProductsByShop(products, "Apple Flagship Store");
  const panasonicProducts = filterProductsByShop(products, "Panasonic Official Store");

  const randomProducts1 = getRandomElements(products, 4);
  const randomProducts2 = getRandomElements(products, 4);
  const randomProducts3 = getRandomElements(products, 4);
  return (
    <>
      <Box >
        <Box sx={{ paddingX: "1rem", paddingY: "1rem" }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "50%" }}>
              <SlideAds1 />
            </Box>
            <Box sx={{ width: "50%" }}>
              <SlideAds3 />
            </Box>
          </Box>
          <Box sx={{ marginTop: "1rem" }}>
            <SlideAds2 />
          </Box>
        </Box>
        <Box sx={{ paddingX: "1rem", paddingY: "2rem", display: "flex", gap: 1 }}>
          <Box sx={{ width: "60%" }}>
            <AdsCard name="Pick up where you left" products={randomProducts1} />
          </Box>
          <Box sx={{ width: "60%" }}>
            <AdsCard name="Today Sale for you" products={randomProducts2} />
          </Box>
          <Box sx={{ width: "60%" }}>
            <AdsCard name="Buy with voucher" products={randomProducts3} />
          </Box>
        </Box>
        <Box sx={{ paddingX: "1rem", paddingY: "2rem", display: "flex", gap: 1, height: "auto" }}>
          <Box sx={{ flex: "0 10% 0" }}>
            <Category />
          </Box>
          <Box sx={{ flex: "0 80% 0" }}>
            <AdsCategory name="Apple" products = {appleStoreProducts} />
            <AdsCategory name="Panasonic" products = {panasonicProducts} />
          </Box>
        </Box>
        <Box sx={{ paddingX: "1rem", paddingY: "2rem", display: "flex", gap: 1, height: "auto" }}>
          <img src='https://m.media-amazon.com/images/I/71nwqPZaNRL._SX3000_.jpg' className='h-1/2' />
        </Box>

        <Box sx={{ paddingX: "1rem", paddingY: "2rem", display: "flex", gap: 1, height: "auto" }}>
          <SuggestProduct products={products} />
        </Box>
      </Box>
    </>

  )
}

export default Customer