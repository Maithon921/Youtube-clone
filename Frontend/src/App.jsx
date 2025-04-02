import "./App.css";
import Home from "./components/Home.jsx";
import Menu from "./components/Menu.jsx";
import Navbar from "./components/Navbar.jsx";
import Search from "./components/Search.jsx";
import SignIn from "./components/SignIn.jsx";
import Video from "./components/Video.jsx";
import { useTheme } from "./utils/themeContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className={`${darkMode ? "dark" : ""} flex`}>
      <BrowserRouter>
        {/* <Menu /> */}
        <div className="flex-[7] bg-light-bg dark:bg-dark-bg">
          <Navbar />
          <div className="py-3 px-1">
            <Routes>
              <Route path="/">
                <Route index element={<Home type="random"/>} />
                <Route path="trends" element={<Home type ="trend"/>} />
                <Route path="subscriptions" element={<Home type ="sub"/>} />
                <Route path="search" element={<Search/>} />
                <Route path="signin" element={<SignIn/>} />
                <Route path="video" >
                  <Route path=":id" element={<Video/>} />
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
