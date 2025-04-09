// import axios from "axios";
// import { useEffect, useRef, useState } from "react";
// import { format } from "timeago.js";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

// function Comment({ comment }) {
//   const [channel, setChannel] = useState({});
//   const [isMore, setIsMore] = useState(false);
//   const ref = useRef();

//   useEffect(() => {
//     const fetchComment = async () => {
//       const res = await axios.get(`/users/find/${comment.userId}`);
//       setChannel(res.data);
//     };
//     fetchComment();
//   }, [comment.userId]);

//   useEffect(() => {
//     const close = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) {
//         setIsMore(false);
//       }
//     };
//     document.addEventListener("click", close);
//     return () => document.removeEventListener("click", close);
//   }, []);

//   return (
//     <div className="flex justify-between gap-2 my-7 mx-0 relative" >
//       <div className="flex gap-2">
//         <img src={channel.img} className="h-8 w-8 rounded-full" />
//         <div className="flex flex-col gap-2 text-light-text dark:text-dark-text">
//           <span className="text-[13px] font-medium">
//             {channel.name}{" "}
//             <span className="text-xs font-normal text-light-textSoft dark:text-dark-textSoft ml-1">
//               {format(channel.createdAt)}
//             </span>
//           </span>
//           <span className="text-sm">{comment.description}</span>
//         </div>
//       </div>
//       <div className="relative text-light-text dark:text-dark-text" ref={ref}>
//         <MoreVertIcon
//           onClick={() => setIsMore((prev) => !prev)}
//           className="cursor-pointer"
//         />
//         {isMore && (
//           <div className="absolute right-0 top-6 z-10 text-light-text dark:text-dark-text bg-white dark:bg-dark-bgLighter shadow-md rounded-md text-sm p-2 w-28">
//             <button
//               // onClick={}
//               className="block w-full text-left px-3 py-1 hover:bg-gray-200 dark:hover:bg-dark-soft rounded"
//             >
//               Edit
//             </button>
//             <button
//               // onClick={}
//               className="block w-full text-left px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-dark-soft"
//             >
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Comment;

import axios from "./axiosInstance.js";
import { useEffect, useRef, useState } from "react";
import { format } from "timeago.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Comment({ comment, onDelete, onEdit }) {
  const [channel, setChannel] = useState(null);
  const [isMore, setIsMore] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.description);
  const ref = useRef();

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(`users/find/${comment.userId}`);
        setChannel(res.data);
      } catch (err) {
        console.error("Failed to fetch comment user:", err);
      }
    };
    fetchComment();
  }, [comment.userId]);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsMore(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/comments/${comment._id}`);
      onDelete(comment._id);
    } catch (err) {
      console.log("Failed to delete comment", err);
    }
  };

  const handleEdit = async () => {
    try {
      const res = await axios.put(`/comments/edit/${comment._id}`, {
        description: editText.trim(),
      });
      onEdit(comment._id, res.data.description);
      setEditing(false);
    } catch (err) {
      console.log("Failed to edit comment", err);
    }
  };

  const handleCancel = () => {
    setEditText(comment.description); // reset to original
    setEditing(false);
  };

  return (
    <div className="flex justify-between gap-2 my-7 mx-0 relative">
      <div className="flex gap-2 w-full">
        <img
          src={channel?.img || "/default-avatar.png"}
          className="h-8 w-8 rounded-full object-cover"
          alt="user"
        />
        <div className="flex flex-col gap-1 text-light-text dark:text-dark-text w-full">
          <span className="text-[13px] font-medium capitalize">
            {channel?.name || "Unknown User"}{" "}
            <span className="text-xs font-normal text-light-textSoft dark:text-dark-textSoft ml-1">
              {comment?.createdAt ? format(comment.createdAt) : ""}
            </span>
          </span>

          {editing ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border-b border-light-text dark:border-dark-soft p-1 text-sm bg-transparent outline-none"
              />
              <div className="flex gap-2 mt-1">
                <button
                  onClick={handleEdit}
                  className="text-sm px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="text-sm px-2 py-1 rounded bg-gray-400 text-white hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <span className="text-sm">{comment.description}</span>
          )}
        </div>
      </div>

      <div className="relative text-light-text dark:text-dark-text" ref={ref}>
        <MoreVertIcon
          onClick={() => setIsMore((prev) => !prev)}
          className="cursor-pointer"
        />
        {isMore && (
          <div className="absolute right-0 top-6 z-10 text-light-text dark:text-dark-text bg-white dark:bg-dark-bgLighter shadow-md rounded-md text-sm p-2 w-28">
            <button
              onClick={() => {
                setEditing(true);
                setIsMore(false);
              }}
              className="block w-full text-left px-3 py-1 hover:bg-gray-200 dark:hover:bg-dark-soft rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="block w-full text-left px-3 py-1 hover:bg-gray-200 dark:hover:bg-dark-soft rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
