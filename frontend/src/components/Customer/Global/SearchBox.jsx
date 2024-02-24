import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBox = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <div>
            <TextField
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder='Search'
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '1rem' }, width: "750px" }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {searchTerm && (
                                <IconButton color="primary" onClick={handleClear} edge="end">
                                    <ClearIcon />
                                </IconButton>
                            )}
                        </InputAdornment>
                    ),
                }}
            />
            <IconButton color="primary" onClick={handleSearch} edge="end">
                <SearchIcon />
            </IconButton>
        </div>
    );
};

export default SearchBox;
