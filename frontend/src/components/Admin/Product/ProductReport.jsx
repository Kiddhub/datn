/* eslint-disable no-unused-vars */
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
import { getFetch } from "../../../network";
import useRequireAuth from "../Login/RequireAuth";


const ProductReport = ({ productId }) => {
    const token = useRequireAuth();
    const [rows, rowchange] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [reports, setReports] = useState([])
    useEffect(() => {
        loadReports()
    }, [])
    const loadReports = async () => {
        try {
            const data = await getFetch(`/admin/report/${productId}`, token)
            console.log(">>data", data)
            setReports(data)
        } catch (err) {
            console.log(err)
        }

    }
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
        <>
            <div className="px-10 py-10">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="flex-col">
                        <Typography variant="h5">{reports.length} Báo Cáo</Typography>
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
                                {reports
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{++i}</TableCell>
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
        </>
    );
};

export default ProductReport;
