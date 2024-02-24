import React, { useEffect, useState } from 'react'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import Header from '../Global/Header';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SaleItem from './SaleItem';
import { putFetch } from '../../../network';
import useRequireAuth from '../Login/RequireAuth';

const SaleDetail = () => {
  const token = useRequireAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(">>> localtion",location)
  const data1 = location.state?.data
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState(false)
  const [alertMessage, setAlertMessage] = useState(false)
  const defaultValues =
  {
    name: data1.name,
    description: data1.description,
    discountType: data1.discountType,
    discountNumber: data1.discountNumber,
    timeEnd: data1.timeEnd,
    timeStart: data1.timeStart,
  }
  const { control, handleSubmit, formState, setValue } = useForm({
    defaultValues
  });

  useEffect(()=>{
    data1
  },[showAlert])

  const onSubmit = (data) => {
    console.log(data);
    updateSale(data);
  };

  const updateSale = async (form) => {
    try {
      const res = await putFetch(`/admin/sale/${data1.id}`, form, token)
      navigate('/admin/sale', {
        state: {
          showAlert: true,
          alertSeverity: 'success',
          alertMessage: 'Cập nhật thành công',
        },
      });
    } catch (err) {
      console.error(err);
      navigate('/admin/sale', {
        state: {
          showAlert: true,
          alertSeverity: 'error',
          alertMessage: 'Cập nhật thất bại',
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
          onClick={(e) => navigate("/admin/sale")}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Các trường TextField */}
            <Controller
              name="name"
              control={control}
              defaultValue={data1.name}
              render={({ field }) => (
                <TextField {...field} label="Name" required variant="outlined" fullWidth margin="normal" />
              )}
            />

            {/* Description Field */}
            <Controller
              name="description"
              control={control}
              defaultValue={data1.description}
              render={({ field }) => (
                <TextField {...field} label="Description" required variant="outlined" fullWidth margin="normal" multiline rows={4} />
              )}
            />

            {/* Discounted Type Field */}
            <Controller
              name="discountType"
              control={control}
              defaultValue={data1.discountedType}
              render={({ field }) => (
                <TextField {...field} label="Discounted Type" required variant="outlined" fullWidth margin="normal" />
              )}
            />

            {/* Quantity Field */}
            <Controller
              name="discountNumber"
              control={control}
              defaultValue={data1.discountedNumber}
              render={({ field }) => (
                <TextField {...field} label="Discounted Number" required variant="outlined" fullWidth margin="normal" type="number" />
              )}
            />

            {/* Time Start and Time End Fields */}
            <Controller
              name="timeStart"
              control={control}
              defaultValue={data1.timeStart} // hoặc giá trị mặc định của bạn nếu cần
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
              defaultValue={data1.timeEnd} // hoặc giá trị mặc định của bạn nếu cần
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
        <div className=" flex-col px-10 h-full w-2/3">
          <SaleItem data={data1.saleItems} setShowAlert={setShowAlert} setAlertSeverity={setAlertSeverity} setAlertMessage={setAlertMessage} flag={location.state.flag} />
        </div>
      </div>
      <Box sx={{ padding: "2rem", justifyContent: 'space-between' }}>
        {
          showAlert && (
            <Alert
              severity={alertSeverity}
              onClose={() => {
                setShowAlert(false),
                  setAlertSeverity(""),
                  setAlertMessage("")
              }}
              sx={{
                marginBottom: "1rem",
                position: 'absolute',
                top: "5rem",
                right: 0,
              }}
              open={showAlert}
            >
              {alertMessage}
            </Alert>
          )
        }
      </Box>

    </div>
  )
}

export default SaleDetail