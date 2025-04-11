import axios, { plainAxios } from "./axiosInstance.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AttachmentIcon from "@mui/icons-material/Attachment";

function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false); // tracking image upload state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // upload file to cloudinary and return url
  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    try {
      setUploadingImage(true); // to show user image is uploading
      const res = await plainAxios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        data
      );
      setUploadingImage(false); // done uploading
      return res.data.secure_url;
    } catch (err) {
      setUploadingImage(false);
      console.error("Image upload failed:", err);
      toast.error("Image upload failed.");
      return null;
    }
  };

  // hanling log in and saving token also setting the login user detail in redux
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { name, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      dispatch(loginSuccess(user));
      toast.success("Login successful", { position: "bottom-center" });
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
      toast.error("Login failed. Please check credentials.", {
        position: "bottom-center",
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    let imageUrl =
      "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-File.png"; // fallback if no image selected

    // if image is selected, upload it
    if (image) {
      const uploadedUrl = await uploadImageToCloudinary(image);
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    try {
      await axios.post("/auth/signup", {
        name,
        email,
        password,
        img: imageUrl,
      });
      toast.success("Signup successful. You can now log in.", {
        position: "bottom-center",
      });
    } catch (err) {
      toast.error("Signup failed. Try a different username/email.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center h-full mt-2 pb-5 text-light-text dark:text-dark-text px-4">
      <div className="flex flex-col bg-light-bgLighter dark:bg-dark-bgLighter py-5 px-5 border border-light-soft dark:border-dark-soft rounded-xl gap-3 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center">Sign In</h1>
        <h2 className="text-sm font-light text-center">
          to continue to ViewTube
        </h2>

        {/* Login input Fields */}
        <input
          type="text"
          placeholder="username"
          className="input-style"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="input-style pr-10"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute top-2.5 right-3 text-sm text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </div>
        <button className="btn-style" onClick={handleLogin}>
          Sign in
        </button>

        <h1 className="text-center text-sm text-light-textSoft dark:text-dark-textSoft">
          or
        </h1>

        {/* Signup Fields */}
        <input
          type="text"
          placeholder="username*"
          className="input-style"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email*"
          className="input-style"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password*"
            className="input-style pr-10"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute top-2.5 right-3 text-sm text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </div>

        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <AttachmentIcon />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
          Profile Image(optional)
        </label>

        {/* Button shows upload state if uploading */}
        <button
          className="btn-style"
          onClick={handleSignup}
          disabled={uploadingImage} // disable button if image uploading
        >
          {uploadingImage ? "Uploading..." : "Sign up"}
        </button>

        <div className="flex text-[10px] text-light-textSoft dark:text-dark-textSoft justify-center mt-3">
          <span>English</span>
          <span className="ml-4">Help</span>
          <span className="ml-4">Privacy</span>
          <span className="ml-4">Terms</span>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
