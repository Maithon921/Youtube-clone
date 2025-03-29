function Comment() {
  return (
    <div className="flex gap-2 my-7 mx-0">
      <img
        src="https://yt3.ggpht.com/ytc/AIdro_nY8bc9x99Pp803PZIdrczFbIaYvFp2nrBmDxqhUvVuuiM=s88-c-k-c0x00ffffff-no-rj"
        alt=""
        className="h-[50px] w-[50px] rounded-full"
      />
      <div className="flex flex-col gap-2 text-light-text dark:text-dark-text">
        <span className="text-[13px] font-medium">
          John Doe <span className="text-xs font-normal text-light-textSoft dark:text-dark-textSoft ml-1">1 day ago</span>
        </span>
        <span className="text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde nostrum
          eos vitae debitis error ex praesentium neque excepturi delectus
          accusamus, velit incidunt reiciendis voluptatibus deleniti in! Minus,
          aut. Quisquam, error.
        </span>
      </div>
    </div>
  );
}

export default Comment;
