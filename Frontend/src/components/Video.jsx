import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "./Comments.jsx";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "./axiosInstance.js";
import { dislike, fetchSuccess, like } from "../redux/videoSlice.js";
import { format } from "timeago.js";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { subscription } from "../redux/userSlice.js";
import Recommendation from "./Recommendation.jsx";
import { toast } from "react-toastify";

function Video() {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  //  to track if video is already viewed or not
  const [viewTrack, setViewTrack] = useState(false);

  const path = useLocation().pathname.split("/")[2]; //extract video ID from URL
  const [channel, setChannel] = useState({});

  // fetch video and channel info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.error("Error fetching video or channel:", err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  // to handle likes from frontend to backend
  const handleLike = async () => {
    if (!currentUser?._id) return;
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };
  // to handle dislikes from frontend to backend
  const handleDislike = async () => {
    if (!currentUser?._id) return;
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };
  //  handle subscription
  const handleSub = async () => {
    if (!currentUser?._id) return;
    // check if curren log in user have subscribed or not and decide which endpoint to use
    const isSubscribed = currentUser.subscribedUsers?.includes(channel._id);
    const endpoint = isSubscribed
      ? `/users/unsub/${channel._id}`
      : `/users/sub/${channel._id}`;

    try {
      await axios.put(endpoint);
      dispatch(subscription(channel._id));
      // to update subscriber count in ui immediately
      setChannel((prev) => ({
        ...prev,
        subscribers: isSubscribed ? prev.subscribers - 1 : prev.subscribers + 1,
      }));
    } catch (err) {
      toast.error("Log in to subscribe")
      console.error("Failed to update subscription", err);
    }
  };

  // to add view
  const handleTimeUpdate = async (e) => {
    const videoElement = e.target;
    // to find the video watch percentage
    const watchPercent =
      (videoElement.currentTime / videoElement.duration) * 100;
    // add view count of watch percentage is already 10%
    if (!viewTrack && watchPercent > 10) {
      try {
        await axios.put(`/videos/view/${currentVideo._id}`, {
          userId: currentUser._id,
        });
        setViewTrack(true);
      } catch (err) {
        console.error("Failed to update view", err);
      }
    }
  };

  if (!currentVideo) {
    return (
      <div className="text-center text-light-text dark:text-dark-text mt-10">
        Loading video...
      </div>
    );
  }

  return (
    <div className="flex gap-4 flex-col lg:flex-row px-1 mt-2 md:px-4">
      <div className="flex-[3] max-w-[700px] px-2 sm:px-4">
        {/* video section */}
        <div className="flex justify-center flex-col sm:px-4">
          <video
            src={currentVideo?.videoUrl}
            controls
            onTimeUpdate={handleTimeUpdate}
            className="max-h-[360px] w-full lg:max-w-[650px] object-contain rounded-2xl"
          ></video>

          <h1 className="text-lg font-normal mt-5 mb-[10px] text-light-text dark:text-dark-text capitalize">
            {currentVideo.title}
          </h1>
          {/* video view */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-light-textSoft dark:text-dark-textSoft">
              {currentVideo.views} views • {format(currentVideo.createdAt)}
            </span>
            {/* video like and dislike */}
            <div className="flex rounded-md sm:ml-28 md:ml-38 px-0.5 py-1 gap-2 text-light-text dark:text-dark-text border border-light-soft dark:border-dark-bgLighter">
              <button
                className="flex items-center cursor-pointer"
                onClick={handleLike}
              >
                {currentVideo.likes?.includes(currentUser?._id) ? (
                  <ThumbUpIcon fontSize="small" />
                ) : (
                  <ThumbUpOutlinedIcon fontSize="small" />
                )}
                {currentVideo.likes?.length}
              </button>
              <button
                className="flex items-center border-l pl-1 gap-1 cursor-pointer"
                onClick={handleDislike}
              >
                {currentVideo.dislikes?.includes(currentUser?._id) ? (
                  <ThumbDownIcon fontSize="small" />
                ) : (
                  <ThumbDownOffAltOutlinedIcon fontSize="small" />
                )}
                {currentVideo.dislikes?.length}
              </button>
            </div>
            {/* share and save button */}
            <div className="flex justify-between gap-4 mr-2 text-light-text dark:text-dark-text">
              <button className="cursor-pointer">
                <ReplyOutlinedIcon />
              </button>
              <button className="cursor-pointer">
                <AddTaskOutlinedIcon fontSize="small" />
              </button>
            </div>
          </div>
        </div>
        <hr className="my-6 mx-0 border border-light-soft dark:border-dark-soft" />
        {/* channel details */}
        <div className="flex justify-between">
          <div className="flex gap-5">
            <img src={channel.img} alt="" className="h-10 w-10 rounded-full" />
            <div className="flex flex-col text-light-text dark:text-dark-text">
              <Link to={`/channel/${currentVideo.userId}`}>
                <span className="font-medium text-sm capitalize">
                  {channel.name}
                </span>
              </Link>
              <span className="mt-1 mb-5 text-light-textSoft dark:text-light-textSoft text-xs">
                {channel.subscribers} subscribers
              </span>
              <p className="text-sm line-clamp-6">{currentVideo.description}</p>
            </div>
          </div>
          <button
            className="bg-red-700 text-xs sm:text-base font-medium text-white border-none rounded-md h-max py-2 px-4 cursor-pointer"
            onClick={handleSub}
          >
            {currentUser?.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </button>
        </div>
        <hr className="my-6 mx-0 border border-light-soft dark:border-dark-soft" />
        {/* comment section  */}
        <Comments videoId={currentVideo._id} />
      </div>

      <Recommendation tags={currentVideo.tags} />
    </div>
  );
}

export default Video;
