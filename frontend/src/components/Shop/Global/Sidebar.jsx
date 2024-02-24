import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";

import { links } from "../../../data/dummy.jsx";
import { useStateContext } from "../../../context/ContextProvider";
import { Avatar, Tooltip, Typography } from "@mui/material";
import useRequireAuth from "../AuthShop/RequireAuth.jsx";

const Sidebar = ({shop}) => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-[#F8FFE4]  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-[#ECE3CE] dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-[0.75rem] h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-[2.5rem] ">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/shop"
              onClick={handleCloseSideBar}
              className="items-center gap-[0.75rem] ml-[0.75rem] mt-10 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <Avatar src={shop.imageUrl} sx={{width:"auto"}} />
              <Typography variant="h5" sx={{color:"white"}}>{shop.name}</Typography>
            </Link>
            <Tooltip title="Menu">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-[0.75rem] hover:bg-light-gray mt-10 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </Tooltip>
          </div>
          <div className="mt-[2.5rem] ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-[0.75rem] mt-10 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.href}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
