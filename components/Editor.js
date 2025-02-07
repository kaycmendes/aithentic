export default function Editor({ text, onTextChange }) {
  return (
    <div className="w-full max-w-2xl mb-4">
      <label htmlFor="editor" className="block text-lg font-medium text-gray-200 mb-2">
        Enter Text
      </label>
      <textarea
        id="editor"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="6"
        placeholder="Type your text here..."
        aria-label="Text editor"
      />
    </div>
  );
} 