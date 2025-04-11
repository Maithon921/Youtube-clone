import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios, { plainAxios } from "./axiosInstance";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditVideoModal({ video, setIsEditing, onUpdate }) {
  // sates to handle input forms value and file uploads locally
  const [img, setImg] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imgProgress, setImgProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [title, setTitle] = useState(video.title);
  const [desc, setDesc] = useState(video.description);
  const [tags, setTags] = useState(video.tags.join(","));
  const [category, setCategory] = useState("");

  // store updated cloudinary file urls after uploading it
  const [imgUrl, setImgUrl] = useState(video.imgUrl);
  const [videoUrl, setVideoUrl] = useState(video.videoUrl);

  // handles file uploads for both image and video, also tracks the upload progress
  const handleUpload = async (file, type) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    const url = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/${type === "video" ? "video" : "image"}/upload`;

    const config = {
      onUploadProgress: (e) => {
        const percent = Math.round((e.loaded * 100) / e.total);
        type === "video" ? setVideoProgress(percent) : setImgProgress(percent);
      },
    };

    try {
      const res = await plainAxios.post(url, data, config);
      return res.data.secure_url;
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error(`Failed to upload ${type}`);
      return null;
    }
  };

  // to upload the file immediately when selected
  useEffect(() => {
    if (img) {
      uploadAndSetUrl(img, "image");
    }
  }, [img]);

  useEffect(() => {
    if (videoFile) {
      uploadAndSetUrl(videoFile, "video");
    }
  }, [videoFile]);

  // uploading the file and sets the url to corresponding state
  const uploadAndSetUrl = async (file, type) => {
    const url = await handleUpload(file, type);
    if (url) {
      type === "video" ? setVideoUrl(url) : setImgUrl(url);
    }
  };

  // saves data to backend and update ui
  const handleSave = async () => {
    try {
      const payload = {
        title,
        description: desc,
        imgUrl,
        videoUrl,
        tags: tags.split(",").map((tag) => tag.trim()),
        category,
      };

      const res = await axios.put(`/videos/${video._id}`, payload);
      toast.success("Video updated!");
      onUpdate(res.data); // update data and ui in parent
      setTimeout(() => setIsEditing(false), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
      onClick={() => setIsEditing(false)} // Close modal when clicked outside of the main moddal
    >
      <div
        className="bg-light-bgLighter space-y-3 dark:bg-dark-bgLighter p-6 rounded w-[90%] sm:w-[450px] max-h-[90vh] overflow-y-auto text-sm"
        onClick={(e) => e.stopPropagation()} //prevents modal close whn clicked inside thhe container
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Video</h2>
          <CloseIcon
            className="cursor-pointer"
            onClick={() => setIsEditing(false)}
          />
        </div>
        {/* upload new video details optionally */}
        <label>Video File (optional): </label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
        {videoProgress > 0 && (
          <div className="w-full bg-gray-300 h-2 rounded mt-1 mb-2">
            <div
              className="bg-red-600 h-full"
              style={{ width: `${videoProgress}%` }}
            />
          </div>
        )}

        <label>Thumbnail(optional): </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />
        {imgProgress > 0 && (
          <div className="w-full bg-gray-300 h-2 rounded mt-1 mb-2">
            <div
              className="bg-blue-600 h-full"
              style={{ width: `${imgProgress}%` }}
            />
          </div>
        )}

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 mt-2 border rounded bg-transparent"
        />

        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          rows={4}
          className="w-full p-2 mt-2 border rounded bg-transparent"
        />

        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="w-full p-2 mt-2 border rounded bg-transparent"
        />

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category(one Category)"
          className="w-full p-2 mt-2 border rounded bg-transparent"
        />
        {/* submit button */}
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditVideoModal;
