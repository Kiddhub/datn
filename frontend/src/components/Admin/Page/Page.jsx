
import { useEffect, useState } from "react";
import Sidebar from "../Global/Sidebar";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useStateContext } from "../../../context/ContextProvider";
import Topbar from "../Global/Topbar";
import ProductTabs from "../Product/ProductTabs";
import ProductDetails from "../Product/ProductDetails";
import ListShop from "../Shop/ListShop";
import ListCoupon from "../Coupon/ListCoupon"
import AddCoupon from "../Coupon/AddCoupon";
import ListCouponShop from "../Coupon/ListCouponShop";
import Sale from "../Sale/Sale";
import SaleDetail from "../Sale/SaleDetail";
import AddSale from "../Sale/AddSale";
import Chat from "../Report/Chat";
import ListCategory from "../Category/ListCategory";
import { useSelector } from "react-redux";
import { Box, Button, Modal, Typography } from "@mui/material";
import CouponDetails from "../Coupon/CouponDetails";
import Report from "../Report/Report";
import Orders from "../Order/Orders";
import OrderDetails from "../Order/OrderDetails";
import Dashboard from "../Dashboard/Dashboard";


const Page = () => {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.value)
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu } =
    useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return token ? (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-[16rem] fixed sidebar dark:bg-secondary-dark-bg bg-[#111827] ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-[16rem] w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-[#FFFFFF] dark:bg-main-dark-bg navbar w-full ">
            <Topbar />
          </div>
          <div>
            <Routes>
              <Route path="/products" element={<ProductTabs />} />
              <Route path="/" element = {<Dashboard/>}/>
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/shops/" element={<ListShop />} />
              <Route path="/orders/" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
              <Route path="/coupon/" element={<ListCoupon />} />
              <Route path="/coupon/new" element={<AddCoupon />} />
              <Route path="/coupon/update/:id" element={<CouponDetails/>}/>
              <Route path="/couponShop" element={<ListCouponShop />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/sale/new" element={<AddSale />} />
              <Route path="/sale/:id" element={<SaleDetail />} />
              <Route path="/chat/" element={<Chat />} />
              <Route path="/report" element={<Report/>}/>
              <Route path="/category/" element={<ListCategory />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Modal
        open={open}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff', // White background for the modal content
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '400px', // Set the maximum width as needed
            textAlign: 'center', // Center the text inside the Box
          }}
        >
          <Typography>Đăng nhập</Typography>
          <Button
            onClick={() => navigate('/admin/login')}
            style={{
              backgroundColor: '#007bff', // Blue color for the button
              color: '#fff', // White text color
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: '0 auto', // Center the button inside the Box
            }}
          >
            Đăng nhập
          </Button>
        </Box>
      </Modal>

    </>
  );

}


export default Page;
