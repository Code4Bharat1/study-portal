'use client';
import useReadingTracker from '@/app/hook/useReadingTracker';
import React from 'react';

function Reactperformance() {
  useReadingTracker('reactperformance');
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">React Performance Optimization</h1>
      <p className="text-lg text-gray-800 mb-6">
        Performance is crucial for providing a smooth user experience in React applications. This page covers best practices and tools to improve the speed and responsiveness of your React apps.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        {/* Memoization */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">1. Memoization with React.memo</h2>
        <p className="text-gray-800 mb-4">
          Use <code>React.memo</code> to prevent unnecessary re-renders of functional components:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.value}</div>;
});`}
          </code>
        </pre>

        {/* useCallback */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">2. useCallback Hook</h2>
        <p className="text-gray-800 mb-4">
          <code>useCallback</code> memoizes functions to avoid re-creating them on every render:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);`}
          </code>
        </pre>

        {/* useMemo */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">3. useMemo Hook</h2>
        <p className="text-gray-800 mb-4">
          <code>useMemo</code> caches the result of a computation to avoid expensive recalculations:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`const expensiveValue = useMemo(() => {
  return computeExpensiveValue(input);
}, [input]);`}
          </code>
        </pre>

        {/* Lazy Loading */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">4. Code Splitting & Lazy Loading</h2>
        <p className="text-gray-800 mb-4">
          Split your code using <code>React.lazy</code> and <code>Suspense</code> to improve load time:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`}
          </code>
        </pre>

        {/* Windowing */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">5. Windowing/Lazy List Rendering</h2>
        <p className="text-gray-800 mb-4">
          Use libraries like <code>react-window</code> or <code>react-virtualized</code> to render only visible list items:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">
{`import { FixedSizeList as List } from 'react-window';

<List
  height={300}
  itemCount={1000}
  itemSize={35}
  width={300}
>
  {({ index, style }) => <div style={style}>Item {index}</div>}
</List>`}
          </code>
        </pre>

        {/* Avoiding Anonymous Functions */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">6. Avoid Creating Functions Inside JSX</h2>
        <p className="text-gray-800 mb-4">
          Declare functions outside of the render method to avoid re-creation on every render.
        </p>

        {/* Avoid Prop Drilling */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">7. Avoid Prop Drilling</h2>
        <p className="text-gray-800 mb-4">
          Use Context API or state management libraries (like Redux or Zustand) to avoid passing props deeply.
        </p>

        {/* Performance Monitoring */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">8. Monitoring Performance</h2>
        <p className="text-gray-800 mb-4">
          Use tools like React DevTools and Chrome Performance tab to analyze and debug performance bottlenecks.
        </p>

        {/* Production Builds */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">9. Use Production Build</h2>
        <p className="text-gray-800 mb-4">
          Always build your app for production using:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
          <code className="text-pink-500">npm run build</code>
        </pre>

        {/* Summary */}
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">Summary</h2>
        <ul className="list-disc list-inside text-gray-800 space-y-2 mb-6">
          <li>Use <code>React.memo</code>, <code>useCallback</code>, and <code>useMemo</code> wisely</li>
          <li>Implement code splitting with <code>React.lazy</code> and <code>Suspense</code></li>
          <li>Use virtualized lists for large datasets</li>
          <li>Monitor performance with React DevTools</li>
          <li>Avoid unnecessary re-renders and prop drilling</li>
        </ul>

        <button className="mt-8 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600">
          Next: React DevTools →
        </button>
      </div>
    </div>
  );
}

export default Reactperformance;
