import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Paper,
    Rating,
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
import { coupon_db, fake_sale } from '../../../data/dummy';
const SaleItem = () => {
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
        { id: "name", name: "Name" },
        { id: "imageUrl", name: "Image" },
        { id: "rating", name: "Rating" },
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
                        <Typography variant="h5">{coupon_db.length} sản phẩm</Typography>
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
                                {fake_sale
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
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>
                                                {row.time_end}
                                            </TableCell>
                                            <TableCell>
                                                {row.status}
                                            </TableCell>
                                            <TableCell>
                                                <DoneIcon sx={{ marginRight: "0.5rem", cursor: "pointer" }} />
                                                <HideSourceIcon variant="contained" sx={{ cursor: "pointer" }}>
                                                </HideSourceIcon>
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

export default SaleItem