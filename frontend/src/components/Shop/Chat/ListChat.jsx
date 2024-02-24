import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const ListChat = ({ setRoomChat, chats }) => {

    // Sắp xếp lại chats theo timeStamp mới nhất
    const sortedChats = chats.slice().sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));

    const handleClick = (data) => {
        setRoomChat(data);
    };

    return (
        <List sx={{ bgcolor: 'background.paper' }}>
            {
                sortedChats.map((chat, index) => (
                    <ListItem
                        key={index}
                        alignItems="center"
                        sx={{
                            display: "flex",
                            gap: 2,
                            cursor: "pointer",
                            '&:hover': { background: "#A9A9A9" },
                            borderBottom: "solid 1px #F3EEEA"
                        }} onClick={(e) => handleClick(chat)}>
                        <Avatar alt="avatar" src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" />
                        <ListItemText
                            primary={chat.user?.email}
                            secondary={
                                <>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {chat.lastMessage}
                                    </Typography>
                                    <Typography
                                        sx={{ display: 'block' }}
                                        component="span"
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {chat.timeStamp}
                                    </Typography>
                                </>
                            }
                        />
                    </ListItem>
                ))
            }
        </List>
    );
};

export default ListChat;
