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
import { useTheme } from "../utils/themeContext.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Menu() {
  const { darkMode, setDarkMode } = useTheme();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="container flex-1 h-max text-[13px] sticky top-0 bg-light-bgLighter dark:bg-dark-bgLighter text-light-text dark:text-dark-text ">
      <div className="py-4 px-7">
        {/* logo */}
       
        {/* items */}
        <Link to="/">
          <div className="menuItems">
            <HomeIcon />
            Home
          </div>
        </Link>

        <Link to="trends">
          <div className="menuItems">
            <ExploreOutlinedIcon />
            Explore
          </div>
        </Link>

        <Link to="subscriptions">
          <div className="menuItems">
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </div>
        </Link>

        <hr className="my-[10px] border border-light-soft dark:border-dark-soft" />

        <div className="menuItems">
          <VideoLibraryOutlinedIcon />
          Library
        </div>

        <div className="menuItems">
          <HistoryOutlinedIcon />
          History
        </div>

        <hr className="my-[15px] border border-light-soft dark:border-dark-soft" />

        {!currentUser && (
          <>
            <div>
              Sign in to like video, comment, and subscribe.
              <Link to="signin">
                <button className="py-1 px-3 bg-transparent border border-blue-600 text-blue-600 rounded-sm font-medium mt-2 cursor-pointer flex justify-center items-center gap-1">
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </button>
              </Link>
            </div>

            <hr className="my-[15px] border border-light-soft dark:border-dark-soft" />
          </>
        )}

        <div className="menuItems">
          <LibraryMusicOutlinedIcon />
          Music
        </div>

        <div className="menuItems">
          <SportsBasketballOutlinedIcon />
          Sports
        </div>

        <div className="menuItems">
          <SportsEsportsOutlinedIcon />
          Gamming
        </div>

        <div className="menuItems">
          <MovieOutlinedIcon />
          Movies
        </div>

        <div className="menuItems">
          <ArticleOutlinedIcon />
          News
        </div>

        <div className="menuItems">
          <LiveTvOutlinedIcon />
          Live
        </div>

        <hr className="my-[15px] border border-light-soft dark:border-dark-soft" />

        <div className="menuItems">
          <SettingsOutlinedIcon />
          Setings
        </div>

        <div className="menuItems">
          <FlagOutlinedIcon />
          Report
        </div>

        <div className="menuItems">
          <HelpOutlineOutlinedIcon />
          Help
        </div>

        <div className="menuItems" onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </div>
      </div>
    </div>
  );
}

export default Menu;
