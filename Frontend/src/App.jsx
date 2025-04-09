// import { useState } from "react";
// import "./App.css";
// import Navbar from "./components/Navbar.jsx";
// import { Outlet } from "react-router-dom";
// import { useTheme } from "./utils/themeContext.jsx";

// function App() {
//   const { darkMode, setDarkMode } = useTheme();
//   const [sidebar, setSidebar] = useState(false)

//   return (
//     <div className={`${darkMode ? "dark" : ""} `}>
//       <div className=" bg-light-bg dark:bg-dark-bg">
//         {/* Navbar */}
//         <Navbar setSidebar= {setSidebar} sidebar={sidebar} setDarkMode= {setDarkMode} />
//             <Outlet/> 
//       </div>
//     </div>
//   );
// }

// export default App;



import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { useTheme } from "./utils/themeContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { darkMode, setDarkMode } = useTheme();
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="bg-light-bg dark:bg-dark-bg min-h-screen">
        {/* Navbar */}
        <Navbar
          setSidebar={setSidebar}
          sidebar={sidebar}
          setDarkMode={setDarkMode}
        />

        {/* Page Content */}
        <Outlet />

        {/* Toast Notifications */}
        <ToastContainer position="bottom-center" autoClose={3000} theme="dark" />
      </div>
    </div>
  );
}

export default App;
