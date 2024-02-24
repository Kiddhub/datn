import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CategoryModal from './CategoryModal';
const SuggestBar = ({ setToken }) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }
    return (
        <>
            <Box position="static" sx={{ background: "#00AF74", paddingY: "0.1rem", height: "auto" }}>
                <Box sx={{ display: "flex", gap: 2, margin: "auto" }}>

                    <Button variant sx={{ color: "#F1F4F4", display: "flex", gap: 1, alignItems: 'center', textTransform: 'none' }} onClick={()=>handleOpen()}>
                        <Typography variant='h7'>All</Typography>
                        <MenuIcon sx={{ background: "#F1F4F4", color: "black" }} />
                    </Button>
                    <Button variant sx={{ color: "#F1F4F4", textTransform: 'none' }}>Best Sellers</Button>
                    <Button variant sx={{ color: "#F1F4F4", textTransform: 'none' }}>Today's Deals</Button>
                    <Button variant sx={{ color: "#F1F4F4", textTransform: 'none' }}>Event Sale</Button>
                    <Button variant sx={{ color: "#F1F4F4", textTransform: 'none' }}>Mina's Choice</Button>
                    <Button variant sx={{ color: "#F1F4F4", textTransform: 'none' }}>New Releases</Button>
                    <Button variant sx={{ color: "#F1F4F4", textTransform: 'none' }}>Trending Tags</Button>
                </Box>
            </Box>
            <CategoryModal open={open} onClose={onClose}/>
        </>

    );
}

export default SuggestBar;
