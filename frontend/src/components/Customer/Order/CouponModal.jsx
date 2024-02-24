import { Avatar, Box, Button, FormControl, FormControlLabel, Modal, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getFetch } from '../../../network';

const CouponModal = ({ isOpen, onClose, onApply, shopId }) => {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [coupons, setCoupons] = useState([])


  const loadCoupons = async () => {
    try {
      const res = await getFetch(`/user/coupon/couponShop/${shopId}`, "")
      setCoupons(res)
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    loadCoupons()
  }, [])
  const handleCouponChange = (event) => {
    const selectedCode = event.target.value;
    const selectedCoupon = coupons.find(coupon => coupon.code === selectedCode);
    setSelectedCoupon(selectedCoupon);
  };

  const handleApplyCoupon = () => {
    onApply(selectedCoupon);
    onClose(); // Close the modal after applying the coupon
  };

  return (
    <Modal
      open={isOpen}
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
        <Typography id="discount-code-modal-title" variant="h5" component="h2">
          Thêm mã giảm giá
        </Typography>
        <Paper sx={{ padding: "1rem" }}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="coupon"
              name="coupon"
              value={selectedCoupon ? selectedCoupon.code : ''}
              onChange={handleCouponChange}
              sx={{ gap: 2 }}
            >
              {coupons.map((coupon) => (
                <FormControlLabel
                  key={coupon.id}
                  value={coupon.code} // Assuming `code` is unique
                  control={<Radio />}
                  label={
                    <Box sx={{
                      width: 400,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      padding: '1rem',
                      border: 'solid 1px',
                      borderRadius: "1rem"
                    }}>
                      <Avatar src='https://previews.123rf.com/images/cookelma/cookelma1310/cookelma131000098/22914295-fire-alphabet-letter-o-isolated-on-black-background.jpg' />
                      <Box>
                        <Typography variant='h6'>{`Giảm ${coupon.number}${coupon.discountType === 'PERCENT' ? '%' : ' vnđ'}`}</Typography>
                        <Typography variant='h7'>{`Cho đơn từ ${coupon.minPrice} vnđ`}</Typography>
                      </Box>

                    </Box>
                  }
                  onClick={() => setSelectedCoupon(coupon)}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <Button onClick={handleApplyCoupon} sx={{ mt: 2 }}>
          Áp dụng mã
        </Button>
        <Button onClick={onClose} sx={{ mt: 2, marginLeft: 1 }}>
          Đóng Modal
        </Button>
      </Box>
    </Modal>
  );
};

export default CouponModal;
