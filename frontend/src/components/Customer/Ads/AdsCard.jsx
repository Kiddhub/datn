import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdsCard = ({ name, products }) => {
    const navigate = useNavigate();
    return (
        <>
            <Box sx={{
                height: "700px",
                background: "#FAEF9B",
                borderRadius: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Typography sx={{ color: "#08484A", fontWeight: 600, fontSize: "30px" }}>{name}</Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: "auto auto", gap: 2, padding: '1rem' }}>
                    {
                        products.map((product, index) => (
                            <Box key={index} sx={
                                {
                                    "&:hover": {
                                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Đặt kiểu dáng khi hover
                                    },
                                    cursor: "pointer"
                                }
                            } onClick={() => navigate(`/products/${product.id}`)}>
                                <img src={product.imageUrl} className='w-[200px] h-[200px]' alt='img1' />
                                <Typography sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    width: "200px",
                                    fontWeight: 400,
                                    fontSize: "25px",
                                    marginBottom: "8px",
                                }}>
                                    {product.name}
                                </Typography>
                                <Box sx={{ display: "flex" }}>
                                    <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", fontWeight: 800, fontSize: "15px" }}>vnđ</Typography>
                                    <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", fontSize: "20px", marginLeft: "5px", position: 'relative' }}>
                                        {product.discountType !== null && product.discountType === 'PERCENT' ? (
                                            <>
                                                <span style={{ textDecoration: 'line-through', fontSize: "14px" }}>{product.sizes[0].price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                                <span style={{ marginLeft: '5px', fontWeight: 700 }}>
                                                    {`${(product.sizes[0].price * (100 - product.discountNumber) / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                                                </span>
                                            </>
                                        ) : product.discountType !== null && product.discountType === 'VNĐ' ? (
                                            <>
                                                <span style={{ textDecoration: 'line-through' }}>{product.sizes[0].price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                                <span style={{ marginLeft: '5px' }}>
                                                    {`${(product.sizes[0].price - product.discountNumber).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                                                </span>
                                            </>
                                        ) : (
                                            `${product.sizes[0].price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                                        )}
                                    </Typography>

                                </Box>
                            </Box>
                        ))
                    }

                </Box>
            </Box>
        </>
    )
}

export default AdsCard
