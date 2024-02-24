import {  Alert, Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ChatSearch from './ChatSearch'
import ListChat from './ListChat'
import RoomChat from './RoomChat'
import useRequireAuth from '../Auth/RequireAuth'
import { getFetch } from '../../../network'

const Chat = () => {
    const[roomChat,setRoomChat] = useState([])
    const [chats,setChats] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [alertSeverity, setAlertSeverity] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const token = useRequireAuth()
    const loadChat = async () => {
        try {
            const res = await getFetch('/user/chats/', token)
            setChats(res)
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        loadChat()
    }, [token,showAlert])
    return (
        <Box sx={{padding:"1rem"}}>
            <Typography variant='h4'>Chat</Typography>
            <Paper sx={{ display: "flex", height:"90vh" }}>
                <Box sx={{ flex: "1 0 30%", borderRight: "solid 1px" }}>
                    <ChatSearch/>
                    <ListChat setRoomChat={setRoomChat} chats={chats} />
                </Box>
                <Box sx={{ flex: "1 0 70%" }}>
                    <RoomChat
                    roomChat={roomChat} 
                    setShowAlert={setShowAlert}
                    setAlertSeverity={setAlertSeverity}
                    setAlertMessage = {setAlertMessage}
                    showAlert={showAlert} />
                </Box>
            </Paper>
            {showAlert && (
              <Alert
                severity={alertSeverity}
                onClose={() => {
                  setShowAlert(false),
                    setAlertSeverity(""),
                    setAlertMessage("")
                }}
                sx={{
                  marginBottom: "1rem",
                  position: 'absolute',
                  top: "12rem",
                  right: 0,
                }}
                open={showAlert}
              >
                {alertMessage}
              </Alert>
            )}
        </Box>

    )
}

export default Chat