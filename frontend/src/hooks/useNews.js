
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchNewsPage } from "../api/newsApi"

function useNews() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const requestId = useRef(0);
  const loadingMoreRef = useRef(false);

  const loadNews = useCallback(async (searchTerm = "") => {
    const currentRequestId = ++requestId.current;

    setLoading(true);
    setLoadingMore(false);
    loadingMoreRef.current = false;
    setError("");
    setArticles([]);
    setPage(1);
    setHasMore(true);
    setActiveQuery(searchTerm);

    try {
      const result = await fetchNewsPage({
        search: searchTerm,
        page: 1,
      });

      if (currentRequestId !== requestId.current) return;

      setArticles(result.articles);
      setHasMore(result.hasMore);
    } catch (err) {
      if (currentRequestId !== requestId.current) return;

      setError(err.message || "Something went wrong.");
      setHasMore(false);
    } finally {
      if (currentRequestId === requestId.current) {
        setLoading(false);
      }
    }
  }, []);

  const fetchLatest = useCallback(() => {
    setQuery("");
    return loadNews("");
  }, [loadNews]);

  const searchNews = useCallback((searchTerm) => {
    const trimmedQuery = searchTerm.trim();
    setQuery(trimmedQuery);
    return loadNews(trimmedQuery);
  }, [loadNews]);

  const loadMore = useCallback(async () => {
    if (loading || loadingMoreRef.current || !hasMore) return;

    loadingMoreRef.current = true;
    setLoadingMore(true);
    setError("");

    const currentRequestId = requestId.current;
    const nextPage = page + 1;

    try {
      const result = await fetchNewsPage({
        search: activeQuery,
        page: nextPage,
      });

      if (currentRequestId !== requestId.current) return;

      setArticles((currentArticles) => {
        const existingUrls = new Set(
          currentArticles.map((article) => article.url)
        );

        const newArticles = result.articles.filter(
          (article) =>
            !article.url || !existingUrls.has(article.url)
        );

        return [...currentArticles, ...newArticles];
      });

      setPage(nextPage);
      setHasMore(result.hasMore && nextPage < MAX_PAGES);
    } catch (err) {
      if (currentRequestId === requestId.current) {
        setError(err.message || "Unable to load more news.");
      }
    } finally {
      if (currentRequestId === requestId.current) {
        loadingMoreRef.current = false;
        setLoadingMore(false);
      }
    }
  }, [loading, hasMore, page, activeQuery]);

  useEffect(() => {
    loadNews("");
  }, [loadNews]);

  return {
    articles,
    query,
    setQuery,
    loading,
    loadingMore,
    error,
    hasMore,
    searchNews,
    fetchLatest,
    loadMore,
  };
}

export default useNews;
