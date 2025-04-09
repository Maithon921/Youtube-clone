import axios from "./axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

function DeleteAccountModal({ setOpen }) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${currentUser._id}`);
      dispatch(logout());
      toast.success("Account deleted successfully");
      navigate("/");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-dark-bg text-black dark:text-white w-11/12 max-w-sm rounded-lg p-6 relative">
        <CloseIcon
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => setOpen(false)}
        />
        <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
        <p className="mb-6">
          Are you sure you want to delete your account? This action is permanent and cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dark-soft"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;
