import React, { useState } from 'react'
import {
    Avatar,
    Box,
    IconButton,
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
import DoneIcon from '@mui/icons-material/Done';
import HideSourceIcon from '@mui/icons-material/HideSource';
import Status from '../Global/Status';
import { putFetch } from '../../../network';
import useRequireAuth from '../Login/RequireAuth';
const SaleItem = ({ data, setShowAlert, setAlertSeverity, setAlertMessage, flag }) => {
    const token = useRequireAuth()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [products, setProducts] = useState([])
    const [noProducts, setNoProducts] = useState(false)

    const columns = [
        { id: "id", name: "Id" },
        { id: "name", name: "Name" },
        { id: "imageUrl", name: "Image" },
        { id: "status", name: "Status" },
        { id: "action", name: "Action" },
    ];
    function handleChangePage(event, value) {
        setPage(value);
    }
    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }
    const handleConfirm = async (id) => {
        try {
            const res = await putFetch(`/admin/sale/sale_items/confirm/${id}`, {}, token)
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
    const handleDeny = async (id) => {
        try {
            const res = await putFetch(`/admin/sale/sale_items/deny/${id}`, {}, token)
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
    return (
        <>
            <div className="px-10 py-10">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="flex-col">
                        <Typography variant="h5">{data.length} sản phẩm</Typography>
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
                                {data
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
                                            <TableCell>{row.product?.name}</TableCell>
                                            <TableCell>
                                                <Avatar src={row.product?.imageUrl} />
                                            </TableCell>
                                            <TableCell>
                                                <Status name={row.status} />
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    row.status === "AVAILABLE" ? (
                                                        <IconButton onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeny(row.id)
                                                        }}>
                                                            <HideSourceIcon variant="contained" sx={{ cursor: "pointer" }} />
                                                        </IconButton>) : (
                                                        <IconButton onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleConfirm(row.id)
                                                        }}>
                                                            <DoneIcon sx={{ marginRight: "0.5rem", cursor: "pointer" }} />
                                                        </IconButton>)
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
                        count={data.length}
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
        </>)
}

export default SaleItem