import axios from "./axiosInstance.js";
import { useEffect, useState } from "react";
import Card from "./Card.jsx";

function Recommendation({ tags }) {
  const [videos, setVideos] = useState([]);

  // fetch videos by tag
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Use tag to fetch if tags exist, otherwise fallback to random
        const res = tags?.length
          ? await axios.get(`/videos/tags?tags=${tags}`)
          : await axios.get(`/videos/random`);
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch recommended videos:", err);
      }
    };
    fetchVideos();
  }, [tags]);

  return (
    <div className="flex-[2] px-2">
      {videos.length ? (
        videos.map((video) => <Card type="sm" key={video._id} video={video} />)
      ) : (
        <p className="text-light-text dark:text-dark-text text-sm mt-4">
          No recommended videos available.
        </p>
      )}
    </div>
  );
}

export default Recommendation;
