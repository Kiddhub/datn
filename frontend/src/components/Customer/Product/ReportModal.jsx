import { Box, Button, Modal, Select, TextField, Typography, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import useRequireAuth from '../Auth/RequireAuth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postFetch } from '../../../network';

const ReportModal = ({ open, onClose, productId, setShowAlert,
    setAlertMessage,
    setAlertSeverity }) => {
    const token = useSelector((state) => state.token.value);
    const [reportType, setReportType] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (event) => {
        setReportType(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = () => {
        if (token === '') {
            navigate("/login");
          }
        const form = {
            reportType: reportType,
            message: message,
            productId: productId
        };
        postReport(form)
        setReportType('')
        setMessage('')
        onClose();
    };
    const postReport = async (form) => {
        try {
            const res = await postFetch('user/report/new', form, token);
            setShowAlert(true);
            setAlertSeverity("success")
            setAlertMessage("Báo cáo thành công cảm ơn bạn")
        } catch (error) {
            console.error(error);
            setShowAlert(true);
            setAlertSeverity("error")
            setAlertMessage("Báo cáo thất bại")
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
                    maxHeight: '100%',
                    overflow: 'auto',
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: "1rem" }}>
                    Báo cáo sản phẩm
                </Typography>
                {/* Form nhập liệu */}
                <Box component="form" noValidate autoComplete="off" sx={{ marginBottom: "1rem" }}>
                    <Box>
                        <Typography>Loại báo cáo</Typography>
                        <Select labelId="report-type" id="report-type-select" value={reportType} onChange={handleChange} fullWidth>
                            <MenuItem value="Spam">Spam</MenuItem>
                            <MenuItem value="Không Phù Hợp">Không phù hợp</MenuItem>
                            <MenuItem value="Gian Lận">Lừa đảo</MenuItem>
                        </Select>
                    </Box>
                    <Box>
                        <Typography>Lời nhắn</Typography>
                        <TextField
                            id="message-input"
                            name="message"
                            label="Nhập lời nhắn"
                            type='text'
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={message}
                            onChange={handleMessageChange}
                            sx={{ marginBottom: "1rem" }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: "1rem" }}
                            onClick={handleSubmit}
                        >
                            Gửi báo cáo
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: "1rem" }}
                            onClick={onClose}
                        >
                            Hủy
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default ReportModal;
