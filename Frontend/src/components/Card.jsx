import { Link } from "react-router-dom";

function Card({ type }) {
  return (
    <Link to="/video/test">
      <div
        className={`cursor-pointer gap-[10px] ${type !== "sm" ? "w-[360px] mb-[45px]" : "mb-[10px] flex"}`}>
        <img
          src="https://i.ytimg.com/vi/k3Vfj-e1Ma4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDp5u6Sz2mZVNr-iNJKq5cL4x4RVw"
          className={`w-full bg-[#999] flex-[1] ${type === "sm" ? "h-24" : "h-48"}`}
        />
        <div className={`flex gap-3 flex-[1] ${type === "sm" ? "mt-0" : "mt-4"}`}>
          <img
            src="https://yt3.googleusercontent.com/ytc/AIdro_luF-nK_BZqKzocE3qJoPsgRpL88k9zVsyUsZc3evTj8w=s160-c-k-c0x00ffffff-no-rj"
            alt=""
            className={`w-9 h-9 rounded-full bg-[#999] ${type === "sm" && "hidden"}`}
          />
          <div>
            <h1 className="text-base font-medium text-light-text dark:text-dark-text">
              Test Video
            </h1>
            <h2 className="text-sm text-light-textSoft dark:text-dark-textSoft my-2 mx-0">
              Lama Dev
            </h2>
            <div className="text-sm text-light-textSoft dark:text-dark-textSoft">
              660,908 views • 1 day ago
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
