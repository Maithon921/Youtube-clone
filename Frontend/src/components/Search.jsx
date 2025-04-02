import { useLocation } from "react-router-dom";
import axios from "./axiosInstance.js";
import { useEffect, useState } from "react";
import Card from "./Card.jsx";

function Search(){
    const query = useLocation().search
    const [videos, setVideos] = useState([]);

    useEffect(()=>{
        const fetchVideos = async ()=>{
            const res = await axios.get(`/videos/search${query}`)
            setVideos(res.data);
        };
        fetchVideos()
    },[query])

    return(
        <div className="flex flex-wrap gap-2">
            {videos.map(video=> (
                <Card key={video._id} video={video}/>
            ))}
        </div>
    )
}

export default Search;