import { TextField, Button, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getFetch, postFetch } from '../../../network';
import useRequireAuth from '../Auth/RequireAuth';
import AddressModal from './AddressModal';

const AddressForm = ({setFormOrder}) => {
    const [address, setAddress] = useState([])
    const [open, setOpen] = useState(false)
    const token = useRequireAuth();
    const [formChange, setFormChange] = useState(false)
    const loadAddress = async () => {
        try {
            const res = await getFetch('/user/auth/profile', token)
            console.log(res.address)
            setAddress(res.address)
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        loadAddress()
    }, [])
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        mobile: '',
    });
    const handleSelectAddress = (selectedAddress) => {
        setFormData({
            firstName: selectedAddress.firstName,
            lastName: selectedAddress.lastName,
            address: selectedAddress.address,
            city: selectedAddress.city,
            mobile: selectedAddress.mobile,
        });
        setFormChange(false)
        setFormOrder((prevForm) => ({
            ...prevForm,
            firstName: selectedAddress.firstName,
            lastName: selectedAddress.lastName,
            address: selectedAddress.address,
            city: selectedAddress.city,
            mobile: selectedAddress.mobile,
          }));
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setFormChange(true)
        setFormOrder((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value,
          }));
    };
    const handleSave = async () => {
        try{
            const res = await postFetch('user/auth/address/new',formData,token)
            console.log(">>> res",res)
        }catch(err){
            console.error(err)
        }
        setFormOrder((prevForm) => ({
            ...prevForm,
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            mobile: formData.mobile,
          }));
       
    };
    return (
        <>
            <form autoComplete="off">
                <TextField
                    name="firstName"
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{ mb: 3 }}
                    fullWidth
                    label="First Name"
                    onChange={handleChange}
                    value={formData.firstName}
                />
                <TextField
                    name="lastName"
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    label="Last Name"
                    fullWidth
                    sx={{ mb: 3 }}
                    onChange={handleChange}
                    value={formData.lastName}
                />
                <TextField
                    name="address"
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    label="Address"
                    sx={{ mb: 3 }}
                    fullWidth
                    onChange={handleChange}
                    value={formData.address}
                />
                <TextField
                    name="city"
                    required
                    label="City"
                    variant="outlined"
                    color="secondary"
                    type="text"
                    fullWidth
                    sx={{ mb: 3 }}
                    onChange={handleChange}
                    value={formData.city}
                />
                <TextField
                    name="mobile"
                    required
                    label="Mobile"
                    variant="outlined"
                    color="secondary"
                    type="text"
                    fullWidth
                    sx={{ mb: 3 }}
                    onChange={handleChange}
                    value={formData.mobile}
                />
                <Box sx={{ gap: 2, display: "flex" }}>
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        Chọn địa chỉ
                    </Button>
                    {
                        formChange && (
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Lưu thông tin
                            </Button>
                        )
                    }

                </Box>
            </form>
            <AddressModal open={open} onClose={handleClose} address={address} onSelectAddress={handleSelectAddress} />
        </>

    );
};

export default AddressForm;
