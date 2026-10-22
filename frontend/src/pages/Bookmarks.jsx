
import { useState } from "react";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import EmptyState from "../components/EmptyState";

function Bookmarks({ theme, onToggleTheme }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bookmarks")) || [];
    } catch {
      return [];
    }
  });

  function removeBookmark(article) {
    const updated = bookmarks.filter(
      (item) => item.url !== article.url
    );

    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Bookmarks
        </h1>

        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Your saved news articles.
        </p>

        {bookmarks.length === 0 ? (
          <EmptyState
            title="No bookmarks yet"
            message="Save an article from the home page and it will appear here."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((article, index) => (
              <NewsCard
                key={article.url || article.id || index}
                article={article}
                isBookmarked={true}
                onToggleBookmark={removeBookmark}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Bookmarks;
