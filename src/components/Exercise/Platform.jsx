"use client";
import { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import Sandbox from "@/components/Sandbox";
import ReactMarkdown from "react-markdown";

// Template Markdown content
const markdownContent = `
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

function extendMenuItemClicks(menuItems, extraFunction) {
  return menuItems.map((item) => {
    const originalClick = item.onClick;

    return {
      ...item,
      onClick: (e) => {
        originalClick?.(e);    // call the original onClick
        extraFunction?.(e);    // call the additional function
      },
    };
  });
}

function Instructions({ task, onClose }) {
  return (
    <div className="fixed inset-0 top-30 flex items-center justify-center z-50">
      <div className="relative w-[90%] max-w-2xl bg-white shadow-2xl rounded-lg p-6 border">
        {/* Top-right close button */}
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
          {markdownContent.replace("{task}", task)}
        </ReactMarkdown>
      </div>
    </div>
  );
}

const TestPassed = ({ result, level }) => {
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [breakdown, setBreakdown] = useState({
    passScore: 0,
    attemptScore: 0,
    timeScore: 0
  });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startTime = localStorage.getItem('startTime');
    if (!startTime) {
      console.error("Start time not found in local storage.");
      return;
    }

    const endTime = new Date(result.timestamp).getTime();
    const start = new Date(startTime).getTime();
    const durationInSeconds = (endTime - start) / 1000;
    setTimeTaken(durationInSeconds);

    const passed = result.syntaxCheckPassed && result.structureCheckPassed;
    
    let max_score = 0;
    if (level == "Hard"){
      max_score = 100;
    } else if(level == "Intermediate"){
      max_score = 70;
    } else{
      max_score = 50;
    }

    const passScore = passed ? (0.6 * max_score) : 0;

    const attemptScore = result.attempts < 10 
      ? ((10 - result.attempts) / 10) * (0.2 * max_score)
      : 0;

    const timeScore = durationInSeconds < 120 
      ? ((120 - durationInSeconds) / 120) * (0.2 * max_score)
      : 0;


    const totalScore = passScore + attemptScore + timeScore;

    setScore(Math.round(totalScore));
    setBreakdown({
      passScore: Math.round(passScore),
      attemptScore: Math.round(attemptScore),
      timeScore: Math.round(timeScore)
    });
  }, [result]);

  const handleClose = () => {
    setVisible(false);
    
    axios.post('http://localhost:5000/submit/exercise', loginData)
      .then(response => {
        console.log('Success:', response.data);
        // handle success
      })
      .catch(error => {
        console.error('Error:', error);
        // handle error
      });

  };

  if (!visible) return null;

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-green-50 border border-green-200 rounded-lg shadow relative">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        aria-label="Close"
      >
        &times;
      </button>

      <h1 className="text-3xl font-bold text-green-700 text-center mb-4">🎉 Congratulations! 🎉</h1>
      <p className="text-center text-gray-700 mb-2">Your code passed all checks!</p>

      <div className="text-center text-gray-800 mt-4">
        <p><span className="font-semibold">Time Taken:</span> {timeTaken.toFixed(2)} seconds</p>
        <p><span className="font-semibold">Attempts:</span> {result.attempts}</p>
      </div>

      <div className="mt-6 bg-white rounded-md shadow-inner p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">📊 Score Breakdown</h2>
        <ul className="space-y-2 text-gray-700">
          <li>✅ Passed Checks: <span className="font-bold">{breakdown.passScore} / 30</span></li>
          <li>🔁 Attempts Bonus: <span className="font-bold">{breakdown.attemptScore} / 10</span></li>
          <li>⏱️ Time Bonus: <span className="font-bold">{breakdown.timeScore} / 10</span></li>
        </ul>
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold text-green-800">Total Score: {score} / 50</h2>
      </div>
    </div>
  );
};

function TestNotPassed({ onClose }) {
  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Centered Modal */}
      <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md bg-white rounded-lg shadow-xl p-6 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Tests Not Passed</h2>
          <button
            onClick={onClose}
            className="text-red-600 hover:text-red-800 text-3xl font-bold leading-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <p className="text-gray-700">
          You haven&apos;t completed the exercise. To test if your code is correct, enter
          <code className="mx-1 bg-gray-100 text-red-600 font-mono text-sm px-2 py-0.5 rounded">
            run-tests
          </code>
          in the terminal.
        </p>
      </div>
    </>
  );
}


// Main Component
export default function QuestionPlatform({
  setSidebarContent,
  menuItems,
  files,
  filesOpened,
  task,
  exerciseTitle
}) {
  const [sandboxLoaded, setSandboxLoaded] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("Basic");
  const [showingInstructions, setShowingInstructions] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [showResult, setResultPage] = useState(false);
  const [result, setResult] = useState(null);
  const [questionNum, setQuestionNum] = useState(null);


  const showInstructions = () => setShowingInstructions(true);
  const hideInstructions = () => setShowingInstructions(false);

  const handleSandboxLoad = () => setSandboxLoaded(true);

  const handleSubmit = async () => {
    try {
          const container = document.getElementById("stackblitz-container");
          if (!container) throw new Error("Container element not found");
  
          const vm = await sdk.connect(container);
          
          const fsSnap = await vm.getFsSnapshot();
          if ((Object.keys(fsSnap)).includes('result.tests')){
            setResult(fsSnap["result.tests"]);
            setResultPage(true);
            return;
          } else{
            // setCongrats(true)
            setAlert(true);
            return;
          }
      } catch (error) {
          console.error("Error during StackBlitz VM setup:", error);
      }
  };

  const handleLevelChange = (event) => {
    const level = event.target.value;
    setSelectedLevel(level);
    setSidebarContent(event);
    setShowingInstructions(true);
  };

  const sandboxElement = useMemo(() => {
    if (files && filesOpened) {
      return (
        <Sandbox
          fileToOpen={filesOpened}
          filesObj={files}
          onLoad={handleSandboxLoad}
        />
      );
    }
    return null;
  }, [files, filesOpened]);

  const extendedMenu = useMemo(() => {
    return extendMenuItemClicks(menuItems, () => setShowingInstructions(true));
  }, [menuItems]);


  return (
    <div className="relative">
      {/* Instructions Overlay */}
      {showingInstructions && (
        <div className="fixed inset-0 bg-opacity-70 backdrop-blur-sm z-40 flex items-center justify-center">
          <Instructions task={task} onClose={hideInstructions} />
        </div>
      )}

      {showAlert && <TestNotPassed onClose={() => setShowModal(false)} />}

      {showResult && <TestPassed result={result}/>}

      {/* Top Bar */}
      <div className="flex justify-between items-center py-5 pl-3 pr-1 relative z-10">
        {/* Difficulty Buttons */}
        <div
          className="flex space-x-3"
          role="radiogroup"
          aria-label="Select Difficulty"
        >
          {["Basic", "intermediate", "hard"].map((level) => {
            const isSelected = selectedLevel === level;
            const baseColor =
              level === "Basic"
                ? "bg-blue-500 hover:bg-blue-600 ring-blue-300"
                : level === "intermediate"
                  ? "bg-green-500 hover:bg-green-600 ring-green-300"
                  : "bg-red-500 hover:bg-red-600 ring-red-300";

            return (
              <label key={level}>
                <input
                  type="radio"
                  name="level"
                  value={level}
                  className="sr-only peer"
                  onChange={handleLevelChange}
                  checked={isSelected}
                />
                <div
                  className={`flex items-center justify-center px-4 py-2 rounded text-white cursor-pointer transition-all
                    ${baseColor}
                    ${isSelected ? "ring-4 scale-105 shadow-md" : ""}
                  `}
                >
                  <span className="capitalize">{level}</span>
                </div>
              </label>
            );
          })}
        </div>

        <div className="text-3xl font-bold mx-5">
          {exerciseTitle}
        </div>

        {/* Instructions & Submit Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={showInstructions}
            className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Instructions
          </button>

          <button 
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={handleSubmit}
            >
            Submit
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-row relative z-10 pr-2">
        <div className="order-2 grow">{sandboxElement}</div>

        {sandboxLoaded && (
          <div className="order-1 w-64 break-words">
            <Sidebar menuItems={extendedMenu} />
          </div>
        )}
      </div>
    </div>
  );
}
