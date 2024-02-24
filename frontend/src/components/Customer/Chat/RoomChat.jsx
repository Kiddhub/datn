import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { postFetch } from '../../../network';
import useRequireAuth from '../Auth/RequireAuth';

const isToday = (timestamp) => {
  const messageDate = new Date(timestamp);
  const today = new Date();

  return (
    messageDate.getDate() === today.getDate() &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear()
  );
};

const formatTimestamp = (timestamp) => {
  const messageDate = new Date(timestamp);
  const options = isToday(timestamp)
    ? { hour: 'numeric', minute: 'numeric' }
    : { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return messageDate.toLocaleString('en-US', options);
};

const RoomChat = ({ roomChat, showAlert, setShowAlert, setAlertSeverity, setAlertMessage }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const token = useRequireAuth();
  const chatListRef = useRef(null);

  useEffect(() => {
    setMessages(roomChat.messages);
    // Scroll to the bottom when roomChat is updated
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [roomChat]);

  const sendMessage = async (data) => {
    const form = {
      content: data,
      receiptedId: roomChat.shop?.id,
    };

    // Optimistic UI Update: Add the new message to the local state before sending it to the server
    const optimisticMessage = {
      content: data,
      senderId: roomChat.user.id,
      timeStamp: new Date().toISOString(),
    };

    setMessages([...messages, optimisticMessage]);

    try {
      // Send the message to the server
      const res = await postFetch('user/chats/messages', form, token);

      // Update the local state with the actual response from the server
      setMessages([...messages, res]);

      setMessage('');
      setShowAlert(true);
      setAlertSeverity('success');
      setAlertMessage('Gửi thành công');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '90vh', width: 'auto' }}>
      <Box sx={{ height: '3.5rem', background: '#FFF7F1', alignItems: 'center', display: 'flex', padding: '1rem' }}>
        <Typography variant="h5" sx={{ color: 'black' }}>
          {roomChat.shop?.name}
        </Typography>
      </Box>
      <Box
        ref={chatListRef}
        sx={{ flexGrow: 1, overflowY: 'auto', p: 2, height: 'auto', background: '#F5F7F8', scrollbarWidth: 'thin' }}
      >
        {/* Danh sách tin nhắn */}
        <List>
          {messages?.map((message, index) => (
            <Box key={index} sx={{ marginBottom: '1rem' }}>
              {roomChat.user?.id === message.senderId ? (
                <Box sx={{ background: '#91C8E4', borderRadius: '1rem', width: '300px', marginLeft: 'auto' }}>
                  <Typography sx={{ marginLeft: 'auto', fontSize: '10px', padding: '0.2rem' }}>
                    {formatTimestamp(message.timeStamp)}
                  </Typography>
                  <Typography sx={{ marginLeft: 'auto', padding: '0.2rem', width: 'auto', wordWrap: 'break-word' }}>
                    {message.content}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ background: 'white', borderRadius: '1rem', width: '20%' }}>
                  <Typography sx={{ fontSize: '10px', padding: '0.2rem' }}>{formatTimestamp(message.timeStamp)}</Typography>
                  <Typography sx={{ padding: '0.2rem', wordWrap: 'break-word' }}>{message.content}</Typography>
                </Box>
              )}
            </Box>
          ))}
        </List>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 1, width: '1000px', justifyContent: 'space-between' }}>
        <TextField label="Type a message" sx={{ width: '900px' }} value={message} onChange={(e) => setMessage(e.target.value)} />
        <IconButton onClick={(e) => sendMessage(message)} disabled={!message.trim()}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RoomChat;
