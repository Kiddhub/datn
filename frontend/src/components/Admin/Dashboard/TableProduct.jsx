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
import { useEffect, useState } from "react";
import ProductStatus from "../../Shop/Product/ProductStatus";

const TableProduct = ({products}) => {
    const [rows, rowchange] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        // Lọc các sản phẩm có trạng thái là "REQUEST"
        const filtered = products.filter(product => product.status === "REQUEST");
        setFilteredProducts(filtered);
    }, [products]);

    const columns = [
        { id: "id", name: "Id" },
        { id: "name", name: "Name" },
        { id: "imageUrl", name: "Image" },
        { id: "status", name: "Status" },
        { id: "shop", name: "Shop" },
    ];

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }

    return (
        <div className="px-10 py-10">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div className="flex-col">
                    <Typography variant="h6">Các sản phẩm yêu cầu</Typography>
                </div>
            </Box>
            <Paper sx={{ width: "100%", borderRadius: "1.6rem" }}>
                <TableContainer sx={{ borderRadius: "1.6rem" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        sx={{ backgroundColor: "#F6F9FB", color: "#000000" }}
                                    >
                                        {column.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            cursor: "pointer",
                                            ":hover": {
                                                bgcolor: "#EEEEEE",
                                            },
                                        }}
                                    >
                                        <TableCell>{++index}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>
                                            <img src={row.imageUrl} alt="image" className="w-20" />
                                        </TableCell>
                                        <TableCell>
                                            <ProductStatus name={row.status} />
                                        </TableCell>
                                        <TableCell>{row.shop.name}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    count={products.length}
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
    );
};

export default TableProduct;
