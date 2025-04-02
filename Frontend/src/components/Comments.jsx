import { useEffect, useState } from "react";
import Comment from "./Comment.jsx";
import axios from "./axiosInstance.js";
import { useSelector } from "react-redux";

function Comments({ videoId }) {

  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  return (
    <div>
      <div className="flex items-center gap-2">
        <img src={currentUser.others.img}  className="w-10 h-10 rounded-full bg-[#999]"/> 
        <input
          type="text"
          placeholder="Add a comment......"
          className=" border-b border-light-soft dark:border-dark-soft bg-transparent  outline-none p-1 w-full"
        />
      </div>
      
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

export default Comments;
