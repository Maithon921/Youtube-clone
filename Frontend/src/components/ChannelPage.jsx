import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./axiosInstance";
import Card from "./Card.jsx";
import { useDispatch, useSelector } from "react-redux";
import { subscription } from "../redux/userSlice.js";
import EditVideoModal from "./EditVideo.jsx";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChannelPage() {
  const { id } = useParams();
  const [channel, setChannel] = useState({});
  const [videos, setVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // to get channel/user and its video
  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelRes = await axios.get(`/users/find/${id}`);
        setChannel(channelRes.data);

        const videoRes = await axios.get(`/videos/user/${id}`);
        setVideos(videoRes.data);
      } catch (err) {
        console.log("Failed to get user", err);
      }
    };
    fetchData();
  }, [id]);

  //  to handle subscription
  const handleSub = async () => {
    // return if user is not log in
    if (!currentUser?._id) return;
    // checks if current user is subscribed to the channel or not decide the api call
    const isSubscribed = currentUser.subscribedUsers?.includes(channel._id);
    const endpoint = isSubscribed
      ? `/users/unsub/${channel._id}`
      : `/users/sub/${channel._id}`;
    try {
      await axios.put(endpoint);
      dispatch(subscription(channel._id));
      // to update ui subscriber count immediately
      setChannel((prev) => ({
        ...prev,
        subscribers: isSubscribed ? prev.subscribers - 1 : prev.subscribers + 1,
      }));
    } catch (err) {
      console.error("Failed to update subscription", err);
    }
  };

  // checks if current user of the visited channel
  const isOwner = currentUser?._id === channel?._id;

  // to open edit modal and send the selected video to the modal
  const handleEdit = (video) => {
    setSelectedVideo(video);
    setIsEditing(true);
  };

  //  handling deleting the video if the log in user is the owner
  const handleDelete = async (videoId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`/videos/${videoId}`);
      // to update ui immediately
      setVideos((prev) => prev.filter((v) => v._id !== videoId));
      toast.success("Video deleted successfully", {
        position: "bottom-center",
      });
    } catch (err) {
      console.error("Failed to delete video", err);
      toast.error("Failed to delete video", { position: "bottom-center" });
    }
  };

  // taking the new data updated from edit modal and setting it in ui
  const updateLocalVideo = (updated) => {
    setVideos((prev) => prev.map((v) => (v._id === updated._id ? updated : v)));
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text px-4 sm:px-8 pt-6 pb-10">
      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={channel?.img}
            alt="Channel"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{channel.name}</h2>
            <p className="text-xs sm:text-sm">{channel.email}</p>
            <p className="text-sm text-light-textSoft dark:text-dark-textSoft">
              {channel.subscribers} subscribers • {videos.length} videos
            </p>
          </div>
        </div>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"
          onClick={handleSub}
        >
          {currentUser?.subscribedUsers?.includes(channel._id)
            ? "SUBSCRIBED"
            : "SUBSCRIBE"}
        </button>
      </div>

      <p>Videos</p>
      <hr className="border-light-soft dark:border-dark-soft mb-6" />

      <div className="flex flex-wrap gap-4 justify-center sm:justify-start min-h-[200px]">
        {/* render videos but diplay text if not available */}
        {videos.length === 0 ? (
          <div className="w-full text-center mt-20">
            <p className="text-xl font-medium text-light-textSoft dark:text-dark-textSoft">
              No videos yet.
            </p>
            <p className="text-sm text-light-textSoft dark:text-dark-textSoft mt-2">
              When this channel uploads, you will see their content here.
            </p>
          </div>
        ) : (
          videos.map((video) => (
            <div key={video._id} className="relative flex flex-wrap">
              <Card video={video} />
              {/* to allow edit and delete if the channel belongs to the log in user */}
              {isOwner && (
                <div className="absolute top-1 right-1 flex gap-1">
                  <button
                    onClick={() => handleEdit(video)}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {/* open edit modal when video to delete is selected */}
      {isEditing && selectedVideo && (
        <EditVideoModal
          video={selectedVideo}
          setIsEditing={setIsEditing}
          onUpdate={updateLocalVideo}
        />
      )}
    </div>
  );
}

export default ChannelPage;
