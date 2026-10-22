
function SearchBar({ query, onQueryChange, onSubmit }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="flex gap-2"
    >
      <input
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search news..."
        aria-label="Search news"
        className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-blue-900"
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
