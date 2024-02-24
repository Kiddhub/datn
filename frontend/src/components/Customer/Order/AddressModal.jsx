import { Box, Button, FormControl, FormControlLabel, Modal, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react';


const AddressModal = ({ open, onClose, address, onSelectAddress }) => {
  const [selectedValue, setSelectedValue] = useState(''); // Added state for selected radio value

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleApplyAddress = () => {
    const selectedAddress = address.find((item) => item.id.toString() === selectedValue);
    if (selectedAddress) {
      onSelectAddress(selectedAddress);
      onClose();
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="discount-code-modal-title"
        aria-describedby="discount-code-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            paddingX: "1rem",
          }}
        >
          <Typography id="discount-code-modal-title" variant="h6" component="h2">
            Danh sách địa chỉ
          </Typography>
          <Paper>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="address"
                name="address"
                value={selectedValue}
                onChange={handleChange}
                sx={{ gap: 2, margin: "1rem" }}
              >
                {address.map((item) => (
                  <FormControlLabel
                    key={item.id}
                    value={item.id.toString()} // Convert to string
                    control={<Radio />}
                    label={
                      <Box sx={{
                        width: 400,
                        alignItems: 'center',
                        gap: 2,
                        padding: '1rem',
                        border: 'solid 1px',
                        borderRadius: "1rem"
                      }}>
                        <Typography sx={{ fontSize: "18px" }}>{item.firstName} {item.lastName}</Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography sx={{ fontSize: "15px" }}>{item.mobile}</Typography>
                          <Typography sx={{ fontSize: "15px" }}>{item.address}</Typography>
                        </Box>
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Button onClick={handleApplyAddress} sx={{ mt: 2 }}>
              Áp dụng địa chỉ
            </Button>
            <Button onClick={onClose} sx={{ mt: 2, marginLeft: 1 }}>
              Đóng
            </Button>
          </Paper>
        </Box>
      </Modal>
    </>
  );
}

export default AddressModal;
