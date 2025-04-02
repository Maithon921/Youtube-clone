import { useEffect, useState } from "react"


function Upload({ setOpen }) {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPer, setImgPer] = useState(0);
  const [videoPer, setVideoPer] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);

  const handleTags= (e)=>{
    setTags(e.target.value.split(","));
  }

  const uploadFile = (file) => {
    
  }

  useEffect(()=>{
    uploadFile(video)
  }, [img])
  useEffect(()=>{
    uploadFile(img)
  }, [video])

  return (
    <div className="h-full w-full absolute top-0 left-0 bg-[#000000a7] flex justify-center items-center">
      <div className="w-[500px]  max-h-[600px] rounded-md bg-light-bgLighter relative dark:bg-dark-bgLighter text-light-text dark:text-dark-text p-5 flex flex-col gap-4">
        <div
          className="absolute top-1 right-2 cursor-pointer"
          onClick={() => setOpen(false)}
        >
          X
        </div>
        <h1 className="text-center">Upload a new Video</h1>
        <label htmlFor="" className="text-sm">
          Video:{" "}
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          className="border border-light-soft dark:border-dark-soft text-light-text dark:text-dark-text p-2 rounded bg-transparent"
        />
        <input
          type="text"
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
          className="border border-light-soft dark:border-dark-soft text-light-text dark:text-dark-text p-2 rounded bg-transparent"
        />
        <textarea
          placeholder="Description"
          rows={8}
          onChange={e => setDesc(e.target.value)}
          className="border border-light-soft dark:border-dark-soft text-light-text dark:text-dark-text p-2 rounded bg-transparent"
        ></textarea>
        <input
          type="text"
          placeholder="Seperate tags with commas"
          onChange={handleTags}
          className="border border-light-soft dark:border-dark-soft text-light-text dark:text-dark-text p-2 rounded bg-transparent"
        />
        <label htmlFor="" className="text-sm">
          Image:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setVideo(e.target.files[0])}
          className="border border-light-soft dark:border-dark-soft text-light-text dark:text-dark-text p-2 rounded bg-transparent"
        />
        <button className="rounded border-none py-2 px-5 font-medium cursor-pointer bg-light-soft dark:bg-dark-soft text-light-textSoft dark:text-dark-textSoft">
          {" "}
          Upload
        </button>
      </div>
    </div>
  );
}

export default Upload;
