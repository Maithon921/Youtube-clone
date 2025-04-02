import axios from "./axiosInstance.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {format} from "timeago.js";

function Card({ type, video }) {

  const [channel, setChannel] = useState({});

    useEffect(()=>{
        const fetchChannel = async()=>{
            const res = await axios.get(`/users/find/${video.userId}`);
            setChannel(res.data)
        }
        fetchChannel();
    },[video.userId])

  return (
    <Link to={`/video/${video._id}`}>
      <div
        className={`cursor-pointer gap-[10px] ${type !== "sm" ? "w-[360px] mb-[45px]" : "mb-[10px] flex"}`}>
        <img
          src={video.imgUrl}
          className={`w-full bg-[#999] flex-[1] ${type === "sm" ? "h-24" : "h-48"}`}
        />
        <div className={`flex gap-3 flex-[1] ${type === "sm" ? "mt-0" : "mt-4"}`}>
          <img
            src={channel.img}
            alt=""
            className={`w-9 h-9 rounded-full bg-[#999] ${type === "sm" && "hidden"}`}
          />
          <div>
            <h1 className="text-base font-medium text-light-text dark:text-dark-text">
              {video.title}
            </h1>
            <h2 className="text-sm text-light-textSoft dark:text-dark-textSoft my-2 mx-0">
              {channel.name}
            </h2>
            <div className="text-sm text-light-textSoft dark:text-dark-textSoft">
              {video.views} views • {format(video.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
