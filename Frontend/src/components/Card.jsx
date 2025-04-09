// import axios from "./axiosInstance.js";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {format} from "timeago.js";

// function Card({ type, video }) {

//   const [channel, setChannel] = useState({});

//     useEffect(()=>{
//         const fetchChannel = async()=>{
//             const res = await axios.get(`/users/find/${video.userId}`);
//             setChannel(res.data)
//         }
//         fetchChannel();
//     },[video.userId])

//   return (
//     <Link to={`/video/${video._id}`} className="mb-12 " >
//       <div
//         className={`cursor-pointer ${type !== "sm" ? "min-w-[300px] max-w-[600px] max-h-[250px] " : "mb-2 gap-2 flex"}`}>
//         <img
//           src={video.imgUrl}
//           className={`w-full border-none rounded bg-[#999] flex-[1] ${type === "sm" ? "h-20 sm:h-24 max-w-48 " : "h-48"}`}
//         />
//         <div className={`flex gap-3 flex-[1] ${type === "sm" ? "mt-0" : "mt-2"}`}>
//           <img
//             src={channel.img}
//             alt=""
//             className={`w-8 h-8 rounded-full bg-[#999] ${type === "sm" && "hidden"}`}
//           />
//           <div>
//             <h1 className={`text-sm font-medium text-light-text dark:text-dark-text ${type === "sm" ? "truncate w-40" : "truncate w-64"}`}>
//               {video.title}
//             </h1>
//             <h2 className="text-sm text-light-textSoft dark:text-dark-textSoft  mx-0">
//               {channel.name}
//             </h2>
//             <div className="text-sm text-light-textSoft dark:text-dark-textSoft">
//               {video.views} views • {format(video.createdAt)}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default Card;


import axios from "./axiosInstance.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

function Card({ type, video }) {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Link
      to={`/video/${video._id}`}
      className={`${
        type === "sm"
          ? "w-full max-w-full flex gap-3 mb-4"
          : "w-[300px] sm:w-[320px] md:w-[340px] mb-6 px-1"
      }`}
    >
      <div className={`${type === "sm" ? "flex gap-3" : "flex flex-col gap-3"}`}>
        <img
          src={video.imgUrl}
          alt="thumbnail"
          className={`${
            type === "sm"
              ? "w-48 h-28 sm:w-52 sm:h-32 object-cover rounded-lg flex-shrink-0"
              : "w-full h-48 sm:h-52 object-cover rounded-xl"
          } bg-[#999]`}
        />
        <div className={`${type === "sm" ? "flex flex-col justify-between" : "flex gap-3"}`}>
          {type !== "sm" && (
            <img
              src={channel.img}
              alt="channel"
              className="w-9 h-9 rounded-full bg-[#999] object-cover"
            />
          )}
          <div>
            <h1
              className={`text-sm capitalize font-medium text-light-text dark:text-dark-text ${
                type === "sm" ? "line-clamp-2" : "line-clamp-2"
              }`}
            >
              {video.title}
            </h1>
            <h2 className="capitalize text-xs text-light-textSoft dark:text-dark-textSoft">
              {channel.name}
            </h2>
            <p className="text-xs text-light-textSoft dark:text-dark-textSoft">
              {video.views} views • {format(video.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
