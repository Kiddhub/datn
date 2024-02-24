import React, { useEffect, useState } from 'react'
import {
    Alert,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    IconButton
} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import { useSelector } from 'react-redux';
import { getFetch, putFetch } from '../../../network';
import Status from '../Global/Status';
const ListCouponShop = () => {
    const token = useSelector((state) => state.token.value)
    const [rows, rowchange] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [coupon, setCoupon] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [alertSeverity, setAlertSeverity] = useState(false)
    const [alertMessage, setAlertMessage] = useState(false)
    useEffect(() => {
        loadCoupons()
    }, [token, showAlert])
    const loadCoupons = async () => {
        try {
            const res = await getFetch('/admin/coupon/couponShop/', token)
            setCoupon(res)
        } catch (err) {
            console.error(err)
        }

    }
    const handleConfirm = async (id) => {
        try {
            const res = await putFetch(`/admin/coupon/couponShop/confirm/accept/${id}`, {}, token)
            setShowAlert(true)
            setAlertSeverity("success")
            setAlertMessage("Duyệt thành công")
        } catch (err) {
            console.error(err)
            setShowAlert(true)
            setAlertSeverity("error")
            setAlertMessage("Duyệt thất bại")
        }
    }
    const handleDeny = async (id) => {
        try {
            const res = await putFetch(`/admin/coupon/couponShop/confirm/denied/${id}`, {}, token)
            setShowAlert(true)
            setAlertSeverity("success")
            setAlertMessage("Duyệt thành công")
        } catch (err) {
            console.error(err)
            setShowAlert(true)
            setAlertSeverity("error")
            setAlertMessage("Duyệt thất bại")
        }
    }
    const columns = [
        { id: "id", name: "Id" },
        { id: "code", name: "Code" },
        { id: "description", name: "Description" },
        { id: "quantity", name: "Quantity" },
        { id: "number", name: "Number" },
        { id: "timeStart", name: "Start" },
        { id: "timeEnd", name: "End" },
        { id: "shopId", name: "ShopID" },
        { id: "status", name: "Status" },
        { id: "action", name: "Action" },
    ];
    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }
    const handleSearch = (filteredProducts) => {
        setProducts(filteredProducts);
    };
    return (
        <>
            {/* <Box>
          <SearchProduct onSearch={(filteredProducts) => setProducts(filteredProducts)} />
        </Box> */}

            <div className="px-10 py-10">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="flex-col">
                        <Typography variant="h5">{coupon.length} Mã giảm giá</Typography>
                    </div>
                </Box>
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
                                {coupon
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, i) => (
                                        <TableRow key={i}
                                            sx={{
                                                cursor: "pointer",
                                                ":hover": {
                                                    bgcolor: "#EEEEEE",
                                                },
                                            }}
                                        >
                                            <TableCell>{++i}</TableCell>
                                            <TableCell>{row.code}</TableCell>
                                            <TableCell>
                                                {row.description}
                                            </TableCell>
                                            <TableCell>{row.quantity}</TableCell>
                                            <TableCell>
                                                {row.number}
                                            </TableCell>
                                            <TableCell>
                                                {row.timeStart}
                                            </TableCell>
                                            <TableCell>
                                                {row.timeEnd}
                                            </TableCell>
                                            <TableCell>
                                                {row.shopId}
                                            </TableCell>
                                            <TableCell>
                                                <Status name={row.status} />
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    row.status === "REQUEST" ? (
                                                        <>
                                                            <IconButton
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleConfirm(row.id);
                                                                }}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <DoneIcon variant="contained" />
                                                            </IconButton>
                                                            <IconButton
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDeny(row.id);
                                                                }}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <BlockIcon variant="contained" />
                                                            </IconButton>
                                                        </>
                                                    ) :(<></>)
                                                }
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
                    count={coupon.length}
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
        </div >
        </>)
}

export default ListCouponShop