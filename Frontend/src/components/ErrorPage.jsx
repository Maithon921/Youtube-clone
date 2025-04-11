import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  // to look for error and displaying appropriate message to the user
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-white dark:bg-[#0f0f0f] text-black dark:text-white">
      <div className="max-w-md">
        <h1 className="text-4xl sm:text-5xl font-semibold mb-4">
          This page isn't available
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6">
          The link may be broken or the page may have been removed.
        </p>
        {error?.statusText || error?.message ? (
          <p className="text-sm text-red-500 mb-4 truncate">
            {error.statusText || error.message}
          </p>
        ) : null}
        <Link
          to="/"
          className="inline-block bg-[#cc0000] hover:bg-[#b80000] text-white text-sm font-medium px-6 py-2 rounded-md transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
