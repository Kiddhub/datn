import {
    Box,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Button,
    TablePagination,
    IconButton,
    Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import useRequireAuth from "../Auth/RequireAuth";
import { getFetch, putFetch } from "../../../network";
import GradeIcon from '@mui/icons-material/Grade';
import CheckIcon from '@mui/icons-material/Check';
import Status from "../Global/Status";
import CloseIcon from '@mui/icons-material/Close';
import RatingModal from "./RatingModal";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from "react-router-dom";
const ListOrder = () => {
    const token = useRequireAuth();
    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showAlert, setShowAlert] = useState(false)
    const [alertSeverity, setAlertSeverity] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [openModal,setOpenModal] = useState(false);
    const [productId,setProductId] = useState(0);
    const navigate = useNavigate();
    const handleOpen = () => {
        setOpenModal(true)
    }
    const handleClose = () => {
        setOpenModal(false)
    }
    const columns = [
        { id: "id", name: "Id" },
        { id: "name", name: "Tên khách hàng" },
        { id: "address", name: "Địa chỉ" },
        { id: "mobile", name: "Số điện thoại" },
        { id: "createdAt", name: "Thời gian tạo" },
        { id: "deliveryDate", name: "Thời gian vận chuyển" },
        { id: "totalPrice", name: "Tổng tiền" },
        { id: "discountPrice", name: "Tổng tiền sau giảm" },
        { id: "payment", name: "Thanh toán" },
        { id: "status", name: "Trạng thái" },
        { id: "action", name: "Hành động" },
    ];

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }
    const loadOrder = async () => {
        try {
            const res = await getFetch('/user/order/', token)
            console.log(res)
            setOrders(res)
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        loadOrder()
    }, [token,showAlert])
    const handleClick = async (status, orderId) => {
        try {
            const res = await putFetch(`/user/order/${orderId}`, { status: status }, token)
            setShowAlert(true)
            setAlertSeverity("success")
            setAlertMessage("Duyệt thành công")
        } catch (err) {
            console.error(err);
            setShowAlert(true)
            setAlertSeverity("error")
            setAlertMessage("Duyệt thất bại")
        }
    }
    const handleRating = (product) => {
        setProductId(product)
        setOpenModal(true)
    }
    return (
        <>
            <div className="px-10 py-10">
                <Paper sx={{ width: "100%", borderRadius: "1.6rem" }}>
                    <TableContainer sx={{ borderRadius: "1.6rem" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columns.map((coloumn) => (
                                        <TableCell
                                            key={coloumn.id}
                                            sx={{ backgroundColor: "#F6F9FB", color: "#000000" }}
                                        >
                                            {coloumn.name}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, i) => (
                                        <TableRow
                                            key={i}
                                            sx={{
                                                cursor: "pointer",
                                                ":hover": {
                                                    bgcolor: "#EEEEEE",
                                                },
                                            }}
                                        // onClick={() => navigate(`/orders/${row.id}`)}
                                        >
                                            <TableCell>{++i}</TableCell>
                                            <TableCell>{row.firstName} {row.lastName}</TableCell>
                                            <TableCell>{row.address}</TableCell>
                                            <TableCell>{row.mobile}</TableCell>
                                            <TableCell>{row.createdAt}</TableCell>
                                            <TableCell>{row.deliveryDate}</TableCell>
                                            <TableCell>{row.totalPrice}</TableCell>
                                            <TableCell>{row.discountPrice}</TableCell>
                                            <TableCell>{row.payment}</TableCell>
                                            <TableCell>
                                                <Status name={row.status} />
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    row.status === 'DELIVERY' ? (
                                                        <IconButton onClick={() => {
                                                            handleClick('SHIPPED',row.id)
                                                          }}>
                                                            <CheckIcon />
                                                        </IconButton>
                                                    )
                                                        : (
                                                            <>
                                                            </>
                                                        )
                                                }
                                                {
                                                    row.status === 'REQUEST' ? (
                                                        <IconButton onClick={() => {
                                                            handleClick('CANCEL',row.id)
                                                          }}>
                                                            <CloseIcon />
                                                        </IconButton>
                                                    ) : (
                                                        <>
                                                        </>
                                                    )
                                                }
                                                <IconButton onClick={()=>{
                                                    handleRating(row.orderItems[0]?.product.id)
                                                }}>
                                                    <GradeIcon />
                                                </IconButton>
                                                <IconButton onClick={() =>{
                                                   navigate(`${row.id}`, { state: { orderId: row.id } });
                                                }}>
                                                    <InfoOutlinedIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        count={orders.length}
                        component="div"
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        backIconButtonProps={{
                            "aria-label": "Previous Page",
                        }}
                        nextIconButtonProps={{
                            "aria-label": "Next Page",
                        }}
                    />
                </Paper>
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
            <RatingModal openModal={openModal} handleClose={handleClose} productId={productId} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertSeverity={setAlertSeverity}/>
        </>
    );
};

export default ListOrder;
