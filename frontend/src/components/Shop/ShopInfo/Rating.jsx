import {
  Typography,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableBody,
  Rating,
  Modal,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import Header from "../Global/Header";
import { useEffect, useState } from "react";
import { ratingDb } from "../../../data/dummy";
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import useRequireAuth from "../AuthShop/RequireAuth";
import { getFetch, putFetch } from "../../../network";
const columns = [
  { id: "id", name: "ID" },
  { id: "name", name: "Product Name" },
  { id: "rating", name: "Rating" },
  { id: "user", name: "User" },
  { id: "review", name: "Review" },
  { id: "reply", name: "Reply" },
  { id: "action", name: "Action" },

];
const Ratings = () => {
  const [open, setOpen] = useState(false);
  const token = useRequireAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [ratings, setRatings] = useState([])
  const [id, setId] = useState(0);
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [averageRating, setAverageRating] = useState(0);

  // Hàm tính toán giá trị trung bình của rating từ danh sách đánh giá
  const calculateAverageRating = () => {
    if (ratings.length === 0) return 0;

    // Tính tổng số điểm rating
    const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    // Tính giá trị trung bình
    const average = totalRating / ratings.length;

    return average.toFixed(1); // Giữ một chữ số sau dấu thập phân
  };

  useEffect(() => {
    // Tính toán giá trị trung bình của rating khi danh sách đánh giá thay đổi
    const average = calculateAverageRating();
    setAverageRating(average);
  }, [ratings]);

  const handleOpen = (id) => {
    setOpen(true)
    setId(id);
  };
  const handleClose = () => setOpen(false);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSaveClick = () => {
    replyReview(inputValue);
    handleClose();
  };
  const replyReview = async (inputValue) => {
    try {
      const res = await putFetch(`/shop/rating/${id}`, { reply: inputValue }, token)
      console.log(">>> res", res)
      setShowAlert(true)
      setAlertSeverity("success")
      setAlertMessage("Phản hồi thành công")
    } catch (err) {
      console.error(err);
      setShowAlert(true)
      setAlertSeverity("error")
      setAlertMessage("Phản hồi thất bại")
    }
  }
  function handleChangePage(event, value) {
    setPage(value);
  }
  const loadRating = async () => {
    try {
      const res = await getFetch('/shop/rating/', token)
      console.log(">>> ", res)
      setRatings(res)
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    loadRating();
  }, [token, showAlert])
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  return (
    <div className="px-10 py-10">
      <div className="flex justify-between border-b-4">
        <Header title="Rating" category="Shop" />
        <Box className="flex items-center">
          <Typography sx={{ fontSize: "3rem" }} className="text-[#FF6C22]">
            {averageRating}
          </Typography>
          <Typography sx={{ fontSize: "2rem" }} className="text-[#7D7C7C]">
            /5
          </Typography>
        </Box>
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
              {ratings
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
                    <TableCell>{++i}</TableCell>
                    <TableCell>{row.product?.name}</TableCell>
                    <TableCell>
                      <Rating value={row.rating} readOnly />
                    </TableCell>
                    <TableCell>
                      {row.user?.firstName}  {row.user?.lastName}
                    </TableCell>
                    <TableCell>
                      {
                        row.review
                      }
                    </TableCell>
                    <TableCell>
                      {row.reply}
                    </TableCell>
                    <TableCell>
                      {
                        row.reply === null ? (
                          <SendIcon onClick={() => { handleOpen(row.id) }} />
                        ) : (
                          <>
                          </>
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
          count={ratingDb.length}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            width: '50%',
            maxWidth: '600px',
            maxHeight: '80%',
            overflow: 'auto',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Trả lời phản hồi khách hàng
          </Typography>
          <TextField id="filled-basic" sx={{ width: "100%" }} value={inputValue}
            onChange={handleInputChange} />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSaveClick}
          >
            Save
          </Button>
        </Box>
      </Modal>
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
    </div>
  );
};

export default Ratings;
