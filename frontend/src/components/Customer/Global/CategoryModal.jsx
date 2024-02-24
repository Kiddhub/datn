import { Modal, Typography, Button, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { getFetch } from '../../../network';
const CategoryModal = ({ open, onClose }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const loadCategory = async () => {
    try {
      const res = await getFetch('/admin/category/parent', "")
      setCategories(res)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    loadCategory()
  }, [])
  const getProducts = async (category) => {
    try {
      const res = await getFetch(`/user/product/${category.id}`, "");
      navigate(`/products?category=${category.name}`, { state: { products: res, categories: category } });
      onClose()
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: 'absolute',
          width: 300,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          height: "1000px",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
          background: "#E8F6EF"
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 500 }}>
          Danh mục sản phẩm
        </Typography>

        <Box sx={{ marginTop: "1rem" }}>
          {categories.map((category, index) => (
            <Box
              key={index}
              sx={{
                '&:hover': {
                  background: "#C4DFDF"
                }, cursor: "pointer",
                width: "auto",
                height: "50px",
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5 rem",
                alignItems: "center"
              }} onClick={() => {
                getProducts(category)
              }}>

              <Typography sx={{ fontSize: "18px" }}>
                {category.name}
              </Typography>
              <ChevronRightIcon />
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default CategoryModal;
