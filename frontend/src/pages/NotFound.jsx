
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-900">
      <p className="text-7xl font-bold text-blue-600">404</p>

      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
        Page not found
      </h1>

      <p className="mt-2 text-gray-600 dark:text-gray-300">
        The page you are looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
      >
        Back to home
      </Link>
    </main>
  );
}

export default NotFound;
