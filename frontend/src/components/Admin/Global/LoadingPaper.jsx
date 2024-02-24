import React from 'react';
import { Paper, Typography } from '@mui/material';


const LoadingPaper = () => {
  return (
    <Paper
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Màu nền mờ
        height:"80vh",
        borderRadius:"1rem"
      }}
    >
      <Typography variant="h6" sx={{ marginTop: '1rem',color:"#B2A59B"}}>
        Không có sản phẩm
      </Typography>
    </Paper>
  );
};

export default LoadingPaper;
