
import { useState } from "react";
import defaultImage from "../../assets/default new article image.png";

function NewsCard({ article, isBookmarked, onToggleBookmark }) {
  const [copied, setCopied] = useState(false);

  const title = article.title || "Untitled article";
  const url = article.url;
  const source = article.author || article.source || "Unknown source";

  const publishedDate = article.published
    ? new Date(article.published).toLocaleDateString()
    : "Date unavailable";

  async function handleCopyLink() {
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      
        <img
          src={article.image != "None" ? article.image : defaultImage}
          alt=""
          loading="lazy"
          className="h-48 w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="truncate">{source}</span>
          <span className="shrink-0">{publishedDate}</span>
        </div>

        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>

        <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {article.description || "No description available."}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Read article
            </a>
          )}

          <button
            type="button"
            onClick={() => onToggleBookmark(article)}
            aria-pressed={isBookmarked}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            disabled={!url}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;
