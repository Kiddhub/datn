import { useStateContext } from "../../../context/ContextProvider";
import { useEffect, useState } from "react";
import Sidebar from "../Global/Sidebar";
import Navbar from "../Global/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Products from "../Product/Products";
import EditProduct from "../Product/EditProduct";
import AddProduct from "../Product/AddProduct";
import Orders from "../Order/Orders";
import OrderDetails from "../Order/OrderDetails";
import Profile from "../ShopInfo/Profile";
import Ratings from "../ShopInfo/Rating";
import RatingDetails from "../ShopInfo/RatingDetails";
import CategoryShop from "../ShopInfo/CategoryShop";
import Coupon from "../Marketing/Coupon";
import ChatApp from "../Chat/ChatApp";
import Sale from "../Marketing/Sale";
import SaleDetail from "../Marketing/SaleDetails";
import AddCoupon from "../Marketing/AddCoupon";
import { useSelector } from "react-redux";
import { getFetch } from "../../../network";
import SignIn from "../AuthShop/SignIn";
import CouponDetails from "../Marketing/CouponDetails";
import Dashboard from "../Dashboard/Dashboard";
import CategoryShopDetail from "../ShopInfo/CategoryShopDetail";

const Page = () => {
  const token = useSelector((state) => state.token.value)
  const navigate = useNavigate();
  const [shop, setShop] = useState([])

  const loadShop = async () => {
    getFetch(`/shop/`, token)
      .then(res => {
        console.log(">>>", res)
        setShop(res);
      }).catch(err => {
        console.error(err)
        navigate("/shop/newShop")
      })
  }
  useEffect(() => {
    loadShop();
}, [token]);
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
            <Sidebar shop={shop} />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar shop={shop} />
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
            <Navbar shop={shop} />
          </div>
          <div>
            <Routes>
              <Route path="products/list" element={<Products shop={shop} />} />
              <Route path="products/update/:id" element={<EditProduct />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<OrderDetails />} />
              <Route path="rating" element={<Ratings />} />
              <Route path="rating/:id" element={<RatingDetails />} />
              <Route path="category/" element={<CategoryShop />} />
              <Route path="category/:id" element={<CategoryShopDetail/>}/>
              <Route path="/profile" element={<Profile shop={shop} />} />
              <Route path="coupon/" element={<Coupon />} />
              <Route path="coupon/:id" element={<CouponDetails />} />
              <Route path="/chat" element={<ChatApp />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/sale/:id" element={<SaleDetail />} />
              <Route path="/coupon/new" element={<AddCoupon />} />
              <Route path="/" element={<Dashboard/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  ):(<SignIn/>);

}


export default Page;
