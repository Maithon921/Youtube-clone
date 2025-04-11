import { useLocation, useNavigate } from "react-router-dom";
import axios from "./axiosInstance.js";
import { useEffect, useState } from "react";
import Card from "./Card.jsx";

function Search() {
  const query = useLocation().search;
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  // get videos based on the keyword entered by user
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return (
    // display if video is found else display text
    <div
      className={`flex flex-wrap gap-2 py-2 justify-center min-h-screen ${
        videos.length == 0 ? "items-center" : ""
      }`}
    >
      {videos.length > 0 ? (
        videos.map((video) => <Card key={video._id} video={video} />)
      ) : (
        <div className="text-center text-light-text dark:text-dark-text">
          <p>No videos found.</p>
          <button
            className="mt-4 shadow px-4 py-2 bg-light-soft dark:bg-dark-soft text-light-text dark:text-dark-text rounded hover:bg-light-textSoft dark:hover:bg-dark-textSoft transition-all duration-200"
            onClick={() => navigate(-1)}
          >
            return
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
