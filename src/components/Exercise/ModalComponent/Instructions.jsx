// components/Instructions.jsx
import ReactMarkdown from "react-markdown";

const markdownTemplate = `
# {task}

## Welcome! Please follow the instructions below to complete and test your work.

1. Open the terminal.
2. Run:

> run-tests

3. You must pass the tests before submitting.

> ⚠️ If a command is already running, press Ctrl + C to cancel.

### 🛠 Having Trouble?

> npm run start

Only edit \`index.html\`.

Close this box after reading the instructions.
`;

export default function Instructions({ task, onClose }) {
  const markdown = markdownTemplate.replace("{task}", task);

  return (
    <div className="fixed inset-0 bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative w-[90%] max-w-2xl bg-white shadow-2xl rounded-lg p-6 border">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-600 hover:text-red-800 text-3xl font-bold leading-none focus:outline-none"
          aria-label="Close instructions"
        >
          &times;
        </button>

        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-semibold mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>,
            p: ({ children }) => <p className="mb-2 text-gray-800">{children}</p>,
            li: ({ children }) => <li className="ml-6 list-disc mb-1">{children}</li>,
            code: ({ children }) => (
              <code className="bg-gray-100 text-sm px-1 py-0.5 rounded text-red-600 font-mono">
                {children}
              </code>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-700 my-2">
                {children}
              </blockquote>
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
