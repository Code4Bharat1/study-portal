// @/components/TestNotPassed.jsx
export default function TestNotPassed({ onClose }) {
  return (
    <div className="text-gray-800">
      <h2 className="text-xl font-bold mb-2">Tests Not Passed</h2>
      <p className="mb-2">
        You haven&apos;t completed the exercise. To test your code:
      </p>
      <p className="mb-4">
        Run
        <code className="mx-2 bg-gray-100 text-red-600 font-mono text-sm px-2 py-0.5 rounded">
          run-tests
        </code>
        in the terminal.
      </p>
      <p className="mb-4">
        If already tested, then press the
        <code className="mx-2 bg-gray-100 text-red-600 font-mono text-sm px-2 py-0.5 rounded">
          Submit
        </code>
        present above.
      </p>
      <button
        onClick={onClose}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Close
      </button>
    </div>
  );
}
