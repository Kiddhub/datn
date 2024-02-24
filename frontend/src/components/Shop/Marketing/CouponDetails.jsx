import React from 'react'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Global/Header';
import { postFetch, putFetch } from '../../../network';
import { useSelector } from 'react-redux';

const CouponDetails = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.token.value)
    const location = useLocation();
    const data1 = location.state?.data
    const defaultValues =
    {
        code: data1.code,
        couponType: "DISCOUNT",
        description: data1.description,
        minPrice: data1.minPrice,
        number: data1.number,
        discountType: data1.discountType,
        quantity: data1.quantity,
        timeStart: data1.timeStart, // Chỉnh sửa giá trị mặc định cho time_start
        timeEnd: data1.timeEnd,   // Chỉnh sửa giá trị mặc định cho time_end
    }
    const { control, handleSubmit, formState, setValue } = useForm({
        defaultValues,
        // resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const res = await putFetch(`/shop/coupon/update/${data1.id}`, data, token)
            console.log(">>> res",res)
            navigate('/shop/coupon', {
                state: {
                    showAlert: true,
                    alertSeverity: "success",
                    alertMessage: "Cập nhật thành công",
                },
            });
        } catch (err) {
            console.error(err)
            navigate('/shop/coupon', {
                state: {
                    showAlert: true,
                    alertSeverity: "error",
                    alertMessage: "Cập nhật thất bại",
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
                    onClick={(e) => {
                        navigate('/shop/coupon')
                    }}
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
            <Header title="New Coupon" category="Coupon" />
            <div className="flex flex-col px-10 h-full w-1/2">
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Code Field */}
                    <Controller
                        name="code"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Code is required' }}
                        render={({ field }) => (
                            <TextField {...field}
                                required label="Code"
                                variant="outlined"
                                fullWidth margin="normal" />
                        )}
                    />

                    {/* Coupon Type Field */}
                    <Controller
                        name="couponType"
                        control={control}
                        defaultValue="DISCOUNT" // Đặt giá trị mặc định là "Discount"
                        rules={{ required: 'Coupon Type is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Coupon Type"
                                required
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputProps={{ // Nếu bạn muốn cả phần nhập của TextField cũng là chỉ đọc
                                    readOnly: true
                                }}
                            />
                        )}
                    />


                    {/* Description Field */}
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField {...field}
                                label="Description"
                                required variant="outlined"
                                fullWidth margin="normal"
                                multiline rows={4} />
                        )}
                    />

                    {/* Min Price Field */}
                    <Controller
                        name="minPrice"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <TextField {...field}
                                label="Minimum Price"
                                required variant="outlined"
                                fullWidth margin="normal"
                                type="number" />
                        )}
                    />
                    {/* Discounted Type Field */}
                    <Controller
                        name="discountType"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Discount Type"
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
                    {/* Number Field */}
                    <Controller
                        name="number"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <TextField {...field}
                                label="Number"
                                required variant="outlined"
                                fullWidth margin="normal"
                                type="number" />
                        )}
                    />
                    {/* Quantity Field */}
                    <Controller
                        name="quantity"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <TextField {...field}
                                label="Quantity"
                                required
                                variant="outlined"
                                fullWidth margin="normal"
                                type="number" />
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
                        defaultValue={null}
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

export default CouponDetails