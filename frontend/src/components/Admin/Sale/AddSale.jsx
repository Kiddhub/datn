import React from 'react'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, TextField, Typography } from '@mui/material';
import Header from '../Global/Header';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { postFetch } from '../../../network';
const defaultValues =
{
  name: "",
  description: "",
  discountType: "",
  discountNumber: 0,
  timeStart: "",
  timeEnd: "",
}
const AddSale = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.token.value)
  const { control, handleSubmit, formState, setValue } = useForm({
    defaultValues,
    // resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await postFetch('admin/sale/new', data, token);
      navigate('/admin/sale', {
        state: {
          showAlert: true,
          alertSeverity: 'success',
          alertMessage: 'Thêm thành công',
        },
      });
    } catch (err) {
      console.error(err)
      navigate('/admin/sale', {
        state: {
          showAlert: true,
          alertSeverity: 'error',
          alertMessage: 'Thêm thất bại',
        },
      });
    }
  };
const { errors } = formState;
return (
  <div className="px-10 py-10">
    <div className="mb-16">
      <div
        className="flex cursor-pointer rounded-full px-10 py-10 items-center"
        onClick={(e) => navigate(-1)}
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
    <Header title="Create Sale" category="Sale" />
    <div className="flex flex-col px-10 h-full w-1/2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Name"
              required
              variant="outlined"
              fullWidth
              margin="normal" />
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

        {/* Discounted Type Field */}
        <Controller
          name="discountType"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Discounted Type" required variant="outlined" fullWidth margin="normal" />
          )}
        />

        {/* Quantity Field */}
        <Controller
          name="discountNumber"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField {...field} label="Discounted Number" required variant="outlined" fullWidth margin="normal" type="number" />
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

export default AddSale