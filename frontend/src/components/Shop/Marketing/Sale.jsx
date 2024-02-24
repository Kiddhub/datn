import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Alert,
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
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import AddProductSale from './AddProductSale';
import { getFetch } from '../../../network';
import { useSelector } from 'react-redux';
import Status from '../Global/Status';
const Sale = () => {
    const token = useSelector((state) => state.token.value)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [noProducts, setNoProducts] = useState(false)
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [alertSeverity, setAlertSeverity] = useState(false)
    const [alertMessage, setAlertMessage] = useState(false)
    const [saleId, setSaleId] = useState(0)
    const handleOpen = (id) => {
        setSaleId(id)
        setOpen(true)
    }
    const handleClose = () => setOpen(false)
    useEffect(() => {
        loadSale()
    }, [token])
    const loadSale = async () => {
        try {
            const res = await getFetch('/admin/sale/', token)
            setData(res)
        } catch (err) {
            console.error(err)
        }
    }
    const columns = [
        { id: "id", name: "Id" },
        { id: "description", name: "Description" },
        { id: "discountType", name: "Discount Type" },
        { id: "discountNumber", name: "Discount Number" },
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

    return (
        <>

            <div className="px-10 py-10">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="flex-col">
                        <Typography variant="h5">{data.length} chương trình</Typography>
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
                                                <Status name={row.status} />
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/shop/sale/${row.id}`} state={{ data: row }}>
                                                    <InfoIcon sx={{ marginRight: "0.75rem", cursor: "pointer" }} />
                                                </Link>
                                                <AddIcon sx={{ cursor: "pointer" }} onClick={() => handleOpen(row.id)} />
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

            <AddProductSale
                open={open}
                handleClose={handleClose}
                saleid={saleId}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                setAlertSeverity={setAlertSeverity}
                setAlertMessage={setAlertMessage} />
        </>)
}

export default Sale