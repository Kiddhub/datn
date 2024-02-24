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
import { useState } from "react";

const TableReport = ({ reports }) => {
    const [rows, rowchange] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const columns = [
        { id: "id", name: "Id" },
        { id: "user", name: "User" },
        { id: "reportType", name: "Report Type" },
        { id: "message", name: "Message" }
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
                    <Typography variant="h6">Báo cáo sản phẩm</Typography>
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
                            {reports
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
                                        <TableCell>{row.user?.email}</TableCell>
                                        <TableCell>
                                            {row.reportType}
                                        </TableCell>
                                        <TableCell>
                                            {row.message}
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
    );
};

export default TableReport;
