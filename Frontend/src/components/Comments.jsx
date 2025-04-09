// import { useEffect, useState } from "react";
// import Comment from "./Comment.jsx";
// import axios from "./axiosInstance.js";
// import { useSelector } from "react-redux";

// function Comments({ videoId }) {
//   const { currentUser } = useSelector((state) => state.user);
//   const [comments, setComments] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const res = await axios.get(`/comments/${videoId}`);
//         setComments(res.data);
//       } catch (err) {}
//     };
//     fetchComments();
//   }, [videoId]);

//   return (
//     <div>
//       <div className="flex flex-col gap-2 text-light-textSoft dark:text-dark-text">
//         <div className="flex items-center gap-2">
//           <img
//             src={currentUser.others.img}
//             className="w-10 h-9 rounded-full bg-[#999]"
//           />
//           <input
//             type="text"
//             placeholder="Add a comment..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="border-b border-light-soft dark:border-dark-soft bg-transparent outline-none p-1 w-full"
//           />
//         </div>
//         {input.trim() && (
//           <div className="flex justify-end">
//             <button className="text-sm px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">
//               Submit
//             </button>
//           </div>
//         )}
//       </div>

//       {comments.map((comment) => (
//         <Comment key={comment._id} comment={comment} />
//       ))}
//     </div>
//   );
// }

// export default Comments;

import { useEffect, useState } from "react";
import Comment from "./Comment.jsx";
import axios from "./axiosInstance.js";
import { useSelector } from "react-redux";

function Comments({ videoId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };
    fetchComments();
  }, [videoId]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    try {
      const res = await axios.post("/comments", {
        videoId,
        description: input.trim(),
      });
      setComments((prev) => [res.data, ...prev]);
      setInput("");
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  const handleDelete = (id)=>{
   setComments((prev) => prev.filter((comment) => comment._id !== id))
  }

  const handleEdit = (id, newDesc) =>{
    setComments((prev) => prev.map((comment) => (comment._id === id ? {...comment, description: newDesc}: comment)))
  }

  return (
    <div className="pb-8">
      <div className="flex flex-col gap-2 text-light-textSoft dark:text-dark-text">
        <div className="flex items-center gap-2">
          <img
            src={currentUser?.img || "/default-avatar.png"}
            className="w-10 h-9 rounded-full bg-[#999] object-cover"
            alt="user avatar"
          />
          <input
            type="text"
            placeholder="Add a comment..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-b border-light-soft dark:border-dark-soft bg-transparent outline-none p-1 w-full"
          />
        </div>
        {input.trim() && (
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="text-sm px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} onDelete={handleDelete}  onEdit={handleEdit}/>
      ))}
    </div>
  );
}

export default Comments;
