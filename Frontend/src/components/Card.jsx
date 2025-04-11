import axios from "./axiosInstance.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

function Card({ type, video }) {
  const [channel, setChannel] = useState({});

  // get the channel details of the owner of the video
  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  // using type passed to design either to use in small or big screen
  return (
    <Link
      to={`/video/${video._id}`}
      className={`${
        type === "sm"
          ? "w-full flex gap-3 mb-4"
          : "w-[300px] sm:w-[310px] md:w-[320px] lg:w-[320px] mb-6"
      }`}
    >
      <div
        className={`${type === "sm" ? "flex gap-3" : "flex flex-col gap-3"}`}
      >
        {/* Thumbnail */}
        <img
          src={video.imgUrl}
          alt="thumbnail"
          className={`${
            type === "sm"
              ? "w-48 h-28 sm:w-52 sm:h-32 object-cover rounded-lg"
              : "w-full h-[180px] object-cover rounded-xl"
          } bg-[#999]`}
        />

        {/* Video Info */}
        <div className="flex gap-3">
          {!type && (
            <img
              src={channel.img}
              alt="channel"
              className="w-9 h-9 rounded-full bg-[#999] object-cover"
            />
          )}
          <div className="flex flex-col justify-between h-[72px] overflow-hidden">
            <h1 className="text-sm font-medium capitalize text-light-text dark:text-dark-text leading-tight line-clamp-2">
              {video.title}
            </h1>
            <h2 className="capitalize text-xs text-light-textSoft dark:text-dark-textSoft">
              {channel.name}
            </h2>
            <p className="text-xs text-light-textSoft dark:text-dark-textSoft">
              {video.views} views • {format(video.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
