export default function Display({ processedText, loading }) {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-2">Processed Output</h2>
      {loading ? (
        // Skeleton loading element using Tailwind's animate-pulse for animation
        <div className="p-2 border rounded-md bg-white">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ) : (
        <p className="p-2 border rounded-md bg-white">{processedText}</p>
      )}
    </div>
  );
} 