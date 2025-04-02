import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { useState } from "react";
import Upload from "./Upload.jsx";
import youtube from "../img/youtube.png";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <nav className="sticky top-0 flex items-center py-2 justify-between shadow-md z-10 bg-light-bgLighter dark:bg-dark-bgLighter h-14">
        {/* logo */}
        <div className="flex items-center">
          <MenuIcon className="w-[22px] ml-5 mr-2" />
          <Link to="/" className="w-32">
            <div className="flex items-center font-bold ">
              <img src={youtube} alt="logo" className="h-[20px]" />
              ViewTube
            </div>
          </Link>
        </div>
        {/* search */}
        <div className="flex items-center h-full py-0 px-5 justify-end relative">
          <div className=" flex items-center mr-4  py-2 px-3 border border-gray-300 rounded-3xl text-light-text dark:text-dark-text">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
              className="border-0 bg-transparent w-[400px] outline-0 text-light-text dark:text-dark-text"
            />
            <SearchOutlinedIcon
              onClick={() => navigate(`/search?q=${q}`)}
              className="cursor-pointer w-4"
            />
          </div>
        </div>
        <div>
          {/* log in icon */}
          {currentUser ? (
            <div className="flex items-center  mr-6 font-medium text-light-text dark:text-dark-text">
              <VideoCallOutlinedIcon
              className="w-6 mr-6"
                onClick={() => setOpen(true)}
              />
              <img
                src={currentUser.others.img}
                className="w-8 h-8 rounded-full bg-[#999]"
              />
            </div>
          ) : (
            <Link to="signin">
              <button className="py-1 px-1 bg-transparent border border-blue-600 text-blue-600 rounded font-medium cursor-pointer flex justify-center items-center gap-1">
                <AccountCircleOutlinedIcon />
                SIGN IN
              </button>
            </Link>
          )}
        </div>
      </nav>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
}

export default Navbar;
