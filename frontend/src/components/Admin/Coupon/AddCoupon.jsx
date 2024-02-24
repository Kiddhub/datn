import React from 'react'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import Header from '../Global/Header';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { postFetch } from '../../../network';
import useRequireAuth from '../Login/RequireAuth';
const defaultValues =
{
  code: "",
  couponType: "",
  description: "",
  minPrice: 0,
  number: 0,
  discountType: "",
  quantity: 0,
  timeStart: "", 
  timeEnd: "",   
}
const AddCoupon = () => {
  const token = useRequireAuth()
  const navigate = useNavigate();
  const location = useLocation();
  const setShowAlert = location?.state?.setShowAlert || (() => { });
  const setAlertMessage = location?.state?.setAlertMessage || (() => { });
  const setAlertSeverity = location?.state?.setAlertSeverity || (() => { });

  const { control, handleSubmit, formState, setValue } = useForm({
    defaultValues,
  });
  const onSubmit = (data) => {
    createNewCoupon(data);
  };
  const createNewCoupon = async (data) => {
    try{
      const res = await postFetch('admin/coupon/new',data,token)
      navigate('/admin/coupon/', {
        state: {
          showAlert: true,
          alertSeverity: 'success',
          alertMessage: 'Thêm thành công',
        },
      });
    }catch(err){
      console.error(err);
      navigate('/admin/coupon/', {
        state: {
          showAlert: true,
          alertSeverity: 'error',
          alertMessage: 'Thêm thất bại',
        },
      });
    }
  }
  const { errors } = formState;
  return (
    <div className="px-10 py-10">
      <div className="mb-16">
        <div
          className="flex cursor-pointer rounded-full px-10 py-10 items-center"
          onClick={(e) => navigate('/admin/coupon')}
        >
          <ArrowBackIcon sx={{ width: "14px" }} />
          <Typography
            component={Link}
            sx={{ fontSize: "14px", fontWeight: "400", marginLeft: "0.4rem" }}
          >
            Back
          </Typography>
        </div>
      </div>
      <Header title="Add New Coupon" category="Coupon" />
      <div className="flex flex-col px-10 h-full w-1/2">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Code Field */}
          <Controller
            name="code"
            control={control}
            defaultValue=""
            rules={{ required: 'Code is required' }}
            render={({ field }) => (
              <TextField {...field} required label="Code" variant="outlined" fullWidth margin="normal" />
            )}
          />
          {/* Coupon Type Field */}
          <Controller
            name="couponType"
            control={control}
            defaultValue=""
            rules={{ required: 'Coupon Type is required' }}
            render={({ field }) => (
              <TextField {...field} label="Coupon Type" required variant="outlined" fullWidth margin="normal" />
            )}
          />
          {/* Description Field */}
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Description" required variant="outlined" fullWidth margin="normal" multiline rows={4} />
            )}
          />
          {/* Min Price Field */}
          <Controller
            name="minPrice"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField {...field} label="Minimum Price" required variant="outlined" fullWidth margin="normal" type="number" />
            )}
          />
          {/* Number Field */}
          <Controller
            name="number"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField {...field} label="Number" required variant="outlined" fullWidth margin="normal" type="number" />
            )}
          />
          {/* Discounted Type Field */}
          <Controller
            name="discountType"
            label="Discounted Type"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                required
                variant="outlined"
                fullWidth
                margin="dense"
              >
                <MenuItem value="">Chọn loại giảm giá</MenuItem>
                <MenuItem value='PERCENT'>PERCENT</MenuItem>
                <MenuItem value='VND'>VND</MenuItem>
              </Select>
            )}
          />
          {/* Quantity Field */}
          <Controller 
            name="quantity"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField {...field} label="Quantity" required variant="outlined" fullWidth margin="normal" type="number" />
            )}
          />
          {/* Time Start and Time End Fields */}
          <Controller
            name="timeStart"
            control={control}
            defaultValue={null} // hoặc giá trị mặc định của bạn nếu cần
            render={({ field }) => (
              <TextField
                {...field}
                label="Time Start"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
          <Controller
            name="timeEnd"
            control={control}
            defaultValue={null} // hoặc giá trị mặc định của bạn nếu cần
            render={({ field }) => (
              <TextField
                {...field}
                label="Time End"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Save
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AddCoupon