import {
  Alert,
  Box,
  Button,
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
import Header from "../Global/Header";
import { useEffect, useState } from "react";
import { coupon_db } from "../../../data/dummy";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HideSourceIcon from '@mui/icons-material/HideSource';
import { useSelector } from "react-redux";
import { getFetch } from "../../../network";

const Coupon = () => {
  const token = useSelector((state) => state.token.value);
  const [rows, rowchange] = useState([]);
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [coupons, setCoupons] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState(false)
  const [alertMessage, setAlertMessage] = useState(false)
  const navigate = useNavigate();
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
  useEffect(() => {
    // Kiểm tra xem có state được truyền từ location không
    const locationState = location.state;
    if (locationState) {
      setShowAlert(locationState.showAlert || false);
      setAlertSeverity(locationState.alertSeverity || "");
      setAlertMessage(locationState.alertMessage || "");
    }
  }, [location.state]);
  const loadCouponShop = async () => {
    try {
      const res = await getFetch('/shop/coupon/', token)
      console.log(">>>res", res)
      setCoupons(res)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    loadCouponShop()
  }, [token]);
  return (
    <div className="px-10 py-10">
      <div className="flex justify-between items-center border-b-[1px]">
        <Header title="Coupon" category="Marketing" />
        <Button
          sx={{
            bgcolor: "#B15EFF",
            color: "#FFFFFF",
            borderRadius: "1.6rem",
            alignItems: "center",
            height: "2.5rem",
            marginBottom: "1rem",
            ":hover": {
              bgcolor: "#7743DB",
            },
          }}
          onClick={() => {
            navigate('new', {
              state: {
                showAlert,
                alertSeverity,
                alertMessage,
              },
            });
          }}
        >
          Add Coupon
        </Button>

      </div>
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
                      {row.status}
                    </TableCell>
                    <TableCell>
                      <Link to={`/shop/coupon/${row.id}`} state={{ data: row }}>
                        <ModeEditIcon sx={{ marginRight: "0.5rem", cursor: "pointer" }} />
                      </Link>
                      {row.status === "REQUEST" ? (
                        <></>
                      ) : (
                        <HideSourceIcon variant="contained" sx={{ cursor: "pointer" }}>
                          Hide
                        </HideSourceIcon>
                      )}


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
          count={coupon_db.length}
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
    </div >
  );
};

export default Coupon;
