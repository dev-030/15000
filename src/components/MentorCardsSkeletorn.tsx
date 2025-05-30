







export default function MentorCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-lg overflow-hidden shadow animate-pulse">
          <div className="bg-gray-300 h-32"></div>
          <div className="bg-white p-4">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded mb-2"></div>
            <div className="h-12 bg-gray-300 rounded mb-4"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-6 bg-gray-300 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}