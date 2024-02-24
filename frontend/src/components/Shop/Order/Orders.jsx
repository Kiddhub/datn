import Header from "../Global/Header";
import { Toolbar, Tab, Tabs, Box, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import ListOrders from "./ListOrders";
import { getFetch } from "../../../network";
import useRequireAuth from "../AuthShop/RequireAuth";
const Orders = () => {
  const token = useRequireAuth();
  const [selectedTab, setSelectedTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const [requestOrders, setRequestOrders] = useState([]);
  const [shippedOrders, setShippedOrders] = useState([]);
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [cancelOrders, setCancelOrders] = useState([]);
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const loadOrder = async () => {
    try {
      const res = await getFetch('/shop/order/', token);
      setOrders(res);
      setRequestOrders(res.filter(order => order.status === "REQUEST"));
      setShippedOrders(res.filter(order => order.status === "SHIPPED"));
      setDeliveryOrders(res.filter(order => order.status === "DELIVERY"));
      setCancelOrders(res.filter(order => order.status === "CANCEL"));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [token, showAlert]);
  return (
    <div className="md:m-20 md:mt-20">
      <Header title="Orders" category="Orders" />
      <div className="mt-10 bg-[#FFFFFF] rounded-16">
        <Box
          position="static"
          sx={{ backgroundColor: "#FFFFFF", borderRadius: "1.6rem" }}
        >
          <Toolbar>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              sx={{ marginRight: "auto" }}
            >
              <Tab
                label="Tất cả"
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
                label="Chờ xác nhận"
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
              <Tab
                label="Đang giao"
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
              <Tab
                label="Đã giao"
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
              <Tab
                label="Đơn huỷ"
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
        </Box>
        {selectedTab === 0 && <ListOrders 
        orders={orders} 
        setShowAlert={setShowAlert}
        setAlertSeverity={setAlertSeverity}
        setAlertMessage = {setAlertMessage}
        />}
        {selectedTab === 1 && <ListOrders 
        orders={requestOrders}
        setShowAlert={setShowAlert}
        setAlertSeverity={setAlertSeverity}
        setAlertMessage = {setAlertMessage}
         />}
        {selectedTab === 2 && <ListOrders 
        orders={shippedOrders} 
        setShowAlert={setShowAlert}
        setAlertSeverity={setAlertSeverity}
        setAlertMessage = {setAlertMessage}
        />}
        {selectedTab === 3 && <ListOrders 
        orders={deliveryOrders}
        setShowAlert={setShowAlert}
        setAlertSeverity={setAlertSeverity}
        setAlertMessage = {setAlertMessage} 
        />}
        {selectedTab === 4 && <ListOrders orders={cancelOrders}
        setShowAlert={setShowAlert}
        setAlertSeverity={setAlertSeverity}
        setAlertMessage = {setAlertMessage}
         />}
      </div>
      <Box sx={{ padding: "2rem", justifyContent: 'space-between' }}>
        {
          showAlert && (
            <Alert
              severity={alertSeverity}
              onClose={() => {
                setShowAlert(false),
                  setAlertSeverity(""),
                  setAlertMessage("")
              }}
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
    </div>
  );
};

export default Orders;
