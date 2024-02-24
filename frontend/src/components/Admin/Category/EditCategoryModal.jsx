import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { putFetch } from '../../../network';

const EditCategoryModal = ({ node, onClose,setShowAlert,setAlertSeverity,setAlertMessage }) => {
  const token = useSelector((state) => state.token.value)

  const [nodeName, setNodeName] = useState(node.name);


  const handleSave = async () => {
    try {
      const res = await putFetch(`/admin/category/update/${node.id}`,{name:nodeName}  ,token);
      setShowAlert(true)
      setAlertSeverity("success")
      setAlertMessage("Chỉnh sửa thành công")
      console.log(">>>",res)
    } catch (err) {
      console.error(err);
      setShowAlert(true)
      setAlertSeverity("error")
      setAlertMessage("Thêm thất bại");
    }
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={true} // Đặt giá trị của open tùy thuộc vào logic của bạn
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
        <Typography variant="h6" component="h2" sx={{ marginBottom: '1rem' }}>
          Edit Node
        </Typography>

        {/* Hiển thị trường name trong TextField để người dùng có thể thay đổi */}
        <TextField
          id="node-name"
          label="Node Name"
          variant="outlined"
          fullWidth
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ marginLeft: '1rem' }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default EditCategoryModal;
