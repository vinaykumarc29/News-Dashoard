
import { useEffect, useRef, useState } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import NewsCard from "../components/NewsCard";
import NewsSkeleton from "../components/NewsSkleton";
import EmptyState from "../components/EmptyState";
import useNews from "../hooks/useNews";

function Home({ theme, onToggleTheme }) {
  const {
    articles,
    loading,
    loadingMore,
    error,
    query,
    setQuery,
    searchNews,
    fetchLatest,
    loadMore,
    hasMore,
  } = useNews();

  const sentinelRef = useRef(null);

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bookmarks")) || [];
    } catch {
      return [];
    }
  });

  // Detect when the user scrolls near the bottom of the news list.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    // console.log(sentinel);

    if (!sentinel || loading || loadingMore || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "400px",
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [loading, loadingMore, hasMore, loadMore]);

  // Add or remove a bookmarked article.
  function toggleBookmark(article) {
    const exists = bookmarks.some(
      (item) => item.url === article.url
    );

    const updated = exists
      ? bookmarks.filter((item) => item.url !== article.url)
      : [...bookmarks, article];

    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  }

  // Search for news using the submitted keyword.
  function handleSearch() {
    searchNews(query);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Latest News
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Explore the latest stories and search for news.
          </p>
        </div>

        <div className="mb-8">
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSubmit={handleSearch}
          />
        </div>

        {error && (

          <div
            role="alert"
            className="mb-6 flex flex-col items-center rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-300"
          >
            <p className="text-center">{error}</p>

            <button
              type="button"
              onClick={() => {
                if (articles.length > 0 && hasMore) {
                  loadMore();
                } else {
                  fetchLatest();
                }
              }}
              className="mt-2 font-semibold underline"
            >
              Try again
            </button>
          </div>

        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <NewsSkeleton key={index} />
            ))}
          </div>
        ) : articles.length && !error === 0 ? (
          <EmptyState
            title="No news found"
            message="Try another search, or return to the latest news."
            actionLabel="Show latest news"
            onAction={fetchLatest}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <NewsCard
                  key={article.url || article.id || index}
                  article={article}
                  isBookmarked={bookmarks.some(
                    (item) => item.url === article.url
                  )}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>

            {articles.length === 0 && (
              <EmptyState
                title="No news found"
                message="Try another search, or return to the latest news."
                actionLabel="Show latest news"
                onAction={fetchLatest}
              />)}

            {loadingMore && (
              <div
                role="status"
                className="py-8 text-center text-gray-600 dark:text-gray-300"
              >
                Loading more news...
              </div>
            )}

            {hasMore && (
              <div
                ref={sentinelRef}
                aria-hidden="true"
                className="h-10"
              />
            )}

            {(!hasMore && !error && articles.length != 0) && (
              <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                You've reached the end of the news.
              </p>
            )}

          </>
        )}
      </main>
    </div>
  );
}

export default Home;
