import {
    Box,
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
import { useEffect, useState } from "react";

const TableRating = ({ ratings }) => {
    const [rows, rowchange] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterRatings,setFilterRatings] = useState([]);
    useEffect(() =>{
        const filtered = ratings.filter(rating => rating.reply === null);
        setFilterRatings(filtered);
    },[ratings])
    const columns = [
        { id: "id", name: "ID" },
        { id: "name", name: "Product Name" },
        { id: "rating", name: "Rating" },
        { id: "user", name: "User" },
        { id: "review", name: "Review" },
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
                    <Typography variant="h6">Đánh giá sản phẩm</Typography>
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
                            {filterRatings
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
                                        <TableCell>{row.product?.name}</TableCell>
                                        <TableCell>
                                            <Rating value={row.rating} readOnly />
                                        </TableCell>
                                        <TableCell>
                                            {row.user?.firstName}  {row.user?.lastName}
                                        </TableCell>
                                        <TableCell>
                                                row.review
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
                    count={ratings.length}
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

export default TableRating;
