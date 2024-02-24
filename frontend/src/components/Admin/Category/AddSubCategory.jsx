import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { postFetch } from '../../../network';
import { useSelector } from 'react-redux';

const AddSubCategory = ({ open2, handleClose2, setShowAlert, setAlertSeverity, setAlertMessage }) => {
  const token = useSelector((state) => state.token.value)
  const [formData, setFormData] = useState({
    topLevelCategory: '',
    secondLevelCategory: '',
    thirdLevelCategory: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    console.log('Form Data:', formData);
    console.log('Form Data:', formData);
    try {
      const res = await postFetch('admin/category/createSub', formData, token);
      setShowAlert(true)
      setAlertSeverity("success")
      setAlertMessage("Thêm thành công");
    } catch (err) {
      setShowAlert(true)
      setAlertSeverity("error")
      setAlertMessage("Thêm thất bại");
      console.error(err);
    }
    setFormData({
      topLevelCategory: '',
      secondLevelCategory: '',
      thirdLevelCategory: '',
    })
    handleClose2()
  };

  return (
    <Modal
      open={open2}
      onClose={handleClose2}
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
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: "1rem" }}>
          Add new sub Category
        </Typography>

        {/* Form nhập liệu */}
        <Box component="form" noValidate autoComplete="off" sx={{ marginBottom: "1rem" }}>
          <TextField
            id="category-input"
            name="topLevelCategory"
            label="Top Level Category"
            variant="outlined"
            fullWidth
            value={formData.topLevelCategory}
            onChange={handleChange}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            id="secondcategory-input"
            name="secondLevelCategory"
            label="Second Level Category"
            variant="outlined"
            fullWidth
            value={formData.secondLevelCategory}
            onChange={handleChange}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            id="thirdcategory-input"
            name="thirdLevelCategory"
            label="Third Level Category"
            variant="outlined"
            fullWidth
            value={formData.thirdLevelCategory}
            onChange={handleChange}
            sx={{ marginBottom: "1rem" }}
          />
          {/* Nút lưu */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSaveClick}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddSubCategory;
