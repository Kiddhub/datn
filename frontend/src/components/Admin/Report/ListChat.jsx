import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const ListChat = () => {
    return (
        <List sx={{bgcolor: 'background.paper' }}>
            <ListItem alignItems="center" sx={{ display: "flex", gap: 2, cursor: "pointer", '&:hover': { background: "#A9A9A9" }, borderBottom: "solid 1px #F3EEEA" }}>
                <Avatar alt="User 1" src="https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lp0fxdqd768r78" />
                <ListItemText
                    primary="User 1"
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Hello, how are you?
                            </Typography>
                            <Typography
                                sx={{ display: 'block' }}
                                component="span"
                                variant="caption"
                                color="text.secondary"
                            >
                                10:00 AM
                            </Typography>
                        </>
                    }
                />
            </ListItem>
        </List>
    );
};

export default ListChat;
