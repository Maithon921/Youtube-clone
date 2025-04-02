import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

function Comment({comment}) {

  const [channel, setChannel] = useState({});


  useEffect(()=>{
    const fetchComment = async()=> {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data)
    };
    fetchComment();
  },[comment.userId])

  return (
    
    <div className="flex gap-2 my-7 mx-0">
      <img
        src={channel.img}
    
        className="h-10 w-10 rounded-full"
      />
      <div className="flex flex-col gap-2 text-light-text dark:text-dark-text">
        <span className="text-[13px] font-medium">
          {channel.name} <span className="text-xs font-normal text-light-textSoft dark:text-dark-textSoft ml-1">{format(channel.createdAt)}</span>
        </span>
        <span className="text-sm">
          {comment.description}
        </span>
      </div>
    </div>
  );
}

export default Comment;
