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
import ProductStatus from "../Product/ProductStatus";

const TableOrder = ({ orders }) => {
    const [rows, rowchange] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        // Lọc các sản phẩm có trạng thái là "REQUEST"
        const filtered = orders.filter(order => order.status === "REQUEST");
        setFilteredOrders(filtered);
    }, [orders]);

    const columns = [
        { id: "id", name: "ID" },
        { id: "name", name: "Name" },
        { id: "address", name: "Address" },
        { id: "mobile", name: "Phone" },
        { id: "totalPrice", name: "Total Price" },
        { id: "discountPrice", name: "Discount Price" },
        { id: "payment", name: "Payment" },
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
                            {filteredOrders
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
                                        <TableCell >{++index}</TableCell>
                                        <TableCell >{row.firstName} {row.lastName}</TableCell>
                                        <TableCell >{row.address}</TableCell>
                                        <TableCell >{row.mobile}</TableCell>
                                        <TableCell >{row.totalPrice}</TableCell>
                                        <TableCell >{row.discountPrice}</TableCell>
                                        <TableCell >{row.payment}</TableCell>
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
                    count={filteredOrders.length}
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

export default TableOrder;
