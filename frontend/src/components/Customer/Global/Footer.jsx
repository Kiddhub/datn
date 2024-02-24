import { Box, Typography } from '@mui/material'
import React from 'react'
import logo from '../../../assets/logo.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <Box sx={{
            background: "#47A992", height: "250px", display: "grid",
            gridTemplateColumns: "auto auto auto"
        }}>
            <Box sx={{ display: "flex", flexDirection: "column", marginTop: "1rem", marginLeft: "1rem" }}>
                <Typography sx={{ fontWeight: 500, fontSize: "25px" }}>Về chúng tôi</Typography>
                <Typography sx={{
                    '&:hover': {
                        textDecoration: "underline"
                    }, cursor: "pointer"
                }}>Chính sách bảo mật</Typography>
                <Typography sx={{
                    '&:hover': {
                        textDecoration: "underline"
                    }, cursor: "pointer"
                }}>Điều khoản sử dụng</Typography>
                <Typography sx={{
                    '&:hover': {
                        textDecoration: "underline"
                    }, cursor: "pointer"
                }}>Quy chế hoạt động</Typography>
                <Box>
                    <Typography sx={{ fontSize: "15px", paddingTop: '0.5rem', textDecoration: "underline", fontWeight: 500 }}>Địa chỉ cá nhân</Typography>
                    <Typography sx={{
                        '&:hover': {
                            textDecoration: "underline"
                        }, cursor: "pointer"
                    }}> Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</Typography>
                    <Typography sx={{ fontSize: "15px", paddingTop: '0.5rem', textDecoration: "underline", fontWeight: 500 }}>Hottline</Typography>
                    <Typography >0912345678</Typography>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", marginTop: "1rem", marginLeft: "1rem" }}>
                <Typography sx={{ fontWeight: 500, fontSize: "25px" }}>Chăm sóc khách hàng</Typography>
                <Typography sx={{
                    '&:hover': {
                        textDecoration: "underline"
                    }, cursor: "pointer"
                }}>Câu hỏi thường gặp</Typography>
                <Typography sx={{
                    '&:hover': {
                        textDecoration: "underline"
                    }, cursor: "pointer"
                }}>Gửi yêu cầu hỗ trợ</Typography>
                <Box>
                    <Typography sx={{ fontSize: "15px", paddingTop: '0.5rem', textDecoration: "underline", fontWeight: 500 }}>Chăm sóc khách hàng</Typography>
                    <Typography> cs@mina.com</Typography>

                    <Typography sx={{ fontSize: "15px", paddingTop: '0.5rem', textDecoration: "underline", fontWeight: 500 }}>Hỗ trợ kỹ thuật</Typography>
                    <Typography> tech@mina.com</Typography>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection:"column", marginTop: "1rem", marginLeft: "1rem" }}>
                <img src={logo} className='w-1/2 mb-10'  />
                <Box sx={{ display: "flex",gap:1 }}>
                    <Link>
                        <FacebookIcon />
                    </Link>
                    <Link>
                        <InstagramIcon />
                    </Link>
                    <Link>
                        <GitHubIcon />
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer