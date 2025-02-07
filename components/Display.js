export default function Display({ processedText, loading }) {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-2 text-gray-200">Processed Output</h2>
      {loading ? (
        // Skeleton loading element using Tailwind's animate-pulse for animation in dark mode
        <div className="p-2 border border-gray-700 rounded-md bg-gray-800">
          <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
        </div>
      ) : (
        <p className="p-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100">
          {processedText}
        </p>
      )}
    </div>
  );
} 