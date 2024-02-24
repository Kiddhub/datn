import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
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
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HideSourceIcon from '@mui/icons-material/HideSource';
import useRequireAuth from '../Login/RequireAuth';
import DoneIcon from '@mui/icons-material/Done';
import { getFetch, putFetch } from '../../../network';
import Status from '../Global/Status';
const ListCoupon = () => {
  const token = useRequireAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [coupons, setCoupons] = useState([])
  const [noCoupons, setNoCoupons] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const location = useLocation();
  useEffect(() => {
    const state = location?.state;
    if (state && state.showAlert) {
      setShowAlert(true);
      setAlertSeverity(state.alertSeverity);
      setAlertMessage(state.alertMessage);
    }
  }, [location]);
  useEffect(() => {
    loadCoupons()
  }, [token, showAlert])
  const loadCoupons = async () => {
    try {
      const res = await getFetch('/admin/coupon/', token)
      if (res.length === 0) {
        setNoCoupons(true)
      } else {
        setCoupons(res)
      }
    } catch (err) {
      console.error(err);
    }
  }
  const handleConfirm = async (id) =>{
    try{
      const res = await putFetch(`/admin/coupon/change/${id}`,{},token)
      console.log(">>> res",res)
      setShowAlert(true)
      setAlertSeverity("success")
      setAlertMessage("Cập nhật trạng thái thành công")
    }catch(err){
      console.error(err);
      setShowAlert(true)
      setAlertSeverity("error")
      setAlertMessage("Cập nhật trạng thái thất bại")
    }
  }
  const columns = [
    { id: "id", name: "Id" },
    { id: "code", name: "Code" },
    { id: "description", name: "Description" },
    { id: "quantity", name: "Quantity" },
    { id: "number", name: "Number" },
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
  const handleSearch = (filteredProducts) => {
    setProducts(filteredProducts);
  };
  return (
    <>
      {/* <Box>
          <SearchProduct onSearch={(filteredProducts) => setProducts(filteredProducts)} />
        </Box> */}

      <div className="px-10 py-10">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <div className="flex-col">
            <Typography variant="h5">{coupons.length} Mã giảm giá</Typography>
          </div>
          <Link
            to={{
              pathname: '/admin/coupon/new',
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
        {
          noCoupons ? (
            <>
            </>
          ) : (<Paper sx={{ width: "100%", borderRadius: "1.6rem" }}>
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
                  {coupons
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
                        <TableCell>{row.code}</TableCell>
                        <TableCell>
                          {row.description}
                        </TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>
                          {row.number}
                        </TableCell>
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
                          <Link to={`/admin/coupon/update/${row.id}`} state={{ coupon: row }}>
                            <ModeEditIcon sx={{ marginRight: "0.5rem", cursor: "pointer" }} />
                          </Link>
                          {
                            row.status === "AVAILABLE" ? (
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleConfirm(row.id);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <HideSourceIcon variant="contained" />
                              </IconButton>

                            ) : row.status === "HIDE" ? (
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleConfirm(row.id);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <DoneIcon variant="contained" />
                              </IconButton>

                            ) : (
                              <></>
                            )
                          }

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
              count={coupons.length}
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
          </Paper>)
        }
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

      </div>
    </>)
}

export default ListCoupon