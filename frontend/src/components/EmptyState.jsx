
function EmptyState({
  title = "Nothing to show",
  message = "There is no content available right now.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">
        {message}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
