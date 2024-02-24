import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TablePagination,
  IconButton,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { putFetch } from "../../../network";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Status from "./Status";
import useRequireAuth from "../Login/RequireAuth";
const ListOrders = ({orders}) => {
 const token = useRequireAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const columns = [
    { id: "id", name: "ID" },
    { id: "name", name: "Name" },
    { id: "address", name: "Address" },
    { id: "mobile", name: "Phone" },
    { id: "createdAt", name: "Created At" },
    { id: "deliveryDate", name: "Delivery Date" },
    { id: "totalPrice", name: "Total Price" },
    { id: "discountPrice", name: "Discount Price" },
    { id: "payment", name: "Payment" },
    { id: "status", name: "Status" },
    { id: "action", name: "Action" },
  ];
  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }
  const handleClick = async (status, orderId) => {
    try {
      const res = await putFetch(`/shop/order/${orderId}`, { status: status }, token)
      setShowAlert(true)
      setAlertSeverity("success")
      setAlertMessage("Duyệt thành công")
    } catch (err) {
      console.error(err);
      setShowAlert(true)
      setAlertSeverity("error")
      setAlertMessage("Duyệt thất bại")
    }
  }
  return (
    <>
      <div className="px-10 py-10">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <div className="flex-col">
            <Typography variant="h5">{orders.length} Đơn hàng</Typography>
            <LinearProgress
              variant="determinate"
              value={(orders.length / 1000) * 100}
            />
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
                {orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{
                        cursor: "pointer",
                        ":hover": {
                          bgcolor: "#EEEEEE",
                        },
                      }}
                    >
                      <TableCell style={{ width: '2%' }}>{++i}</TableCell>
                      <TableCell style={{ width: '5%' }}>{row.firstName} {row.lastName}</TableCell>
                      <TableCell style={{ width: '5%' }}>{row.address}</TableCell>
                      <TableCell style={{ width: '5%' }}>{row.mobile}</TableCell>
                      <TableCell style={{ width: '15%' }}>{row.createdAt}</TableCell>
                      <TableCell style={{ width: '15%' }}>{row.deliveryDate}</TableCell>
                      <TableCell style={{ width: '9%' }}>{row.totalPrice}</TableCell>
                      <TableCell style={{ width: '9%' }}>{row.discountPrice}</TableCell>
                      <TableCell style={{ width: '2%' }}>{row.payment}</TableCell>
                      <TableCell>
                        <Status name={row.status} />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => {
                          navigate(`${row.id}`, { state: { orderId: row.id } });
                        }}>
                          <InfoOutlinedIcon />
                        </IconButton>
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
            count={orders.length}
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
      </div>
    </>
  );
};

export default ListOrders;
