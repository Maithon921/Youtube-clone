import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// importing material ui icons
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import youtube from "../img/youtube.png";
import Upload from "./Upload.jsx";
import Menu from "./Menu.jsx";
import { logout } from "../redux/userSlice.js";
import EditAccountModal from "./editAccountModal.jsx";
import DeleteAccountModal from "./DeleteAccountModal.jsx";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
// to provide toast information to user
import { toast } from "react-toastify";

function Navbar({ setSidebar, sidebar }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [searchModal, setSearchModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const ref = useRef();
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    toast.success("Log out successful");
    setShowProfileMenu(false);
    navigate("/signin");
  };

  return (
    <>
      <nav className="sticky top-0 z-30 w-full bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text px-2 sm:px-4 py-2 sm:py-2 flex items-center justify-between">
        {/* Logo and Hamburger icon */}
        <div className="flex items-center gap-2">
          <MenuIcon
            onClick={() => setSidebar((prev) => !prev)}
            className="cursor-pointer sm:hidden"
          />
          <Link to="/" className="flex items-center font-bold">
            <img src={youtube} alt="logo" className="h-4 sm:h-5" />
            <span className="text-xs sm:text-lg">ViewTube</span>
          </Link>
        </div>

        {/* Search Bar bor larger screen*/}
        <div className="hidden sm:flex flex-1 justify-center max-w-xl mx-3">
          <div className="flex items-center w-full border border-gray-300 rounded-3xl overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
              className="w-full bg-transparent px-3 py-2 text-sm md:text-base outline-none"
            />
            <div className="border-l px-2">
              <SearchOutlinedIcon
                onClick={() => navigate(`/search?q=${q}`)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* User/Profile */}
        <div className="flex items-center gap-2 sm:gap-3 relative" ref={ref}>
          {/* Mobile Search Icon */}
          <div
            className="sm:hidden p-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-soft"
            onClick={() => setSearchModal(true)}
          >
            <SearchOutlinedIcon />
          </div>
          {/* shows user image and upload video button if logged in */}
          {currentUser ? (
            <>
              <VideoCallOutlinedIcon
                fontSize="large"
                className="cursor-pointer"
                onClick={() => setOpen(true)}
              />
              <img
                src={currentUser.img}
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="h-9 w-9 rounded-full object-cover cursor-pointer"
              />

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 top-10 w-44 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-soft rounded-md shadow-md text-sm sm:text-base">
                  <div className="px-4 py-3 border-b">
                    <div className="flex gap-3 items-center">
                      <img
                        src={currentUser.img}
                        className="h-8 w-8 object-cover rounded-full"
                      />
                      <div className="truncate">
                        <p className="capitalize">{currentUser.name}</p>
                        <p className="text-xs">{currentUser.email}</p>
                      </div>
                    </div>
                    <Link
                      to={`/channel/${currentUser._id}`}
                      className="block text-blue-600 text-center mt-2"
                      onClick={() => setShowProfileMenu((prev) => !prev)}
                    >
                      View Your Channel
                    </Link>
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-soft cursor-pointer flex gap-2 "
                    onClick={() => {
                      setShowDeleteModal(true);
                      setShowProfileMenu(false);
                    }}
                  >
                    <DeleteForeverIcon fontSize="small" />
                    Delete Account
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-soft cursor-pointer flex gap-2"
                    onClick={() => {
                      setShowEditModal(true);
                      setShowProfileMenu(false);
                    }}
                  >
                    <EditIcon fontSize="small" />
                    Edit Account
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-soft cursor-pointer flex gap-2 text-red-500"
                    onClick={handleLogout}
                  >
                    <LogoutIcon />
                    Log out
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link to="/signin">
              <button className="py-1 px-2 border border-blue-600 text-blue-600 rounded flex items-center gap-1">
                <AccountCircleOutlinedIcon />
                <span className="hidden sm:inline">SIGN IN</span>
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Search Modal */}
      {searchModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-20 flex justify-center items-start pt-20 px-4 sm:hidden"
          onClick={() => setSearchModal((prev) => !prev)}
        >
          <div
            className="bg-light-bg dark:bg-dark-bg w-full max-w-md p-4 rounded shadow-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseIcon
              fontSize="small"
              onClick={() => setSearchModal(false)}
              className="absolute top-1 right-1 cursor-pointer"
            />
            <div className="flex items-center border border-gray-300 rounded-3xl mt-5 overflow-hidden">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setQ(e.target.value)}
                className="w-full bg-transparent px-3 py-2 outline-none text-light-text dark:text-dark-text"
              />
              <div className="border-l px-2">
                <SearchOutlinedIcon
                  onClick={() => {
                    navigate(`/search?q=${q}`);
                    setSearchModal(false);
                  }}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {sidebar && (
        <Menu
          sidebar={sidebar}
          setSidebar={setSidebar}
          handleLogout={handleLogout}
        />
      )}
      {open && <Upload setOpen={setOpen} />}
      {showEditModal && <EditAccountModal setOpen={setShowEditModal} />}
      {showDeleteModal && <DeleteAccountModal setOpen={setShowDeleteModal} />}
    </>
  );
}

export default Navbar;
