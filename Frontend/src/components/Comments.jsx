import Comment from "./Comment";

function Comments(){
    return(
        <div>
            <div className="flex items-center gap-2">
                <img src="https://yt3.ggpht.com/ytc/AIdro_nY8bc9x99Pp803PZIdrczFbIaYvFp2nrBmDxqhUvVuuiM=s88-c-k-c0x00ffffff-no-rj" alt="" className="h-[50px] w-[50px] rounded-full"/>
                <input type="text" placeholder="Add a comment......" className=" border-b border-light-soft dark:border-dark-soft bg-transparent  outline-none p-1 w-full" />
            </div>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
        </div>
    )
}

export default Comments;