import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
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
} from "@mui/material";
import { coupon_db } from '../../../data/dummy';
const ReportProduct = () => {
    const [rows, rowchange] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [products, setProducts] = useState([])
    const [noProducts, setNoProducts] = useState(false)
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt")
    // useEffect(() => {
    //   loadProducts()
    // }, [])
    const loadProducts = async () => {
        const data = await axios.get("http://localhost:8080/api/shop/product/", {
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json"
            },
        })
        if (data.data == null) {
            setNoProducts(true)
        }
        setProducts(data.data)
    }
    const columns = [
        { id: "id", name: "Id" },
        { id: "user", name: "User" },
        { id: "report_type", name: "Report Type" },
        { id: "description", name: "Description" },

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
            <div className="px-10 py-10">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="flex-col">
                        <Typography variant="h5">{coupon_db.length} Report</Typography>
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
                                {coupon_db
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
                                            <TableCell>
                                                {row.time_start}
                                            </TableCell>
                                            <TableCell>
                                                {row.time_end}
                                            </TableCell>
                                            <TableCell>
                                                {row.status}
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
                        count={coupon_db.length}
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

export default ReportProduct