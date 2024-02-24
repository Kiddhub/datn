/* eslint-disable no-unused-vars */
import {
    Alert,
    Box,
    Button,
    IconButton,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { deleteFetch, getFetch } from "../../../network";
import useRequireAuth from "../AuthShop/RequireAuth";
import AddProductToCategory from "./AddProductToCategory";
import Status from "../Global/Status";
import ClearIcon from '@mui/icons-material/Clear';

const CategoryShopProduct = ({ categoryShopId }) => {
    const token = useRequireAuth();
    const [rows, rowchange] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [reports, setReports] = useState([])
    const [open, setOpen] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('')
    const [products, setProducts] = useState([])

    const loadProducts = async () => {
        try {
            const data = await getFetch('/shop/product/', token)
            console.log(">>data", data)
            setProducts(data)
        } catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        loadProducts()
    }, [token,showAlert])
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    useEffect(() => {
        loadReports()
    }, [])
    const loadReports = async () => {
        try {
            const data = await getFetch(`/shop/categoryShop/products/${categoryShopId}`, token)
            console.log(">>data", data)
            setReports(data)
        } catch (err) {
            console.log(err)
        }
    }
    const columns = [
        { id: "id", name: "Id" },
        { id: "name", name: "Product Name" },
        { id: "status", name: "Status" },
        { id: "action", name: "Action" }
    ];
    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }
    const handleDelete = async(id) =>{
        const form = {
            categoryShopId:categoryShopId,
            productId:id
        }
        console.log(">>> form",form)
        try{
            const res =await deleteFetch('/shop/categoryShop/products/delete',form,token)
            console.log(">>> res",res);
            setShowAlert(true)
            setAlertSeverity("success")
            setAlertMessage("Xoá thành công")
        }catch(err){
            console.error(err);
            setShowAlert(true)
            setAlertSeverity("error")
            setAlertMessage("Xoá thất bại")
        }
    }
    return (
        <>
            <div className="px-10 py-10">
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <div className="flex-col">
                        <Typography variant="h5">{reports.length} Sản phẩm</Typography>
                    </div>
                    <Button variant="contained" onClick={() => { handleOpen() }}>Add Product</Button>
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
                                {reports
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{++i}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>
                                                <Status name={row.status} />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={()=>handleDelete(row.id)}>
                                                    <ClearIcon />
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
                        count={reports.length}
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
            </div>
            <AddProductToCategory
                products={products}
                open={open}
                handleClose={handleClose}
                categoryId={categoryShopId}
                setShowAlert={setShowAlert}
                setAlertSeverity={setAlertSeverity}
                setAlertMessage={setAlertMessage}
            />
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
        </>
    );
};

export default CategoryShopProduct;
