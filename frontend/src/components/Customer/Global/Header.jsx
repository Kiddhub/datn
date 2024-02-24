import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Avatar from '@mui/material/Avatar';
import logo from '../../../assets/logo.png'
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import cartIcon from '../../../assets/cart.png'
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getFetch, getFetchWithParams } from '../../../network';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { remover } from '../../../state/tokenSlice';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SearchBox from './SearchBox';
import { Button } from '@mui/material';
import SuggestBar from './SuggestBar';

const settings = ['Profile', 'Logout'];

const Header = ({ setToken }) => {
    const [anchorElAccountMenu, setAnchorElAccountMenu] = useState(null);

    const handleOpenAccountMenu = (event) => {
        setAnchorElAccountMenu(event.currentTarget);
    };

    const handleCloseAccountMenu = () => {
        setAnchorElAccountMenu(null);
    };

    const [user, setUser] = useState(null);
    const location = useLocation();
    const token = setToken;
    const dispatch = useDispatch();
    const loadUser = async (token) => {
        try {
            const res = await getFetch('/user/auth/profile', setToken);
            setUser(res);
        } catch (err) {
            console.error(err);
            setUser(null);
        }
    };
    useEffect(() => {
        loadUser(setToken);
    }, [setToken]);

    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSearch = (searchTerm) => {
        // Do whatever you want with the search term here
        console.log('Search term:', searchTerm);
        onSearch(searchTerm);

    };
    const onSearch =  async (data) => {
        try{
            const res = await getFetchWithParams('/user/product/searchProduct',{name:data},"")
            console.log(">>> resSearch",res)
            navigate(`/products?name=${data}`, { state: { products: res} });
        }catch(err){
            console.error(err);
        }
    }

    return (
        <>
            <AppBar position="static" sx={{ background: "#FDC942", paddingY: "0.5rem", height: "auto", margin: "auto" }}>
                <Toolbar disableGutters sx={{ margin: 'auto' }}>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <Link to={{ pathname: '/', state: { token: token } }}>
                            <img src={logo} className='h-auto w-[7rem]' />
                        </Link>
                        <Link to={{ pathname: '/shop' }}>
                            <IconButton sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <StorefrontIcon sx={{ height: "2rem", marginRight: "0.5rem", color: "#08484A" }} />
                                <Typography sx={{ fontSize: "14px", color: "#008170", fontWeight: "400" }}> Seller Central</Typography>
                            </IconButton>
                        </Link>
                        <Link to={{ pathname: '/' }}>
                            <SupportAgentIcon sx={{ height: "auto", marginRight: "0.5rem", color: "#08484A", width: "2rem" }} />
                        </Link>
                    </Box>
                    <Box sx={{ width: "50rem", background: "#F0ECE5", borderRadius: "1rem", display: "flex", alignItems: "center" }}>
                        <SearchBox onSearch={(searchTerm) => handleSearch(searchTerm)} />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {user !== null ? (
                            <>
                                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                    <Link to="/cart">
                                        <ShoppingCartIcon sx={{ cursor: "pointer", color: "#08484A", marginLeft: "0.5rem" }} />
                                    </Link>
                                    <Link to="/chat">
                                        <ChatBubbleIcon sx={{ cursor: "pointer", color: "#08484A" }} />
                                    </Link>
                                    <Link to="/order">
                                        <LocalShippingIcon sx={{ cursor: "pointer", color: "#08484A" }} />
                                    </Link>
                                    <Box sx={{ flexGrow: 0, marginLeft: 1 }}>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <Avatar alt="Remy Sharp" src={user.imageUrl} />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center" onClick={(e) => { e.preventDefault(); }}>Profile</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={(e) => { dispatch(remover()); navigate("/"); }}>
                                                <Typography textAlign="center">Logout</Typography>
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{ display: "flex", gap: 0, marginLeft: "1rem", alignItems: "center" }}>
                                    <Link>
                                        <Tooltip title="Notification">
                                            <IconButton>
                                                <NotificationsActiveIcon sx={{ color: "#08484A" }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                    <Link>
                                        <Tooltip title="Order">
                                            <IconButton>
                                                <LocalShippingIcon sx={{ color: "#08484A", width: "200%" }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                    <Tooltip title="Cart" onClick={(e) => { navigate("/cart"); }}>
                                        <img src={cartIcon} className='w-[50px] cursor-pointer' />
                                    </Tooltip>
                                    <Tooltip title="Your Account">
                                        <IconButton onClick={handleOpenAccountMenu} sx={{ display: "flex", flexDirection: "column" }}>
                                            <SentimentSatisfiedAltIcon sx={{ color: "#08484A" }} />
                                            <Typography>Your Account</Typography>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </>
                        )}
                    </Box>
                </Toolbar>
                <Menu
                    id="menu-your-account"
                    anchorEl={anchorElAccountMenu}
                    open={Boolean(anchorElAccountMenu)}
                    onClose={handleCloseAccountMenu}
                >
                    <MenuItem onClick={handleCloseAccountMenu} sx={{ display: "flex", flexDirection: "column" }}>
                        <Button variant='contained' sx={{ width: "200px" }} onClick={() => { navigate("/login"); }}> Sign In</Button>
                        <Box sx={{ display: "flex" }}>
                            <Typography sx={{ fontSize: "14px", marginTop: "0.5rem", fontWeight: 500 }}>New customer ?</Typography>
                            <Typography
                                sx={{ fontSize: "14px", marginTop: "0.5rem", marginLeft: "0.25rem", textDecoration: "underline", color: "blue" }}
                                onClick={() => { navigate("/register"); }}
                            >
                                {' '}
                                Register
                            </Typography>
                        </Box>
                    </MenuItem>
                </Menu>
            </AppBar>
            <SuggestBar />
        </>
    );
};

export default Header;
