// src/components/SkeletonCard.jsx
export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-silver-200 dark:border-gray-700 p-4 rounded-xl shadow-sm flex flex-col">
      {/* Image placeholder */}
      <div className="h-48 rounded-lg skeleton mb-4" />

      {/* Title lines */}
      <div className="h-4 skeleton rounded mb-2 w-full" />
      <div className="h-4 skeleton rounded mb-4 w-2/3" />

      {/* Category */}
      <div className="h-3 skeleton rounded mb-4 w-1/3" />

      {/* Stars */}
      <div className="h-3 skeleton rounded mb-4 w-1/2" />

      {/* Price + Button row */}
      <div className="flex justify-between items-center mt-auto">
        <div className="h-5 skeleton rounded w-16" />
        <div className="h-8 skeleton rounded-lg w-24" />
      </div>
    </div>
  );
}
