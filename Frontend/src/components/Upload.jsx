import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { plainAxios } from "./axiosInstance.js";
import axiosInstance from "./axiosInstance.js";

function Upload({ setOpen }) {
  // form states  to handle form values locally
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgProgress, setImgProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  //states to store cloudinary url and publicId
  const [imgUrl, setImgUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imgPublicId, setImgPublicId] = useState("");
  const [videoPublicId, setVideoPublicId] = useState("");

  // reset the form when submited or when modal is closed without submitting
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

  // converts tags string to array by comma
  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  // handles file uploading for either image or video to cloudinary
  const uploadFile = (file, type) => {
    if (!file) return;

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

  // start upload as soon as file is selected
  useEffect(() => {
    if (video) uploadFile(video, "video");
  }, [video]);

  useEffect(() => {
    if (img) uploadFile(img, "image");
  }, [img]);

  // to make sure all necessary feilds are filled
  const handleUpload = async () => {
    if (!title || !desc || !imgUrl || !videoUrl) {
      toast.error("Please fill all fields and wait for uploads to complete.");
      return;
    }

    // sends data to backend
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
      // close form and resets from after short delay
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

      <div
        className="fixed inset-0 w-full top-14 z-20 bg-[#000000a7] flex justify-center items-center"
        onClick={() => {
          setOpen(false);
          resetForm();
        }}
      >
        {/* modal container */}
        <div
          className="w-[280px] sm:w-[350px] md:w-[450px] max-h-[600px] overflow-y-auto rounded-md bg-light-bgLighter relative dark:bg-dark-bgLighter text-light-text dark:text-dark-text p-5 flex flex-col gap-3 text-xs sm:text-sm"
          onClick={(e) => e.stopPropagation()} // prevents modal from closing when clicking inside
        >
          {/* close icon */}
          <div
            className="absolute top-1 right-2 cursor-pointer"
            onClick={() => {
              setOpen(false);
              resetForm();
            }}
          >
            <CloseIcon />
          </div>
          <h1 className="text-center text-base font-semibold">
            Upload a new Video
          </h1>

          {/* video input */}
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
                <div
                  className="h-full bg-red-500"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>
              <p className="text-xs text-red-500 text-right">
                {videoProgress < 100 ? `${videoProgress}%` : "Uploaded"}
              </p>
            </div>
          )}

          {/* image input */}
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
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${imgProgress}%` }}
                />
              </div>
              <p className="text-xs text-blue-500 text-right">
                {imgProgress < 100 ? `${imgProgress}%` : "Uploaded"}
              </p>
            </div>
          )}
          {/* text inputs */}
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
          {/* upload button */}
          <button
            onClick={handleUpload}
            className="rounded border-none py-2 px-5 font-medium cursor-pointer bg-light-soft dark:bg-dark-soft text-light-textSoft dark:text-dark-textSoft"
          >
            Upload
          </button>
        </div>
      </div>
  );
}

export default Upload;
