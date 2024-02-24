import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import { putFetch } from '../../../network';
import { useSelector } from 'react-redux';

const EditCategoryModal = ({
  selectedCategory,
  open1,
  handleClose1,
  setAlertMessage,
  setShowAlert,
  setAlertSeverity,
}) => {
    const token = useSelector((state) => state.token.value);
  const handleSave = async () => {
    const updatedCategory = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        
    }
    try{
        const res = await putFetch(`/shop/categoryShop/update/${selectedCategory.id}`,updatedCategory,token)
        console.log(">>>res",res)
        setShowAlert(true)
        setAlertMessage("Cập nhật thành công")
        setAlertSeverity("success")
    }catch(err){
        console.error(err)
        setShowAlert(true)
        setAlertMessage("Cập nhật thất bại")
        setAlertSeverity("error")
    }
    handleClose1()
  };

  return (
    <Modal
      open={open1} // Use the actual prop name 'open'
      onClose={handleClose1}
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
        <Typography variant="h6" component="h2" sx={{ marginBottom: '1rem' }}>
          Edit Category
        </Typography>

        {/* Use state to manage the value of the TextField */}
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          defaultValue={selectedCategory?.name || ''}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          defaultValue={selectedCategory?.description || ''}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose1} sx={{ marginLeft: '1rem' }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default EditCategoryModal;
