/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import avatar from "../../../assets/logo/avatar.jpg";
import { useStateContext } from "../../../context/ContextProvider";
import { Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { remover } from "../../../state/tokenSlice";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <Tooltip title={title} placeholder="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-[1.25rem] leading-7 rounded-full p-[0.75rem] hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-[0.5rem] w-[0.5rem] right-[0.5rem] top-[0.5rem]"
      />
      {icon}
    </button>
  </Tooltip>
);

const Navbar = ({shop}) => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

return (
<div className="flex justify-between p-[0.5rem] md:ml-[1.5rem] md:mr-[1.5rem] relative">
  <NavButton
    title="Menu"
    customFunc={handleActiveMenu}
    color={currentColor}
    icon={<AiOutlineMenu />}
  />
  <div className="flex">
    <NavButton
      title="Cart"
      customFunc={() => handleClick("cart")}
      color={currentColor}
      icon={<FiShoppingCart />}
    />
    <NavButton
      title="Chat"
      dotColor="#03C9D7"
      customFunc={() => handleClick("chat")}
      color={currentColor}
      icon={<BsChatLeft />}
    />
    <NavButton
      title="Notification"
      dotColor="rgb(254, 201, 15)"
      customFunc={() => handleClick("notification")}
      color={currentColor}
      icon={<RiNotification3Line />}
    />
    <Tooltip onClick={handleMenu}>
      <div
        className="flex items-center gap-2 cursor-pointer p-[0.25rem] hover:bg-light-gray rounded-lg"
      >
        <img
          className="rounded-full w-20 h-20"
          src={shop.imageUrl}
          alt="user-profile"
        />
        <p>
          <span className="text-gray-400 text-[14px]">Hi,</span>{" "}
          <span className="text-gray-400 font-bold ml-[0.25rem] text-[14px]">
            {shop.name}
          </span>
        </p>
        <MdKeyboardArrowDown className="text-gray-400 text-[14px]" />
      </div>
    </Tooltip>
    <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{
            marginTop: "2rem",
            marginLeft: "4rem"
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={(e) => {
            dispatch(remover());
            navigate("/shop")
          }}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>

  </div>
</div>
);
};

export default Navbar;
