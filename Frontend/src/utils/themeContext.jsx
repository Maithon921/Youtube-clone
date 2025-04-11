import { createContext, useContext, useEffect, useState } from "react";
// create theme context for dark and light mode
const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  // initialize dark mode based on what is saved in local storage
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
//  save changes to local storage 
  useEffect(()=>{
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{darkMode,setDarkMode}}>
      {children}
    </ThemeContext.Provider>
  )
};
// custom hook to access theme context
export const useTheme = () => useContext(ThemeContext);