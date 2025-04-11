import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./utils/themeContext.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Lazy load route components
const Home = lazy(() => import("./components/Home.jsx"));
const Search = lazy(() => import("./components/Search.jsx"));
const SignIn = lazy(() => import("./components/SignIn.jsx"));
const Video = lazy(() => import("./components/Video.jsx"));
const ChannelPage = lazy(() => import("./components/ChannelPage.jsx"));
const ErrorPage = lazy(() => import("./components/ErrorPage.jsx"));

// App routes
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true,
        element: <Home type="/random" />
      },
      { path: "/trends",
        element: <Home type="trend" />
      },
      { path: "/subscriptions",
        element: <Home type="sub" />
      },
      { path: "/search",
        element: <Search />
      },
      { path: "/signin",
        element: <SignIn />
      },
      { path: "/video/:id",
        element: <Video />
      },
      { path: "/channel/:id",
        element: <ChannelPage />
      },
      { path: "*",
        element: <ErrorPage />
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          {/* Fallback UI while lazy components load */}
          <Suspense
            fallback={<div className="text-center mt-10">Loading...</div>}
          >
            <RouterProvider router={appRouter} />
          </Suspense>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
