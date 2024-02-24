import Header from "../Global/Header";
import { Toolbar, Tab, Tabs, Box, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { getFetch } from "../../../network";
import ListProducts from "./ListProduct";
import useRequireAuth from "../Login/RequireAuth";
const Orders = () => {
    const token = useRequireAuth();
    const [selectedTab, setSelectedTab] = useState(0);
    const [products, setProducts] = useState([]);
    const [requestProducts, setRequestProducts] = useState([]);
    const [availableProduct, setAvailableProduct] = useState([]);
    const [banProducts, setBanProducts] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const loadProducts = async () => {
        try {
            const res = await getFetch('/admin/product/', token);
            setProducts(res);
            setRequestProducts(res.filter(order => order.status === "REQUEST"));
            setAvailableProduct(res.filter(order => order.status === "AVAILABLE"));
            setBanProducts(res.filter(order => order.status === "BANNED"));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadProducts();
    }, [token,showAlert]);
    return (
        <div className="md:m-20 md:mt-20">
            <Header title="List Products" category="Products" />
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
                                label="Đang hoạt động"
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
                                label="Bị cấm"
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
                {selectedTab === 0 && <ListProducts 
                products={products} 
                setShowAlert={setShowAlert}
                setAlertSeverity={setAlertSeverity}
                setAlertMessage={setAlertMessage}

                />}
                {selectedTab === 1 && <ListProducts 
                products={requestProducts} 
                setShowAlert={setShowAlert}
                setAlertSeverity={setAlertSeverity}
                setAlertMessage={setAlertMessage}
               
                />}
                {selectedTab === 2 && <ListProducts 
                products={availableProduct}
                setShowAlert={setShowAlert}
                setAlertSeverity={setAlertSeverity}
                setAlertMessage={setAlertMessage}

                 />}
                {selectedTab === 3 && <ListProducts 
                products={banProducts}
                setShowAlert={setShowAlert}
                setAlertSeverity={setAlertSeverity}
                setAlertMessage={setAlertMessage}

                 />}
            </div>
            <Box sx={{ padding: "2rem", justifyContent: 'space-between' }}>
                {showAlert && (
                    <Alert
                        severity={alertSeverity}
                        onClose={() => {
                            setShowAlert(false);
                            setAlertSeverity("");
                            setAlertMessage("");
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
                )}
            </Box>
        </div>
    );
};

export default Orders;
