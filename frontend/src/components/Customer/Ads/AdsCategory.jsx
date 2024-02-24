import { Box, Typography } from '@mui/material'
import React from 'react'
import apple from '../../../assets/ads/apple.png'
import panasonic from '../../../assets/ads/panasonic.png'
import { useNavigate } from 'react-router-dom'

const AdsCategory = ({ name, products }) => {
    const navigate = useNavigate();
    return (
        <Box sx={{ marginBottom: "1rem" }}>
            <img src={name === "Apple" ? (apple) : (panasonic)} className='' />
            <Box sx={{
                height: "auto",
                background: "#FAEF9B",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Box sx={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto", gap: 1, padding: '1rem' }}>
                    {products.slice(0, 10).map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                position: "relative",
                                "&:hover": {
                                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Đặt kiểu dáng khi hover
                                },
                                cursor: "pointer"
                            }}
                            onClick={() => navigate(`/products/${item.id}`)}
                        >
                            <img src={item.imageUrl} className='w-[auto]' alt={`img${index + 1}`} />
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
                                            <span style={{ textDecoration: 'line-through', fontSize: "14px" }}>{item.sizes[0].price.toFixed(0).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                                            <span style={{ marginLeft: '5px', fontWeight: 700 }}>
                                                {`${(item.sizes[0].price * (100 - item.discountNumber) / 100).toFixed(0).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                                            </span>
                                        </>
                                    ) : item.discountType !== null && item.discountType === 'VNĐ' ? (
                                        <>
                                            <span style={{ textDecoration: 'line-through' }}>{item.sizes[0].price.toFixed(0).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                                            <span style={{ marginLeft: '5px' }}>
                                                {`${(item.sizes[0].price - item.discountNumber).toFixed(0).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                                            </span>
                                        </>
                                    ) : (
                                        `${item.sizes[0].price.toFixed(2).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
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
                                {item.shop?.address}
                            </Typography>
                        </Box>
                    ))}

                </Box>
            </Box>
        </Box>
    )
}

export default AdsCategory