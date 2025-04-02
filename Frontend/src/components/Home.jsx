import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import axios from "./axiosInstance.js"

function Home({type}){
    const [videos, setVideos] = useState([]);

    useEffect(()=>{
        const fetchVideos = async()=>{
            const res = await axios.get(`/videos/${type}`);
            setVideos(res.data)
        }
        fetchVideos();
    },[type])

    return(
        <div className="flex justify-between flex-wrap">
            {videos.map((video) => (<Card key={video._id} video={video}/>))}
        </div>
    )
}

export default Home;