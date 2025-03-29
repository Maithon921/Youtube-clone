import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sticky top-0 bg-light-bgLighter dark:bg-dark-bgLighter h-14">
      <div className="flex items-center h-full py-0 px-5 justify-end relative">
        <div className="w-2/5 absolute left-0 right-0 m-auto flex items-center justify-between p-1 border border-gray-300 rounded-2xl">
          <input type="text" placeholder="Search" className="border-0 bg-transparent w-full outline-none"/>
          <SearchOutlinedIcon/>
        </div>
        <Link to="signin">
        <button className="py-1 px-1 bg-transparent border border-blue-600 text-blue-600 rounded font-medium cursor-pointer flex justify-center items-center gap-1">
              <AccountCircleOutlinedIcon/>SIGN IN</button>
        </Link>
      </div>
    
    </div>
  );
}


export default Navbar;