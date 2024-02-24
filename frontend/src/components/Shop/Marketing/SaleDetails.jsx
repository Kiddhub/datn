import React from 'react'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SaleItem from './SaleItem';
import Header from '../Global/Header';
import { data } from 'autoprefixer';

const SaleDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data1 = location.state?.data
  const defaultValues =
  {
    description: data1.description,
    discountType: data1.discountType,
    discountNumber: data1.discountNumber,
    timeStart: data1.timeStart,
    timeEnd: data1.timeEnd,
  }
  const { control, handleSubmit, formState, setValue } = useForm({
    defaultValues,
  });
  const { errors } = formState;
  return (
    <div className="px-10 py-10">
      <div className="mb-16">
        <div
          className="flex cursor-pointer rounded-full px-10 py-10 items-center"
          onClick={(e) => navigate('/shop/sale')}
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
      <Header title="Sale Details" category="Sale" />
      <div className="flex">
        <div className=" flex-col px-10 h-full w-1/3">
          <form>
            {/* Description Field */}
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Description" required variant="outlined" fullWidth margin="normal" multiline rows={4} InputProps={{ readOnly: true }} />
              )}
            />

            {/* Discounted Type Field */}
            <Controller
              name="discountType"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Discounted Type" required variant="outlined" fullWidth margin="normal" InputProps={{ readOnly: true }} />
              )}
            />

            {/* Quantity Field */}
            <Controller
              name="discountNumber"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField {...field} label="Discounted Number" required variant="outlined" fullWidth margin="normal" type="number" InputProps={{ readOnly: true }} />
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
                    readOnly: true
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
                    readOnly: true
                  }}
                />
              )}
            />
          </form>
        </div>
        <div className=" flex-col px-10 h-full w-2/3">
          <SaleItem />
        </div>
      </div>

    </div>
  )
}

export default SaleDetail