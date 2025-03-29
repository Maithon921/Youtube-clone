import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "./Comments";
import Card from "./Card.jsx";

function Video() {
  return (
    <div className="flex gap-4">
      <div className="flex-[5]">
        <div>
          <iframe
            // width="560"
            height="350"
            className="w-full"
            src="https://www.youtube.com/embed/wOpSqV9E7HY?si=wZZJLwrZww0Jr5Ms"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <h1 className="text-lg font-normal mt-5 mb-[10px] text-light-text dark:text-dark-text">
            Test Info
          </h1>
          <div className="flex items-center justify-between">
            <span className="text-light-textSoft dark:text-dark-textSoft">
              7,948,154 views • Jun 22, 2022
            </span>
            <div className="flex gap-5 text-light-text dark:text-dark-text">
              <button className="flex items-center gap-1 cursor-pointer">
                <ThumbUpOutlinedIcon />
                123
              </button>
              <button className="flex items-center gap-1 cursor-pointer">
                <ThumbDownOffAltOutlinedIcon />
                Dislike
              </button>
              <button className="flex items-center gap-1 cursor-pointer">
                <ReplyOutlinedIcon />
                Share
              </button>
              <button className="flex items-center gap-1 cursor-pointer">
                <AddTaskOutlinedIcon />
                Share
              </button>
            </div>
          </div>
        </div>
        <hr className="my-6 mx-0 border border-light-soft dark:border-dark-soft" />
        <div className="flex justify-between">
          <div className="flex gap-5">
            <img
              src="https://yt3.ggpht.com/ytc/AIdro_nY8bc9x99Pp803PZIdrczFbIaYvFp2nrBmDxqhUvVuuiM=s88-c-k-c0x00ffffff-no-rj"
              alt=""
              className="h-[50px] w-[50px] rounded-full"
            />
            <div className="flex flex-col text-light-text dark:text-dark-text">
              <span className="font-medium">Agogo vi</span>
              <span className="mt-1 mb-5 text-light-textSoft dark:text-light-textSoft text-xs">100k subscribers</span>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus tempore nesciunt fugit, quod vitae quisquam doloribus
                accusantium excepturi cum nemo. Alias harum laudantium id!
                Voluptatem quisquam at numquam laboriosam impedit?
              </p>
            </div>
          </div>
          <button className="bg-red-700 font-medium text-white border-none rounded-md h-max py-2 px-4  cursor-pointer">SUBSCRIBE</button>
        </div>
        <hr className="my-6 mx-0 border border-light-soft dark:border-dark-soft" />
        <Comments/>
      </div>

      <div className="flex-[2]">
        <Card type= "sm"/>
        <Card type= "sm"/>
        <Card type= "sm"/>
        <Card type= "sm"/>
        <Card type= "sm"/>
        <Card type= "sm"/>
        <Card type= "sm"/>
        <Card type= "sm"/>
        <Card type= "sm"/>
        <Card type= "sm"/>
        <Card type= "sm"/>
        <Card type= "sm"/>
      </div>
    </div>
  );
}

export default Video;
