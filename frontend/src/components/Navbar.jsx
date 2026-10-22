
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar({ theme, onToggleTheme }) {
  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium ${
      isActive
        ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    }`;

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <NavLink to="/" className="text-xl font-bold text-gray-900 dark:text-white">
          News Explorer
        </NavLink>

        <div className="flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/bookmarks" className={linkClass}>
            Bookmarks
          </NavLink>

          <ThemeToggle
            theme={theme}
            onToggleTheme={onToggleTheme}
          />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
