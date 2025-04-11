// Importing all Material UI icons used for sidebar items
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import youtube from "../img/youtube.png";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "../utils/themeContext.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Menu({ setSidebar, handleLogout }) {
  const { darkMode, setDarkMode } = useTheme(); // to toggle dark and light mode
  // getting the details of log-in user
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div
      className={`fixed z-30 h-dvh w-full text-[13px] top-0 -left-1  text-light-text dark:text-dark-text transition-all duration-300 overflow-y-scroll no-scrollbar flex`}
    >
      {/* sidebar container */}
      <div className="py-4 bg-light-bgLighter overflow-y-scroll dark:bg-dark-bgLighter w-60 no-scrollbar ">
        {/* logo with menu icon */}
        <div className="flex items-center pl-2 space-x-2 text-light-text dark:text-dark-text">
          <MenuIcon
            onClick={() => setSidebar((prev) => (prev ? false : true))}
            className="cursor-pointer"
          />
          <Link
            to="/"
            onClick={() => setSidebar((prev) => (prev ? false : true))}
          >
            <div className="flex items-center font-bold">
              <img src={youtube} alt="logo" className="h-4 sm:h-5" />
              <span className="text-xs sm:text-lg">ViewTube</span>
            </div>
          </Link>
        </div>
        {/* navigation links */}
        <Link
          to="/"
          onClick={() => setSidebar((prev) => (prev ? false : true))}
        >
          <div className="menuItems">
            <HomeIcon />
            Home
          </div>
        </Link>

        <Link
          to="trends"
          onClick={() => setSidebar((prev) => (prev ? false : true))}
        >
          <div className="menuItems">
            <ExploreOutlinedIcon />
            Explore
          </div>
        </Link>

        <Link
          to="subscriptions"
          onClick={() => setSidebar((prev) => (prev ? false : true))}
        >
          <div className="menuItems">
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </div>
        </Link>

        <hr className="my-[10px] border border-light-soft dark:border-dark-soft" />
        {/* toggling light and dark mode */}
        <div
          className="menuItems"
          onClick={() => {
            setDarkMode(!darkMode);
            setSidebar((prev) => (prev ? false : true));
          }}
        >
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </div>

        <div
          className="menuItems"
          onClick={() => setSidebar((prev) => (prev ? false : true))}
        >
          <VideoLibraryOutlinedIcon />
          Library
        </div>

        <div
          className="menuItems"
          onClick={() => setSidebar((prev) => (prev ? false : true))}
        >
          <HistoryOutlinedIcon />
          History
        </div>

        <hr className="my-[15px] border border-light-soft dark:border-dark-soft" />

        {/* tells user to sign in if user is not */}
        {!currentUser && (
          <>
            <div className="px-3">
              Sign in to like video, comment, and subscribe.
              <Link
                to="signin"
                onClick={() => setSidebar((prev) => (prev ? false : true))}
              >
                <button className="py-1 px-2 bg-transparent border border-blue-600 text-blue-600 rounded-sm font-medium mt-2 cursor-pointer flex justify-center items-center gap-1">
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </button>
              </Link>
            </div>

            <hr className="my-[15px] border border-light-soft dark:border-dark-soft" />
          </>
        )}

        <div
          className="menuItems"
          onClick={() => setSidebar((prev) => (prev ? false : true))}
        >
          <LibraryMusicOutlinedIcon />
          Music
        </div>

        <div
          className="menuItems"
          onClick={() => setSidebar((prev) => (prev ? false : true))}
        >
          <SportsBasketballOutlinedIcon />
          Sports
        </div>

        <div
          className="menuItems"
          onClick={() => setSidebar((prev) => (prev ? false : true))}
        >
          <SportsEsportsOutlinedIcon />
          Gamming
        </div>

        <div
          className="menuItems"
          onClick={() => setSidebar((prev) => (prev ? false : true))}
        >
          <MovieOutlinedIcon />
          Movies
        </div>

        <div
          className="menuItems"
          onClick={() => setSidebar((prev) => (prev ? false : true))}
        >
          <ArticleOutlinedIcon />
          News
        </div>

        <div
          className="menuItems"
          onClick={() => setSidebar((prev) => (prev ? false : true))}
        >
          <LiveTvOutlinedIcon />
          Live
        </div>

        <hr className="my-[15px] border border-light-soft dark:border-dark-soft" />

        <div
          className="menuItems"
          onClick={() => setSidebar((prev) => (prev ? false : true))}
        >
          <SettingsOutlinedIcon />
          Setings
        </div>

        <div
          className="menuItems"
          onClick={() => setSidebar((prev) => (prev ? false : true))}
        >
          <FlagOutlinedIcon />
          Report
        </div>

        <div
          className="menuItems"
          onClick={() => setSidebar((prev) => (prev ? false : true))}
        >
          <HelpOutlineOutlinedIcon />
          Help
        </div>
        {/* log out user if log in */}
        <div
          className="menuItems"
          onClick={() => {
            handleLogout();
            setSidebar((prev) => (prev ? false : true));
          }}
        >
          <LogoutIcon />
          Log Out
        </div>
      </div>
      {/* backgorund overlay to close sidebar */}
      <div
        onClick={() => setSidebar((prev) => (prev ? false : true))}
        className="bg-[#1c1b1b39] w-[calc(100%-240px)] transition-all duration-1000"
      ></div>
    </div>
  );
}

export default Menu;
