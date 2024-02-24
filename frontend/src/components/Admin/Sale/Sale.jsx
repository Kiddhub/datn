import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
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
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HideSourceIcon from '@mui/icons-material/HideSource';
import { getFetch, putFetch } from '../../../network';
import { useSelector } from 'react-redux';
import LoadingPaper from '../Global/LoadingPaper';
import Status from '../Global/Status';

const Sale = () => {
    const token = useSelector((state) => state.token.value)
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [change,setChange] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
    const location = useLocation();

    useEffect(() => {
        const state = location?.state;
        if (state && state.showAlert) {
            setShowAlert(true);
            setAlertSeverity(state.alertSeverity);
            setAlertMessage(state.alertMessage);
        }
    }, [location]);
    const loadSale = async () => {
        getFetch(`/admin/sale/`, token)
            .then(res => {
                setData(res);
            }).catch(err => {
                console.error(err)
            })
    }

    useEffect(() => {
        loadSale()
    }, [token, showAlert,change])

    const columns = [
        { id: "id", name: "Id" },
        { id: "name", name: "Name" },
        { id: "description", name: "Description" },
        { id: "discountType", name: "Discounted Type" },
        { id: "discountNumber", name: "Discounted Number" },
        { id: "timeStart", name: "Start" },
        { id: "timeEnd", name: "End" },
        { id: "status", name: "Status" },
        { id: "action", name: "Action" },
    ];

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }
    const handleChangeStatus = async (id) => {
        try {
            const res = await putFetch(`/admin/sale/update/${id}`, {}, token);
            setShowAlert(true)
            setAlertSeverity("success")
            setAlertMessage("Chỉnh sửa thành công")
        } catch (err) {
            console.error(err);
            setShowAlert(true)
            setAlertSeverity("error")
            setAlertMessage("CHỉnh sửa thất bại");
        }
    }

    return (
        <>
            <div className="px-10 py-10">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="flex-col">
                        <Typography variant="h5">{data.length} Chương Trình Giảm Giá</Typography>
                    </div>

                    <Link
                        to={{
                            pathname: '/admin/sale/new',
                            state: {
                                setShowAlert,
                                setAlertMessage,
                                setAlertSeverity
                            }
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: "200px",
                                marginBottom: "1rem",
                                backgroundColor: "#427D9D",
                            }}
                        >
                            Thêm mới mã
                        </Button>
                    </Link>

                </Box>
                {data.length === 0 ? (
                    <LoadingPaper />
                ) : (
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
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{row.description}</TableCell>
                                                <TableCell>
                                                    {row.discountType}
                                                </TableCell>
                                                <TableCell>{row.discountNumber}</TableCell>
                                                <TableCell>
                                                    {row.timeStart}
                                                </TableCell>
                                                <TableCell>
                                                    {row.timeEnd}
                                                </TableCell>
                                                <TableCell>
                                                    <Status name={row.status}/>
                                                </TableCell>
                                                <TableCell>

                                                    <Link to={`/admin/sale/${row.id}`} state={{ data: row,flag:change }}>
                                                        <ModeEditIcon sx={{ marginRight: "0.5rem", cursor: "pointer" }} />
                                                    </Link>
                                                    <HideSourceIcon variant="contained" sx={{ cursor: "pointer" }} onClick={() => handleChangeStatus(row.id)}>
                                                        Hide
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
                        <Box sx={{ padding: "2rem", justifyContent: 'space-between' }}>
                            {/* ... (các phần khác của ListCategory) */}
                            {
                                showAlert && (
                                    <Alert
                                        severity={alertSeverity}
                                        onClose={() => {
                                            setShowAlert(false),
                                                setAlertSeverity("")
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
                    </Paper>
                )}

            </div >
        </>
    )
}

export default Sale;
