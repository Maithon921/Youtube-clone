import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "./axiosInstance.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { plainAxios } from "./axiosInstance.js";
import axiosInstance from "./axiosInstance.js";

function Upload({ setOpen }) {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgProgress, setImgProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");

  const [imgUrl, setImgUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imgPublicId, setImgPublicId] = useState("");
  const [videoPublicId, setVideoPublicId] = useState("");

  const resetForm = () => {
    setImg(undefined);
    setVideo(undefined);
    setImgProgress(0);
    setVideoProgress(0);
    setTitle("");
    setDesc("");
    setTags([]);
    setCategory("");
    setImgUrl("");
    setVideoUrl("");
    setImgPublicId("");
    setVideoPublicId("");
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, type) => {
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ViewTube");
    data.append("cloud_name", "drbk4qx0n");

    const url = `https://api.cloudinary.com/v1_1/drbk4qx0n/${type === "video" ? "video" : "image"}/upload`;

    const config = {
      onUploadProgress: (e) => {
        const percent = Math.round((e.loaded * 100) / e.total);
        type === "video" ? setVideoProgress(percent) : setImgProgress(percent);
      },
    };

    plainAxios
      .post(url, data, config)
      .then((res) => {
        if (type === "video") {
          setVideoUrl(res.data.secure_url);
          setVideoPublicId(res.data.public_id);
        } else {
          setImgUrl(res.data.secure_url);
          setImgPublicId(res.data.public_id);
        }
      })
      .catch((err) => {
        console.error("Cloudinary upload error", err);
        toast.error(`Failed to upload ${type}`);
      });
  };

  useEffect(() => {
    if (video) uploadFile(video, "video");
  }, [video]);

  useEffect(() => {
    if (img) uploadFile(img, "image");
  }, [img]);

  const handleUpload = async () => {
    if (!title || !desc || !imgUrl || !videoUrl) {
      toast.error("Please fill all fields and wait for uploads to complete.");
      return;
    }

    try {
       await axiosInstance.post("/videos", {
        title,
        description: desc,
        imgUrl,
        videoUrl,
        imgPublicId,
        videoPublicId,
        tags,
        category,
      });


      toast.success("Video uploaded successfully!");
      setTimeout(() => {
        setOpen(false);
        resetForm();
      }, 2000);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed. Try again.");
    }
  };

  return (
    <>
      <div
        className="min-h-dvh w-full mt-7 z-20 absolute top-0 left-0 bg-[#000000a7] flex justify-center items-center"
        onClick={() => {
          setOpen(false);
          resetForm();
        }}
      >
        <div
          className="w-[280px] sm:w-[350px] md:w-[450px] max-h-[600px] overflow-y-auto rounded-md bg-light-bgLighter relative dark:bg-dark-bgLighter text-light-text dark:text-dark-text p-5 flex flex-col gap-3 text-xs sm:text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-1 right-2 cursor-pointer" onClick={() => { setOpen(false); resetForm(); }}>
            <CloseIcon />
          </div>
          <h1 className="text-center text-base font-semibold">Upload a new Video</h1>

          <label>Video:</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="border border-light-soft dark:border-dark-soft p-2 rounded bg-transparent"
          />
          {videoProgress > 0 && (
            <div className="mb-1">
              <div className="w-full h-2 bg-gray-300 rounded overflow-hidden mb-1">
                <div className="h-full bg-red-500" style={{ width: `${videoProgress}%` }} />
              </div>
              <p className="text-xs text-red-500 text-right">
                {videoProgress < 100 ? `${videoProgress}%` : "Uploaded"}
              </p>
            </div>
          )}


          <label>Thumbnail Image </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
            className="border border-light-soft dark:border-dark-soft p-2 rounded bg-transparent"
          />
          {imgProgress > 0 && (
            <div className="mb-1">
              <div className="w-full h-2 bg-gray-300 rounded overflow-hidden mb-1">
                <div className="h-full bg-blue-500" style={{ width: `${imgProgress}%` }} />
              </div>
              <p className="text-xs text-blue-500 text-right">
                {imgProgress < 100 ? `${imgProgress}%` : "Uploaded"}
              </p>
            </div>
          )}

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-light-soft dark:border-dark-soft p-2 rounded bg-transparent"
          />
          <textarea
            placeholder="Description"
            rows={5}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border border-light-soft dark:border-dark-soft p-2 rounded bg-transparent"
          ></textarea>
          <input
            type="text"
            placeholder="Separate tags with commas"
            onChange={handleTags}
            className="border border-light-soft dark:border-dark-soft p-2 rounded bg-transparent"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-light-soft dark:border-dark-soft p-2 rounded bg-transparent"
          />

          <button
            onClick={handleUpload}
            className="rounded border-none py-2 px-5 font-medium cursor-pointer bg-light-soft dark:bg-dark-soft text-light-textSoft dark:text-dark-textSoft"
          >
            Upload
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
}

export default Upload;
