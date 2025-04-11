import { useState } from "react";
import axios from "./axiosInstance.js";
import { plainAxios } from "./axiosInstance.js";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditAccountModal({ setOpen }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  // state for input image and form
  const [inputs, setInputs] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState(currentUser.img);
  const [loading, setLoading] = useState(false);

  // upload file to cloudinary and return a URL
  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    const res = await plainAxios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      data
    );
    return res.data.secure_url;
  };

  // handles form submission
  const handleUpdate = async () => {
    setLoading(true);
    try {
      let imgUrl = currentUser.img;
      // upload image if user have uploaded
      if (imgFile) {
        imgUrl = await uploadToCloudinary(imgFile);
      }

      // update the user info in backend
      const res = await axios.put(`/users/${currentUser._id}`, {
        ...inputs,
        img: imgUrl,
      });
      // update the user detail in redux
      dispatch(updateUser(res.data));
      toast.success("Account updated!");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    } finally {
      setLoading(false);
    }
  };

  // hanling the file uploaded by selecting
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
    // provides uploaded image for preview
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center px-4">
      <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        {/* close modal section */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
        >
          <CloseIcon />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Edit Account</h2>

        {/* Image preview */}
        <div className="flex justify-center mb-4">
          <img
            src={preview}
            alt="Profile Preview"
            className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 dark:border-dark-soft"
          />
        </div>
        {/* input field section */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-dark-soft bg-transparent outline-none"
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-dark-soft bg-transparent outline-none"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
          />
        </div>
        {/* submi button */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full mt-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
}

export default EditAccountModal;
