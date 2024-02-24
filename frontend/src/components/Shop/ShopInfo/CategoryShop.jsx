import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  Button,
  Box,
  Alert,
  IconButton,
} from "@mui/material";
import Header from "../Global/Header";
import { useEffect, useState } from "react";
import { category } from "../../../data/dummy";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCategoryShopModal from "./AddCategoryShopModal";
import { useSelector } from "react-redux";
import { getFetch, putFetch } from "../../../network";
import EditCategoryModal from "./EditCategoryModal";
import Status from "../Global/Status";
import { Link } from "react-router-dom";
const CategoryShop = () => {
  const token = useSelector((state) => state.token.value);
  const columns = [
    { id: "id", name: "ID" },
    { id: "category", name: "Category" },
    { id: "status", name: "Status" },
    { id: "action", name: "Action" },
  ];
  const [page, setPage] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  function handleChangePage(event, value) {
    setPage(value);
  }
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }
  const [categoryShop, setCategoryShop] = useState(category);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const loadCategoryShop = async () => {
    getFetch(`/shop/categoryShop/`, token)
      .then(res => {
        console.log(">>> res", res)
        setData(res);
      }).catch(err => {
        console.error(err)
      })
  }
  useEffect(() => {
    loadCategoryShop()
  }, [token, showAlert]);
  const handleChangeStatus = async (id) => {
    try {
      const res = await putFetch(`/shop/categoryShop/${id}`, {}, token)
      console.log(">>> res", res)
      setShowAlert(true)
      setAlertSeverity("success")
      setAlertMessage("Cập nhật trạng thái thành công")
    } catch (err) {
      setShowAlert(true)
      setAlertSeverity("error")
      setAlertMessage("Cập nhật trạng thái thất bại")
    }
  }
  return (
    <div className="px-10 py-10">
      <div className="flex justify-between items-center">
        <Header title="Category Shop" category="Shop" />
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
          onClick={handleOpen}
        >
          Add Category
        </Button>
        <AddCategoryShopModal
          open={open}
          handleClose={handleClose}
          setShowAlert={setShowAlert}
          setAlertSeverity={setAlertSeverity}
          setAlertMessage={setAlertMessage}
        />
      </div>
      <Paper sx={{ width: "100%", borderRadius: "1.6rem" }}>
        <TableContainer sx={{ borderRadius: "1.6rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((coloumn) => (
                  <TableCell
                    key={coloumn.id}
                    sx={{
                      backgroundColor: "#F6F9FB",
                      color: "#000000",
                      alignItems: "center",
                    }}
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
                  <TableRow key={i}>
                    <TableCell>{++i}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <Status name={row.status} />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleChangeStatus(row.id)}>
                        <DeleteIcon sx={{ cursor: "pointer" }} />
                      </IconButton>
                      <Link to={`/shop/category/${row.id}`} state={{ data: row }}>
                        <EditIcon />
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
          count={categoryShop.length}
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
                onClose={() => setShowAlert(false)}
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

    </div>
  );
};

export default CategoryShop;
