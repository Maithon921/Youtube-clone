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
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from "../utils/themeContext.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Menu({ sidebar, setSidebar }) {
  const { darkMode, setDarkMode } = useTheme();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className={`absolute z-30 h-dvh w-full text-[13px] top-0 -left-1  text-light-text dark:text-dark-text transition-all duration-300 overflow-y-scroll no-scrollbar flex`}>
      <div className="py-4 bg-light-bgLighter overflow-y-scroll dark:bg-dark-bgLighter w-60 no-scrollbar ">
        <div className="flex items-center pl-2 space-x-2 text-light-text dark:text-dark-text">
          <MenuIcon
            onClick={() => setSidebar((prev) => (prev ? false : true))}
            className="cursor-pointer sm:hidden"
          />
          <Link to="/">
            <div className="flex items-center font-bold">
              <img src={youtube} alt="logo" className="h-4 sm:h-5" />
              <span className="text-xs sm:text-lg">ViewTube</span>
            </div>
          </Link>
        </div>
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

        <div className="menuItems" onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </div>

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
            <div className="px-3">
              Sign in to like video, comment, and subscribe.
              <Link to="signin">
                <button className="py-1 px-2 bg-transparent border border-blue-600 text-blue-600 rounded-sm font-medium mt-2 cursor-pointer flex justify-center items-center gap-1">
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
        <div className="menuItems">
          <LogoutIcon />
          Log Out
        </div>
       
      </div>
      <div
        onClick={() => setSidebar((prev) => (prev ? false : true))}
        className="bg-[#1c1b1b39] w-[calc(100%-240px)] transition-all duration-1000"
      ></div>
    </div>
  );
}

export default Menu;

{
  /* <div className="sidebar " style={{ left: sidebar ? "-100%" : "0px" }}>
  <div className="left bg-white">
    <div className="top">
      <i
        onClick={() => setSidebar(!sidebar)}
        className="ri-menu-fill cursor-pointer ml-1"
      ></i>
      <h2>
        <i className="ri-youtube-fill yti"></i>Youtube<span>IN</span>
      </h2>
    </div>
    <div className="first-menu">
      <div
        className="options"
        onClick={() => {
          navigate("/"), setSidebar(!sidebar);
        }}
      >
        <i className="ri-home-5-fill"></i>
        <p>Home</p>
      </div>

      <div className="options">
        <img
          src="https://i.pinimg.com/originals/17/d2/18/17d21878c22fe49e7e4752eecaa36541.png"
          alt="icon"
        />
        <p>Shorts</p>
      </div>

      <div className="options">
        <img
          src="https://cdn.iconscout.com/icon/free/png-512/free-subscription-logo-icon-download-in-svg-png-gif-file-formats--youtube-menu-subs-social-media-pack-logos-icons-3789620.png?f=webp&w=512"
          alt="Subscriptions"
        />
        <p>Subscriptions</p>
      </div>

      <div className="options">
        <img
          src="https://cdn.iconscout.com/icon/free/png-512/free-youtube-music-logo-icon-download-in-svg-png-gif-file-formats--social-media-app-pack-logos-icons-3222736.png?f=webp&w=512"
          alt="Music"
        />
        <p>Music</p>
      </div>
    </div>
    <div className="first-menu">
      <div className="options">
        <p>You</p>
        <i className="ri-arrow-right-wide-fill"></i>
      </div>
      <div className="options">
        <i className="ri-contacts-book-2-line"></i>
        <p>Your Channel</p>
      </div>

      <div className="options">
        <i className="ri-history-fill"></i>
        <p>History</p>
      </div>

      <div className="options">
        <i className="ri-play-list-2-fill"></i>
        <p>Playlist</p>
      </div>

      <div className="options">
        <i className="ri-movie-line"></i>
        <p>Your Videos</p>
      </div>
      <div className="options">
        <i className="ri-lightbulb-line"></i>
        <p>Your Courses</p>
      </div>
      <div className="options">
        <i className="ri-time-line"></i>
        <p>Watch Later</p>
      </div>
      <div className="options">
        <i className="ri-thumb-up-line"></i>
        <p>Liked videos</p>
      </div>
      <div className="options">
        <i className="ri-download-line"></i>
        <p>Downloads</p>
      </div>
      <div className="options">
        <i className="ri-scissors-cut-line"></i>
        <p>Your clips</p>
      </div>
    </div>
  </div>
  <div
    onClick={() => setSidebar(!sidebar)}
    className="right"
    style={{ opacity: sidebar ? "0" : "1" }}
  ></div>
</div>; */
}
