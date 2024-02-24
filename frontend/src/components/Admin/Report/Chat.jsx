import {  Box, Paper, Typography } from '@mui/material'
import React from 'react'
import ChatSearch from '../../Admin/Report/ChatSearch'
import ListChat from '../../Admin/Report/ListChat'
import RoomChat from '../../Admin/Report/RoomChat'

const Chat = () => {
    return (
        <Box sx={{padding:"1rem"}}>
            <Typography variant='h4'>Chat</Typography>
            <Paper sx={{ display: "flex", height:"90vh" }}>
                <Box sx={{ flex: "1 0 30%", borderRight: "solid 1px" }}>
                    <ChatSearch/>
                    <ListChat/>
                </Box>
                <Box sx={{ flex: "1 0 70%" }}>
                    <RoomChat/>
                </Box>
            </Paper>
        </Box>

    )
}

export default Chat