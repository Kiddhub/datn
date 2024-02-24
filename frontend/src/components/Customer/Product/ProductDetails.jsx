import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Paper, Rating, TextField, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getFetch, postFetch } from '../../../network';
import ProductDescription from './ProductDescription';
import ProductRating from './ProductRating';
import SideProduct from './SideProduct';
import ModalOption from './ModalOption';
import { useSelector } from 'react-redux';
import ReportModal from './ReportModal';
import { debounce, get } from 'lodash';

const ProductDetails = () => {
  const token = useSelector((state) => state.token.value);
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [shop, setShop] = useState([]);
  const [listPrice, setListPrice] = useState("");
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [openReport, setOpenReport] = useState(false);
  const [shopProducts,setSameShopProducts] = useState([])
  const [products,setSameProducts] = useState([])
  const handleOpenReport = () => { 
    setOpenReport(true) 
  };
  const handleCloseReport = () => { setOpenReport(false) };
  const handleOpen = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };
  const params = useParams();

  useEffect(() => {
    loadProducts(params.id)
    // sameShopProducts();
  }, [params, showAlert]);
  const loadProducts = async (id) => {
    try {
      const res = await getFetch(`/user/product/details/${id}`, "");
      setProduct(res);
      setShop(res.shop);
      loadListPrice(res.sizes);
      sameShopProducts(res.shop.id);
      sameProducts(res.category?.id)
    } catch (err) {
      console.error(err);
    }
  }
  const sameShopProducts =  async (id) => {
    try {
      const res = await getFetch(`/user/product/shop/${id}`, "")
      console.log(">> resSameProductttttt", res)
      setSameShopProducts(res)
    } catch (err) {
      console.error(err);
    }
  };
  
  const sameProducts = async (id) =>{
    try{
      const res = await getFetch(`/user/product/search/${id}`,"")
      console.log(">> res1",res)
      setSameProducts(res)
    }catch(err){
      console.error(err);
    }
  }
  const handleType = (type) => {
    setQuantity(type.quantity);
    if (product.discountType === "PERCENT") {
      const discountedPrice = type.price - type.price * (product.discountNumber / 100);
      setDiscount(discountedPrice);
    }
    if (product.discountType === "VND") {
      const discountedPrice = type.price - product.discountNumber;
      setDiscount(discountedPrice);
    }
    setPrice(type.price);
  }

  const loadListPrice = (sizes) => {
    if (sizes.length > 0) {
      sizes.sort((a, b) => a.price - b.price);
      const lowestPrice = formatPrice(sizes[0].price);
      sizes.sort((a, b) => b.price - a.price);
      const highestPrice = formatPrice(sizes[0].price);
      const string = `${lowestPrice} - ${highestPrice}`;
      setListPrice(string);
    } else {
      console.log("Sizes array is empty.");
    }
  }

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const sendMessage = async () => {
    if (token === '') {
      navigate("/login");
    }
    try {
      const form = {
        content: window.location.href,
        receiptedId: product.shop?.id
      };
      console.log(">>> gui tin nhan", form);
      const res = await postFetch('user/chats/messages', form, token);
      console.log(">>> res", res);
      navigate("/chat");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Box sx={{ padding: "1rem" }}>
        <Box sx={{ display: "flex", margin: "1rem" }}>
          <Box sx={{ flex: "1 0 10%", paddingRight: "1rem" }}>
            <img src={product.imageUrl} />
          </Box>
          <Box sx={{ flex: "1 0 50%" }}>
            <Typography sx={{ fontSize: "2rem", fontWeight: "400" }}>
              {product.name}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", alignContent: "center" }}>
              <Link to={`/page/${shop.id}`}>
                <Typography sx={{
                  color: "#007185",
                  fontSize: "1rem",
                  '&:hover': {
                    textDecoration: "underline"
                  }
                }}>Visit Shop</Typography>
              </Link>
              <Typography>|</Typography>
              <Button onClick={() => handleOpenReport()}>Báo cáo sản phẩm ❌</Button>
            </Box>
            {discount ? (
              <>
                <div className="flex gap-2 items-center">
                  <Typography sx={{ color: "#424769", fontSize: "0.8rem", textDecoration: "line-through" }}>{price}</Typography>
                  <Typography sx={{ color: "#EF4040", fontSize: "2rem" }}>₫ {formatPrice(discount)}</Typography>
                </div>
              </>)
              : (<div className="flex">
                <div className='mr-[2px] text-[1.3rem] '>₫</div>
                {price ? (<Typography sx={{ color: "#EF4040", fontSize: "2rem" }}>{formatPrice(price)}</Typography>) :
                  (<Typography sx={{ color: "#EF4040", fontSize: "2rem" }}>{listPrice}</Typography>)}
              </div>)}
            <Box sx={{ display: "flex", gap: 5, paddingY: "1rem" }}>
              <Typography>Mã giảm giá</Typography>
              <Box width={{ display: "flex", gap: 11 }}>
                <div className="bg-[#2D9596] w-52 flex items-center justify-center text-white">10%</div>
                <div className="bg-[#2D9596] w-52 flex items-center justify-center text-white">20%</div>
                <div className="bg-[#2D9596] w-52 flex items-center justify-center text-white">30%</div>
                <div className="bg-[#2D9596] w-52 flex items-center justify-center text-white">40%</div>
              </Box>
            </Box>
            <Box sx={{ display: "flex", paddingTop: "1rem", gap: 2, alignItems: "center" }}>
              <Typography>Thể loại</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, padding: '1rem' }}>
                {product.sizes && Array.isArray(product.sizes) && product.sizes.map((item, index) => (
                  <Button
                    key={index}
                    sx={{
                      border: 'solid #776B5D 1px',
                      cursor: 'pointer',
                      '&:hover': { background: '#F3EEEA' },
                      boxSizing: 'border-box',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '40px',
                      width: '90px',
                      borderRadius: "0.5rem",
                      background: item ? '' : 'red'
                    }}
                    disabled={item.quantity === 0}
                    onClick={() => handleType(item)}
                  >
                    <Typography>{item.name}</Typography>
                  </Button>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: "flex", paddingTop: "1.5rem", gap: 9, alignItems: "center" }}>
              <Typography> Số lượng</Typography>
              <TextField
                id="outlined-number"
                type="number"
                placeholder='Số lượng'
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: { quantity }, // Giá trị max bạn muốn đặt
                }}
              />
              <Typography>Còn {quantity ? quantity : 0} sản phẩm</Typography>
            </Box>
            <Box sx={{ display: "flex", paddingTop: "1.5rem", gap: 2 }}>
              <Button sx={{ background: "#B31312", color: "#F4CE14", '&:hover': { color: "black" } }} onClick={handleOpen}>
                🛒 Thêm vào giỏ hàng
              </Button>
              <Button sx={{
                background: "#B31312",
                color: "#F4CE14", '&:hover': { color: "black" }
              }}
                onClick={(e) => sendMessage()}>
                Nhắn tin
              </Button>
            </Box>
          </Box>
        </Box>
      </Box >
      <Box sx={{ paddingY: "1rem", margin: "40px", gap: 2, display: "flex" }}>
        <Box sx={{ width: '80%' }} >
          <Paper sx={{ background: "#F3EEEA", marginBottom: "1rem" }} >
            <Typography variant='h6'>Mô tả sản phẩm</Typography>
            <ProductDescription des={product.description} />
          </Paper>
          <Paper sx={{ background: "#F3EEEA", marginBottom: "1rem" }}>
            <Typography variant='h6'>Đánh giá sản phẩm</Typography>
            <ProductRating product1={product} />
          </Paper>
        </Box>
      </Box>
      <Box sx={{ background: "#F3EEEA", padding: "20px", margin: "40px" }}>
        <Typography variant='h6'>Sản phẩm cùng Shop</Typography>
        <SideProduct products={shopProducts} name="Shop" />
      </Box>
      <Box sx={{ background: "#F3EEEA", padding: "20px", margin: "40px" }}>
        <Typography variant='h6'>Sản phẩm tương tự</Typography>
        <SideProduct products={products} name="Same" />
      </Box>

      <ModalOption
       open={open} 
       onClose={handleClose} 
       setData={product} 
       setShowAlert={setShowAlert}
       setAlertMessage={setAlertMessage}
      setAlertSeverity={setAlertSeverity} />
      <ReportModal 
      open={openReport} 
      onClose={handleCloseReport} 
      productId={product.id} 
      setShowAlert={setShowAlert}
      setAlertMessage={setAlertMessage}
      setAlertSeverity={setAlertSeverity}
      />
      <Box sx={{ padding: "2rem", justifyContent: 'space-between' }}>
        {
          showAlert && (
            <Alert
              severity={alertSeverity}
              onClose={() => setShowAlert(false)}
              sx={{
                marginBottom: "1rem",
                position: 'absolute',
                top: "5rem",
                right: 0,
              }}
              open={showAlert}
            >
              {alertMessage}
            </Alert>
          )
        }
      </Box>
    </>
  );
}

export default ProductDetails;
