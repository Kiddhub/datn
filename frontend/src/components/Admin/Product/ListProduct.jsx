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
import { Link, useNavigate } from "react-router-dom";
import ProductStatus from "../../Shop/Product/ProductStatus";
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import { putFetch } from "../../../network";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import useRequireAuth from "../Login/RequireAuth";

const ListProducts = ({products,setShowAlert,setAlertSeverity,setAlertMessage}) => {
    const token = useRequireAuth();
    const [rows, rowchange] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();
    const [product,setProduct] = useState(products);

    const columns = [
        { id: "id", name: "Id" },
        { id: "name", name: "Name" },
        { id: "imageUrl", name: "Image" },
        { id: "status", name: "Status" },
        { id: "shop", name: "Shop" },
        { id: "action", name: "Action" },
    ];

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }

    const handleConfirm = async (id) => {
        try {
            const res = await putFetch(`/admin/product/confirm/accept/${id}`, {}, token);
            setShowAlert(true);
            setAlertSeverity("success");
            setAlertMessage("Duyệt sản phẩm thành công");
        } catch (err) {
            console.error(err);
            setShowAlert(true);
            setAlertSeverity("error");
            setAlertMessage("Duyệt sản phẩm thất bại");
        }
    };

    const handleDeny = async (id) => {
        try {
            const res = await putFetch(`/admin/product/confirm/denied/${id}`, {}, token);
            setShowAlert(true);
            setAlertSeverity("success");
            setAlertMessage("Duyệt sản phẩm thành công");
        } catch (err) {
            console.error(err);
            setShowAlert(true);
            setAlertSeverity("error");
            setAlertMessage("Duyệt sản phẩm thất bại");
        }
    };

    return (
        <div className="px-10 py-10">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div className="flex-col">
                    <Typography variant="h5">{products.length} Sản Phẩm</Typography>
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
                            {products
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
                                        <TableCell sx={{display:"flex",gap:1}}>
                                            {row.status === "REQUEST" ? (
                                                <>
                                                <DoneIcon onClick={() => {
                                                    handleConfirm(row.id);
                                                }} />
                                                <BlockIcon onClick={(e) => {
                                                    handleDeny(row.id);
                                                }} />
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                            <Link to={`/admin/products/${row.id}`} state={{ data: row }}>
                                                <InfoOutlinedIcon sx={{ marginRight: "0.5rem", cursor: "pointer" }} />
                                            </Link>
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

export default ListProducts;
