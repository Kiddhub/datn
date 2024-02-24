import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

const NoProduct = () => {
    return (
        <>
            <Box sx={{ width: "100%", height: "auto", alignItems: "center", display: "flex", justifyContent: "center" }}>
                <Typography>Không có gì đâu</Typography>
            </Box>


        </>
    )
}

export default NoProduct