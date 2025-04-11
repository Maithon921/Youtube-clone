import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import axios from "./axiosInstance.js";
import { Link } from "react-router-dom";
import { useTheme } from "../utils/themeContext.jsx";

function Home({ type }) {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { darkMode, setDarkMode } = useTheme();

  // getting all the categories available
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("/videos/categories");
      setCategories(["All", ...res.data]);
    };
    fetchCategories();
  }, []);

  // fetch videos either by category or the types send in props
  useEffect(() => {
    const fetchVideos = async () => {
      const endpoint =
        selectedCategory === "All"
          ? `/videos/${type}`
          : `/videos/category?category=${selectedCategory}`;
      const res = await axios.get(endpoint);
      setVideos(res.data);
    };
    fetchVideos();
  }, [type, selectedCategory]);

  return (
    <div className="mt-3 bg-light-bg dark:bg-dark-bg min-h-screen">
      {/* Category Filter */}
      <div className="flex gap-2 pl-2 pb-6 sm:ml-12 md:ml-14 overflow-x-scroll no-scrollbar">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`text-sm sm:text-base rounded-lg py-1 px-2 cursor-pointer text-nowrap
              ${
                selectedCategory === category
                  ? "bg-light-textSoft dark:bg-dark-soft text-white"
                  : "bg-light-bgLighter dark:bg-dark-bgLighter text-light-text dark:text-dark-text hover:bg-light-textSoft dark:hover:bg-dark-soft"
              }`}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="fixed top-16 left-0 z-10 h-[calc(100%-4rem)] p-[2px] sm:flex flex-col gap-4 text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg hidden">
        <Link
          to="/"
          className="hover:bg-light-soft hover:dark:bg-dark-soft px-2"
        >
          <HomeIcon fontSize="large" />
        </Link>
        <Link
          to="/trends"
          className="hover:bg-light-soft hover:dark:bg-dark-soft px-2"
        >
          <ExploreOutlinedIcon fontSize="large" />
        </Link>
        <Link
          to="/subscriptions"
          className="hover:bg-light-soft hover:dark:bg-dark-soft px-2"
        >
          <SubscriptionsOutlinedIcon fontSize="large" />
        </Link>
        <div className="hover:bg-light-soft hover:dark:bg-dark-soft px-2">
          <VideoLibraryOutlinedIcon fontSize="large" />
        </div>
        <div
          className="hover:bg-light-soft hover:dark:bg-dark-soft px-2"
          onClick={() => setDarkMode(!darkMode)}
        >
          <SettingsBrightnessOutlinedIcon fontSize="large" />
        </div>
      </div>

      {/* Video Cards */}
      <div className="sm:pl-12 flex justify-evenly items-center flex-wrap overflow-y-scroll no-scrollbar">
        {videos.length > 0 ? (
          videos.map((video) => <Card key={video._id} video={video} />)
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 w-full py-10 text-lg">
            No videos found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
