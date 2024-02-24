import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const ChatSearch = () => {
    const handleSearch = (e) => {
        // Xử lý tìm kiếm dựa trên giá trị nhập vào (e.target.value)
        console.log('Search value:', e.target.value);
    };

    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Tìm kiếm..."
            onChange={handleSearch}
            sx={{
                width: '100%',  // Điều chỉnh chiều rộng của TextField
                mx: 'auto',    // Căn giữa TextField
                mt: 3,         // Margin top
                mb: 2 ,        // Margin bottom
                borderRadius:"1rem"
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <IconButton size="small">
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        {/* Đây là nút xóa giá trị tìm kiếm (nếu cần) */}
                        <IconButton size="small">
                            <ClearIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default ChatSearch;
