import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./utils/themeContext.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import Search from "./components/Search.jsx";
import SignIn from "./components/SignIn.jsx";
import Video from "./components/Video.jsx";
import ChannelPage from "./components/ChannelPage.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home type="random" />,
      },
      {
        path: "trends",
        element: <Home type="trend" />,
      },
      {
        path: "subscriptions",
        element: <Home type="sub" />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "video/:id",
        element: <Video />,
      },
      {
        path: "channel/:id",
        element: <ChannelPage/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <RouterProvider router={appRouter}/>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
