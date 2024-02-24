import React, { useEffect, useState } from 'react'
import TreeViewList from './TreeViewList'
import { Box, Button, Alert } from '@mui/material'
import AddCategory from './AddCategory'
import AddSubCategory from './AddSubCategory'
import { useSelector } from 'react-redux'
import { getFetch } from '../../../network'
const ListCategory = () => {
    const token = useSelector((state) => state.token.value)
    const [data, setData] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false)
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const loadCategory = async () => {
        getFetch(`/admin/category/`, token)
            .then(res => {
                setData(res);
            }).catch(err => {
                console.error(err)
            })
    }
    useEffect(() => {
        loadCategory();
    }, [token, showAlert]);
    return (
        <>
            <Box sx={{ padding: "2rem", justifyContent: 'space-between' }}>
                <Box sx={{ marginBottom: "1rem", display: "flex", gap: 2 }}>
                    <Button
                        sx={{
                            backgroundColor: '#007bff',
                            color: '#ffffff',
                            '&:hover': {
                                backgroundColor: '#0056b3',
                            },

                        }}
                        onClick={handleOpen1}
                    >
                        Add Category
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: '#007bff',
                            color: '#ffffff',
                            '&:hover': {
                                backgroundColor: '#0056b3',
                            },

                        }}
                        onClick={handleOpen2}
                    >
                        Add Sub Category
                    </Button>
                </Box>
                <TreeViewList data={data}
                    setShowAlert={setShowAlert}
                    setAlertSeverity={setAlertSeverity}
                    setAlertMessage={setAlertMessage} />
            </Box>
            <AddCategory
                open1={open1}
                handleClose1={handleClose1}
                setShowAlert={setShowAlert}
                setAlertSeverity={setAlertSeverity}
                setAlertMessage={setAlertMessage} />
            <AddSubCategory
                open2={open2}
                handleClose2={handleClose2}
                setShowAlert={setShowAlert}
                setAlertSeverity={setAlertSeverity}
                setAlertMessage={setAlertMessage} />
            <Box sx={{ padding: "2rem", justifyContent: 'space-between' }}>
                {/* ... (các phần khác của ListCategory) */}
                {
                    showAlert && (
                        <Alert
                            severity={alertSeverity}
                            onClose={() => setShowAlert(false)}
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
        </>

    )
}

export default ListCategory