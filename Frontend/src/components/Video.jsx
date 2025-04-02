import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "./Comments.jsx";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "./axiosInstance.js";
import { dislike, fetchSuccess, like } from "../redux/videoSlice.js";
import { format } from "timeago.js";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { subscription } from "../redux/userSlice.js";
import Recommendation from "./Recommendation.jsx";

function Video() {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);

        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser.others._id));
  };
  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser.others._id));
  };

  const handleSub = async () => {
    currentUser.others.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  return (
    <div className="flex gap-4">
      <div className="flex-[5]">
        <div>
          <video
            src={currentVideo.videoUrl}
            className="max-h-[420px] w-full object-cover"
          ></video>
          <h1 className="text-lg font-normal mt-5 mb-[10px] text-light-text dark:text-dark-text">
            {currentVideo.title}
          </h1>
          <div className="flex items-center justify-between">
            <span className="text-light-textSoft dark:text-dark-textSoft">
              {currentVideo.views} views • {format(currentVideo.createdAt)}
            </span>
            <div className="flex gap-5 text-light-text dark:text-dark-text">
              <button
                className="flex items-center gap-1 cursor-pointer"
                onClick={handleLike}
              >
                {currentVideo.likes?.includes(currentUser.others._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
                )}
                {currentVideo.likes?.length}
              </button>
              <button
                className="flex items-center gap-1 cursor-pointer"
                onClick={handleDislike}
              >
                {currentVideo.dislikes.includes(currentUser.others._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOffAltOutlinedIcon />
                )}
                dislike
              </button>
              <button className="flex items-center gap-1 cursor-pointer">
                <ReplyOutlinedIcon />
                Share
              </button>
              <button className="flex items-center gap-1 cursor-pointer">
                <AddTaskOutlinedIcon />
                Save
              </button>
            </div>
          </div>
        </div>
        <hr className="my-6 mx-0 border border-light-soft dark:border-dark-soft" />
        <div className="flex justify-between">
          <div className="flex gap-5">
            <img
              src={channel.img}
              alt=""
              className="h-[50px] w-[50px] rounded-full"
            />
            <div className="flex flex-col text-light-text dark:text-dark-text">
              <span className="font-medium">{channel.name}</span>
              <span className="mt-1 mb-5 text-light-textSoft dark:text-light-textSoft text-xs">
                {channel.subscribers} subscribers
              </span>
              <p className="text-sm">{currentVideo.description}</p>
            </div>
          </div>
          <button
            className="bg-red-700 font-medium text-white border-none rounded-md h-max py-2 px-4  cursor-pointer"
            onClick={handleSub}
          >
            {currentUser.others.subscribedUsers.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </button>
        </div>
        <hr className="my-6 mx-0 border border-light-soft dark:border-dark-soft" />
        <Comments videoId={currentVideo._id} />
      </div>

      <Recommendation tags={currentVideo.tags}/>
    </div>
  );
}

export default Video;
