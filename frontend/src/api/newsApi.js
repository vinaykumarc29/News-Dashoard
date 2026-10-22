const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const MAX_PAGES = 4;
const PAGE_SIZE = 20;

export async function fetchNewsPage({ search = "", page = 1 }) {
  const params = new URLSearchParams({
    page: String(page),
  });

  if (search.trim()) {
    params.set("search", search.trim());
  }

  const response = await fetch(
    `${API_BASE_URL}/fetch?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news.");
  }

  const data = await response.json();

  if (!Array.isArray(data.news)) {
    throw new Error("The news API returned an unexpected response.");
  }

  return {
    articles: data.news,
    hasMore: data.news.length === PAGE_SIZE && page < MAX_PAGES,
  };
}
