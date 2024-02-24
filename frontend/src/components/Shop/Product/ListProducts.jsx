/* eslint-disable no-unused-vars */
import {
  Alert,
  Box,
  Button,
  LinearProgress,
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
import ProductStatus from "./ProductStatus";
import SearchProducts from "./SearchProducts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFetch } from "../../../network";
import { useSelector } from "react-redux";
import NoProduct from "./NoProduct";


const ListProducts = () => {
  const token = useSelector((state) => state.token.value)
  const location = useLocation();
  const [rows, rowchange] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState([])
  const [noProducts, setNoProducts] = useState(false)
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  useEffect(() => {
    // Kiểm tra xem có state được truyền từ location không
    const locationState = location.state;
    if (locationState) {
      setShowAlert(locationState.showAlert || false);
      setAlertSeverity(locationState.alertSeverity || "");
      setAlertMessage(locationState.alertMessage || "");
    }
  }, [location.state]);
  const handleAddButton = () => {
    navigate("/shop/products/add", {
      state: {
        showAlert,
        alertSeverity,
        alertMessage,
      },
    });
  };
  useEffect(() => {
    loadProducts()
  }, [])
  const loadProducts = async () => {
    try {
      const data = await getFetch('/shop/product/', token)
      console.log(">>data", data)
      if (data.length === 0) {
        setNoProducts(true);
      }
      setProducts(data)
    } catch (err) {
      console.log(err)
    }

  }
  const columns = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "imageUrl", name: "Image" },
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
      <Box>
        <SearchProducts onSearch={(filteredProducts) => setProducts(filteredProducts)} />
      </Box>

      <div className="px-10 py-10">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <div className="flex-col">
            <Typography variant="h5">{products.length} Sản Phẩm</Typography>
            <LinearProgress
              variant="determinate"
              value={([].length / 1000) * 100}
            />
            <Typography className="text-[#7D7C7C]">
              Có thể đăng tối đa 1000 sản phẩm
            </Typography>
          </div>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "200px",
              marginBottom: "1rem",
              backgroundColor: "#427D9D",
            }}
            onClick={handleAddButton}
          >
            Thêm mới sản phẩm
          </Button>
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
              {noProducts ? (<>
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell>
                    <NoProduct />
                  </TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              </>) :
                (<TableBody>
                  {products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => (
                      <TableRow key={i}>
                        <TableCell sx={{width:'5%'}}>{++i}</TableCell>
                        <TableCell sx={{width:'60%'}}>{row.name}</TableCell>
                        <TableCell sx={{width:'10%'}}>
                          <img src={row.imageUrl} alt="image" className="w-32" />
                        </TableCell>
                        <TableCell sx={{width:'10%'}}>
                          <ProductStatus name={row.status} />
                        </TableCell>
                        <TableCell sx={{width:'10%'}}>
                          <Link to={`/shop/products/update/${row.id}`} state={{ data: row }}>
                            <EditIcon sx={{ marginRight: "0.5rem", cursor: "pointer" }} />
                          </Link>
                          <DeleteIcon variant="contained" sx={{ cursor: "pointer" }}>
                            Hide
                          </DeleteIcon>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>)
              }
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

export default ListProducts;
