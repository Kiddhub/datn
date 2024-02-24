import { Avatar, Box, Pagination, Paper, Rating, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getFetch } from '../../../network';
import { format } from 'date-fns'; // Import thư viện format từ date-fns
import ReplyIcon from '@mui/icons-material/Reply';
const ProductRating = ({ product1 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ratings, setRating] = useState([]);
  const itemsPerPage = 10;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const [sum, setSum] = useState(0);

  const calculateAverageRating = () => {
    if (ratings.length === 0) return 0;
    const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return totalRating / ratings.length;
  };

  const loadRating = async () => {
    try {
      const res = await getFetch(`/user/rating/${product1.id}`, "")
      console.log(">>> res", res)
      setRating(res);
      const averageRating = calculateAverageRating();
      setSum(averageRating);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    loadRating();
  }, [product1]);

  useEffect(() => {
    const averageRating = calculateAverageRating();
    setSum(averageRating);
  }, [ratings]);

  return (
    <>
      <Paper sx={{ border: "solid", borderWidth: "1px", borderColor: "#FB8B24", display: "flex", gap: 4 }}>
        <Box sx={{
          height: "150px",
          width: "150px",
          backgroundColor: "#FFF7F1",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto"
        }}>
          <Typography variant='h3'>{sum.toFixed(1)}/5</Typography>
        </Box>

        <Box sx={{ justifyContent: "center", alignItems: "center", padding: "20px", width: "80%" }}>
          {
            ratings.map((rating, index) => (
              <Box sx={{ padding: "1rem", marginBottom: "0.5rem" }} key={index}>
                <Box sx={{ border: "solid #C7C8CC 1px", padding: "1rem" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar src='' />
                    <Typography>{rating.user?.email}</Typography>
                  </Box>
                  <Rating value={rating.rating} readOnly sx={{ marginTop: "0.5rem" }} />
                  <Typography>{rating.review}</Typography>
                  <Typography sx={{ fontSize: "10px" }}>{format(new Date(rating.createdAt), 'yy/MM/dd HH:mm')}</Typography>
                </Box>

                {
                  rating.reply !== null ? (
                    <Box sx={{ border: "solid #C7C8CC 1px", padding: "2rem" }}>
                      <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Avatar src={rating.product?.shop.imageUrl} />
                            <Typography>{rating.product?.shop.name}</Typography>
                          </Box>
                          <Typography sx={{ marginLeft: "3.5rem" }}>{rating.reply}</Typography>
                        </Box>
                        <ReplyIcon/>
                      </Box>

                    </Box>
                  ) : (
                    <>
                    </>
                  )
                }
              </Box>
            ))
          }

          {/* <Pagination pageCount={pageCount} onPageChange={handlePageChange} /> */}
        </Box>
      </Paper>
    </>
  )
}

export default ProductRating