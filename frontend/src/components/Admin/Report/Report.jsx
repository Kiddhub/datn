/* eslint-disable no-unused-vars */
import {
  Alert,
  Box,
  IconButton,
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
import { Link } from "react-router-dom";
import useRequireAuth from "../Login/RequireAuth";
import { getFetch, putFetch } from "../../../network";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
const Report = () => {
  const token = useRequireAuth();
  const [rows, rowchange] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [reports, setReports] = useState([])
  const [noReport, setNoReport] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  useEffect(() => {
    loadReports()
  }, [token, showAlert])
  const loadReports = async () => {
    try {
      const res = await getFetch('/admin/report/', token)
      console.log(">>>res", res)
      setReports(res)
    } catch (err) {
      console.error(err);
    }
  }
  const columns = [
    { id: "id", name: "Id" },
    { id: "user", name: "User" },
    { id: "reportType", name: "Report Type" },
    { id: "product", name: "Product" },
    { id: "message", name: "Message" },
    { id: "aciton", name: "Action" }
  ];
  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }
  const handleClick = (productId) => {
    const form = {
      productId: productId,
      status: "BANNED"
    }
    updateProduct(form, productId)
  };
  const updateProduct = async (form, productId) => {
    try {
      const res = await putFetch(`/admin/product/${productId}`, form, token)
      console.log(">>> res", res)
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
            <Typography variant="h5">{reports.length} Báo cáo</Typography>
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
                    <TableRow key={i}
                      sx={{
                        cursor: "pointer",
                        ":hover": {
                          bgcolor: "#EEEEEE",
                        },
                      }}>
                      <TableCell>{++i}</TableCell>
                      <TableCell>{row.user?.email}</TableCell>
                      <TableCell>{row.reportType}</TableCell>
                      <TableCell sx={{ width: "30%" }}>
                        {row.product?.name}
                      </TableCell>
                      <TableCell>
                        {row.message}
                      </TableCell>
                      <TableCell>
                        {
                          row.product?.status === "BANNED" ? (
                            <></>
                          ) : (
                            <IconButton onClick={() => {
                              handleClick(row.product?.id)
                            }}>
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                          )
                        }
                        <Link to={`/admin/products/${row.product?.id}`} state={{ data: row.product }}>
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
      <Box sx={{ padding: "2rem", justifyContent: 'space-between' }}>
        {showAlert && (
          <Alert
            severity={alertSeverity}
            onClose={() => {
              setShowAlert(false);
              setAlertSeverity("");
              setAlertMessage("");
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
        )}
      </Box>
    </>
  );
};

export default Report;
