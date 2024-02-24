import React, { useEffect, useState } from 'react'
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
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import { useSelector } from 'react-redux';
import { getFetch } from '../../../network';
const ListShop = () => {
    const token = useSelector((state) => state.token.value)
    const [rows, rowchange] = useState([]);
    const [page, setPage] = useState(0);
    const [shop,setShop] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const columns = [
        { id: "id", name: "ID" },
        { id: "name", name: "Name" },
        { id: "status", name: "Status" },
        { id: "action", name: "Action" },
    ];

    const loadShops = async () =>{
        try{
            const res = await getFetch('/admin/shop/',token)
            setShop(res)
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        loadShops()
    },[token])
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
                    <Typography variant="h5">{shop.length} Cửa hàng</Typography>
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
                            {shop
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{++i}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>
                                            {row.status}
                                        </TableCell>
                                        <TableCell>
                                            <div
                                                style={{ cursor: "pointer" }}
                                            >
                                                <DoneIcon sx={{ marginRight: "0.5rem" }} />
                                                <BlockIcon
                                                    variant="contained"
                                                    onClick={(e) => {
                                                        handleButtonClick(row.id);
                                                    }}
                                                >
                                                    {/* Nội dung của BlockIcon */}
                                                </BlockIcon>
                                            </div>
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
                    count={shop.length}
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
    )
}

export default ListShop