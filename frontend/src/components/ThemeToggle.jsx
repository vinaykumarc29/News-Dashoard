
function ThemeToggle({ theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
    >
      {isDark ? "Light mode" : "Dark mode"}
    </button>
  );
}

export default ThemeToggle;
