import { Link, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Toolbar, Tab, Tabs, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Details from "./OrderTabs/Details";
import Products from "./OrderTabs/Products";
import { getFetch } from "../../../network";
import useRequireAuth from "../Login/RequireAuth";

const OrderDetails = () => {
  const token = useRequireAuth();
  const param = useLocation();
  const orderId = param.state?.orderId;
  const [order, setOrder] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const loadOrder = async () => {
    try {
      const res = await getFetch(`/admin/order/${orderId}`, token)
      setOrder(res)
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    loadOrder()
  }, [token])

  const navigate = useNavigate();
  function handleBack() {
    navigate('/admin/orders');
  }
  return (
    <div className="px-10 py-10">
      <div className="mb-16">
        <div
          className="flex cursor-pointer rounded-full px-10 py-10 items-center"
          onClick={handleBack}
        >
          <ArrowBackIcon sx={{ width: "14px" }} />
          <Typography
            component={Link}
            sx={{ fontSize: "14px", fontWeight: "400", marginLeft: "0.4rem" }}
          >
            Orders
          </Typography>
        </div>
        <div className=""></div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-full ml-10">
              <Typography sx={{ fontSize: "1.8rem", fontWeight: "600" }}>
                Order {order.id}
              </Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: "400" }}>
                From {order.firstName}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <Box
        position="static"
        sx={{ backgroundColor: "#FFFFFF", borderRadius: "1.6rem",width:"60%" }}
      >
        <Toolbar>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            sx={{ marginRight: "auto" }}
          >
            <Tab
              label="Order Details"
              sx={{
                color: "black",
                position: "relative",
                "&:hover": {
                  color: "#E55604",
                  fontWeight: "bold",
                  "&::after": {
                    content: "''",
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#F35E3E",
                  },
                },
                "&.Mui-selected": {
                  color: "#E55604",
                  fontWeight: "bold",
                  "&::after": {
                    content: "''",
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#F35E3E",
                  },
                },
              }}
            ></Tab>

            <Tab
              label="Products"
              sx={{
                color: "black",
                position: "relative",
                "&:hover": {
                  color: "#E55604",
                  fontWeight: "bold",
                  "&::after": {
                    content: "''",
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#F35E3E",
                  },
                },
              }}
            />
          </Tabs>
        </Toolbar>
        {selectedTab === 0 && <Details order = {order} />}
        {selectedTab === 1 && <Products product = {order?.orderItems} />}
       
      </Box>
    </div>
  );
};

export default OrderDetails;
