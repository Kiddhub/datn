import { useNavigate } from "react-router-dom";
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Rating,
  TablePagination,
  Avatar,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
const RatingDetails = () => {
  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }
  const columns = [
    { id: "id", name: "Id" },
    { id: "username", name: "Name" },
    { id: "rating", name: "Rating" },
    { id: "review", name: "Review" },
    { id: "date", name: "Date" },
    { id: "action", name: "Action" },
  ];
  return (
    <div className="px-10">
      <div
        className="flex cursor-pointer rounded-full px-10 py-10 items-center"
        onClick={handleBack}
      >
        <ArrowBackIcon sx={{ width: "14px" }} />
        <Typography
          component={Link}
          sx={{ fontSize: "14px", fontWeight: "400", marginLeft: "0.4rem" }}
        >
          Back
        </Typography>
      </div>
      <div className="flex items-center gap-3 my-10">
        <img
          className="sm:w-48 rounded-4 h-auto block align-middle"
          src="https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70"
          alt="image"
        />
        <div className="w-full ml-10">
          <Typography sx={{ fontSize: "1.8rem", fontWeight: "600" }}>
            con nlnslkdjalkjdalsdjask
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: "400" }}>
            Review Product
          </Typography>
        </div>
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
              {[]
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Avatar />
                      {row.username}
                    </TableCell>
                    <TableCell>
                      <Rating value={row.rating} readOnly />
                    </TableCell>
                    <TableCell>{row.review}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="warning">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              ;
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          rowsPerPage={rowsPerPage}
          page={page}
          count={review.length}
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

export default RatingDetails;
