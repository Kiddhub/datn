import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SuggestProduct = ({ products }) => {
    const navigate = useNavigate();
    return (
        <Box sx={{ height: "auto", background: "#FBF6EE", borderRadius: "1rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography sx={{ color: "#08484A", fontWeight: 600, fontSize: "30px" }}>Gợi ý hôm nay</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto", gap: 2, padding: '1rem', width: "1500px" }}>
                {products.slice(0, 15).map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            position: "relative",
                            "&:hover": {
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Đặt kiểu dáng khi hover
                            },
                            cursor: "pointer"
                        }}  onClick={() => navigate(`/products/${item.id}`)}
                    >
                        <img src={item.imageUrl} className='w-[auto] h-[210px]' alt={`img${index + 1}`} />
                        <Typography sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "250px",
                            fontWeight: 400,
                            fontSize: "25px",
                            marginBottom: "8px",
                        }}>
                            {item.name}
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                            <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", fontWeight: 800, fontSize: "15px" }}>vnđ</Typography>
                            <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", fontSize: "20px", marginLeft: "5px", position: 'relative' }}>
                                {item.discountType !== null && item.discountType === 'PERCENT' ? (
                                    <>
                                        <span style={{ textDecoration: 'line-through', fontSize: "14px" }}>{item.sizes[0].price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                        <span style={{ marginLeft: '5px', fontWeight: 700 }}>
                                            {`${(item.sizes[0].price * (100 - item.discountNumber) / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                                        </span>
                                    </>
                                ) : item.discountType !== null && item.discountType === 'VNĐ' ? (
                                    <>
                                        <span style={{ textDecoration: 'line-through' }}>{item.sizes[0].price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                        <span style={{ marginLeft: '5px' }}>
                                            {`${(item.sizes[0].price - item.discountNumber).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                                        </span>
                                    </>
                                ) : (
                                    `${item.sizes[0].price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                                )}
                            </Typography>
                        </Box>
                        <Typography sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "250px",
                            fontWeight: 400,
                            fontSize: "15px",
                            marginBottom: "8px",
                        }}>
                            {item.shop.address}
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Button sx={{ marginBottom: "1rem", color: "#000000", fontWeight: 500, background: "#00AF74", width: "100px" }}> Xem thêm</Button>
        </Box>

    )
}

export default SuggestProduct