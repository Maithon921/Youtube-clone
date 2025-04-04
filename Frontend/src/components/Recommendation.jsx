import axios from "./axiosInstance.js";
import { useEffect, useState } from "react";
import Card from "./Card.jsx"

function Recommendation({tags}){
    const [videos, setVideos] = useState([]);

    useEffect(()=>{
        const fetchVideos = async ()=>{
            const res = await axios.get(`/videos/tags?tags=${tags}`);
            setVideos(res.data);
        };
        fetchVideos()

    },[tags])

    return (
        <div className="flex-[2]">
            {videos.map(video => (
                <Card type="sm" key={video._id} video={video}/>
            ))}
        </div>
    )
}

export default Recommendation;