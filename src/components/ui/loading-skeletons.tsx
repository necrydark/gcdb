export function CharacterCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-600 rounded-lg h-24 w-24 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
    </div>
  );
}

export function RelicCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-600 rounded-lg h-24 w-24 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-32 w-full"></div>
    </div>
  );
}