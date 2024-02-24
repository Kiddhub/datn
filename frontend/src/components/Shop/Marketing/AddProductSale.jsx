import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, Checkbox, FormControlLabel, List, ListItem, Avatar } from '@mui/material';
import { getFetch, getFetchWithParams, postFetch } from '../../../network';
import useRequireAuth from '../AuthShop/RequireAuth';

const AddProductSale = ({ open, handleClose, saleid,showAlert,setShowAlert,setAlertSeverity,setAlertMessage }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Sử dụng state để theo dõi sản phẩm duy nhất được chọn
  const token = useRequireAuth();

  const loadProducts = async () => {
    try {
      const res = await getFetch(`/shop/sale/sale_items/${saleid}`, token);
      setProducts(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [showAlert]);

  const handleProductChange = (productId) => {
    setSelectedProduct(productId); // Chỉ giữ lại một sản phẩm được chọn
  };

  const handleSaveClick = () => {
    if (selectedProduct !== null) {
      const selectedProductObject = products.find(product => product.id === selectedProduct);
      addProductToSale(selectedProductObject);
    }
  }
  const addProductToSale = async (data) => {
    const form = {
      saleId: saleid,
      productId: data.id
    }
    try {
      const res = await postFetch(`shop/sale/sale_items/new`, form, token);
      setShowAlert(true)
      setAlertSeverity("success")
      setAlertMessage("Thêm sản phẩm thành công")
      handleClose()
    } catch (err) {
      console.error(err);
      setShowAlert(true)
      setAlertSeverity("error")
      setAlertMessage("Thêm sản phẩm thất bại")
    }
  };
  

  return (
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
          width: '80%',
          maxWidth: '600px',
          maxHeight: '80%',
          overflow: 'auto',
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: "1rem" }}>
          Request Product Sale
        </Typography>

        <List>
          {products.map((product) => (
            <ListItem key={product.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedProduct === product.id}
                    onChange={() => handleProductChange(product.id)}
                  />
                }
                label={product.name}
              />
              <Avatar src={product.imageUrl} />
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: 'flex', marginTop: '1rem', gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveClick}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddProductSale;
