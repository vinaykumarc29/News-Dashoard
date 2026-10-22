
function NewsSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800"
    >
      <div className="h-48 animate-pulse bg-gray-200 dark:bg-gray-800" />

      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        <div className="h-3 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        <div className="flex gap-2 pt-2">
          <div className="h-9 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-9 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}

export default NewsSkeleton;
