"use client";
import React, { useState, useEffect, useRef } from 'react';
import '@/app/UniversalCompiler.css'; // Assume a CSS file for styling

const UniversalCompiler = () => {
  const [currentFile, setCurrentFile] = useState('react/App.js');
  const [openTabs, setOpenTabs] = useState(['react/App.js']);
  const [expandedFolders, setExpandedFolders] = useState({
    react: true,
    nextjs: true,
    nodejs: true,
    express: true,
    mongodb: true,
    vanilla: true
  });
  const [activeRuntime, setActiveRuntime] = useState('react');
  const [output, setOutput] = useState('');
  const [errors, setErrors] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [serverStatus, setServerStatus] = useState({
    express: 'stopped',
    mongodb: 'stopped',
    nextjs: 'stopped'
  });

  const [fileContents, setFileContents] = useState({
    // File contents as provided
    'react/App.js': `...`, // Use the provided React App.js content
    'react/App.css': `...`, // Use the provided React App.css content
    'nextjs/pages/index.js': `...`, // Use the provided Next.js index.js content
    'nextjs/pages/api/data.js': `...`, // Use the provided Next.js API content
    'nextjs/styles/Home.module.css': `...`, // Use the provided Next.js styles
    'nodejs/server.js': `...`, // Use the provided Node.js server.js content
    'express/routes/users.js': `...`, // Use the provided Express routes content
    'mongodb/models/User.js': `...`, // Use the provided MongoDB User model content
    'mongodb/db.js': `...`, // Use the provided MongoDB db.js content
    'vanilla/index.html': `...`, // Use the provided Vanilla HTML content
    'vanilla/style.css': `...`, // Use the provided Vanilla CSS content
    'vanilla/script.js': `...` // We'll add the script.js content below
  });

  const codeEditorRef = useRef(null);

  // File structure for the explorer
  const fileStructure = {
    react: ['App.js', 'App.css'],
    nextjs: ['pages/index.js', 'pages/api/data.js', 'styles/Home.module.css'],
    nodejs: ['server.js'],
    express: ['routes/users.js'],
    mongodb: ['models/User.js', 'db.js'],
    vanilla: ['index.html', 'style.css', 'script.js']
  };

  // Handle folder toggle
  const toggleFolder = (folder) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }));
  };

  // Handle file selection
  const selectFile = (file) => {
    setCurrentFile(file);
    if (!openTabs.includes(file)) {
      setOpenTabs([...openTabs, file]);
    }
  };

  // Close a tab
  const closeTab = (file) => {
    const newTabs = openTabs.filter(tab => tab !== file);
    setOpenTabs(newTabs);
    if (currentFile === file && newTabs.length > 0) {
      setCurrentFile(newTabs[newTabs.length - 1]);
    } else if (newTabs.length === 0) {
      setCurrentFile('');
    }
  };

  // Handle code changes
  const handleCodeChange = (e) => {
    setFileContents(prev => ({
      ...prev,
      [currentFile]: e.target.value
    }));
  };

  // Simulate running the code
  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setErrors('');

    try {
      switch (activeRuntime) {
        case 'react':
          setOutput('Simulating React app compilation...\n' +
            '✓ Compiled successfully!\n' +
            'React app is running with the current App.js configuration.');
          break;
        case 'nextjs':
          setOutput('Simulating Next.js app compilation...\n' +
            '✓ Compiled successfully!\n' +
            'Next.js app is running with SSR and API routes.');
          break;
        case 'nodejs':
          setOutput('Simulating Node.js server execution...\n' +
            '✓ Server started successfully!\n' +
            `API endpoints available at http://localhost:3001`);
          setServerStatus(prev => ({ ...prev, express: 'running' }));
          break;
        case 'mongodb':
          setOutput('Simulating MongoDB connection...\n' +
            '✓ Connected to MongoDB successfully!\n' +
            'Database operations ready.');
          setServerStatus(prev => ({ ...prev, mongodb: 'running' }));
          break;
        case 'vanilla':
          setOutput('Simulating Vanilla JS execution...\n' +
            '✓ HTML, CSS, and JS loaded successfully!\n' +
            'Vanilla app is running.');
          break;
        default:
          setOutput('No runtime selected.');
      }
    } catch (error) {
      setErrors(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Stop server
  const stopServer = (type) => {
    setServerStatus(prev => ({ ...prev, [type]: 'stopped' }));
    setOutput(`✓ ${type.charAt(0).toUpperCase() + type.slice(1)} server stopped.`);
  };

  // Add the missing script.js content for Vanilla JS
  useEffect(() => {
    setFileContents(prev => ({
      ...prev,
      'vanilla/script.js': `
(function() {
  // Todo List
  const todoInput = document.getElementById('todoInput');
  const addTodoBtn = document.getElementById('addTodo');
  const todoList = document.getElementById('todoList');

  // Load todos from localStorage
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  // Render todos
  function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.className = \`todo-item \${todo.completed ? 'completed' : ''}\`;
      li.innerHTML = \`
        <span>\${todo.text}</span>
        <div class="todo-actions">
          <button onclick="toggleTodo(\${index})">\${todo.completed ? 'Undo' : 'Complete'}</button>
          <button onclick="deleteTodo(\${index})">Delete</button>
        </div>
      \`;
      todoList.appendChild(li);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Add todo
  addTodoBtn.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text) {
      todos.push({ text, completed: false });
      todoInput.value = '';
      renderTodos();
    }
  });

  // Toggle todo completion
  window.toggleTodo = (index) => {
    todos[index].completed = !todos[index].completed;
    renderTodos();
  };

  // Delete todo
  window.deleteTodo = (index) => {
    todos.splice(index, 1);
    renderTodos();
  };

  // Weather App
  const cityInput = document.getElementById('cityInput');
  const getWeatherBtn = document.getElementById('getWeather');
  const weatherInfo = document.getElementById('weatherInfo');

  getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (city) {
      try {
        weatherInfo.innerHTML = 'Loading...';
        // Mock weather API response
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockWeather = {
          city,
          temperature: Math.floor(Math.random() * 30) + 10,
          description: 'Clear',
          humidity: Math.floor(Math.random() * 100)
        };
        weatherInfo.innerHTML = \`
          <h3>\${mockWeather.city}</h3>
          <p>Temperature: \${mockWeather.temperature}°C</p>
          <p>Description: \${mockWeather.description}</p>
          <p>Humidity: \${mockWeather.humidity}%</p>
        \`;
      } catch (error) {
        weatherInfo.innerHTML = 'Error fetching weather data.';
      }
    }
  });

  // Calculator
  window.appendToDisplay = (value) => {
    document.getElementById('display').value += value;
  };

  window.clearDisplay = () => {
    document.getElementById('display').value = '';
  };

  window.deleteLast = () => {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
  };

  window.calculate = () => {
    const display = document.getElementById('display');
    try {
      display.value = eval(display.value) || '';
    } catch (error) {
      display.value = 'Error';
    }
  };

  // API Demo
  const fetchUsersBtn = document.getElementById('fetchUsers');
  const fetchPostsBtn = document.getElementById('fetchPosts');
  const clearDataBtn = document.getElementById('clearData');
  const apiData = document.getElementById('apiData');

  fetchUsersBtn.addEventListener('click', async () => {
    try {
      apiData.innerHTML = 'Loading...';
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ];
      apiData.innerHTML = \`
        <h3>Users</h3>
        <ul>\${mockUsers.map(user => \`<li>\${user.name} (\${user.email})</li>\`).join('')}</ul>
      \`;
    } catch (error) {
      apiData.innerHTML = 'Error fetching users.';
    }
  });

  fetchPostsBtn.addEventListener('click', async () => {
    try {
      apiData.innerHTML = 'Loading...';
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockPosts = [
        { id: 1, title: 'First Post', content: 'Hello, World!' },
        { id: 2, title: 'Second Post', content: 'JavaScript is awesome!' }
      ];
      apiData.innerHTML = \`
        <h3>Posts</h3>
        <ul>\${mockPosts.map(post => \`<li>\${post.title}: \${post.content}</li>\`).join('')}</ul>
      \`;
    } catch (error) {
      apiData.innerHTML = 'Error fetching posts.';
    }
  });

  clearDataBtn.addEventListener('click', () => {
    apiData.innerHTML = '';
  });

  // Initial render
  renderTodos();
})();
      `
    }));
  }, []);

  return (
    <div className="universal-compiler">
      <div className="compiler-layout">
        {/* File Explorer */}
        <div className="file-explorer">
          <h3>File Explorer</h3>
          {Object.keys(fileStructure).map(folder => (
            <div key={folder} className="folder">
              <div
                className="folder-name"
                onClick={() => toggleFolder(folder)}
              >
                {expandedFolders[folder] ? '▼' : '▶'} {folder}
              </div>
              {expandedFolders[folder] && (
                <div className="files">
                  {fileStructure[folder].map(file => (
                    <div
                      key={`${folder}/${file}`}
                      className={`file ${currentFile === `${folder}/${file}` ? 'active' : ''}`}
                      onClick={() => selectFile(`${folder}/${file}`)}
                    >
                      {file}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Editor Section */}
        <div className="editor-section">
          {/* Tabs */}
          <div className="tabs">
            {openTabs.map(tab => (
              <div key={tab} className={`tab ${currentFile === tab ? 'active' : ''}`}>
                <span onClick={() => setCurrentFile(tab)}>{tab}</span>
                <button onClick={() => closeTab(tab)}>×</button>
              </div>
            ))}
          </div>

          {/* Code Editor */}
          {currentFile && (
            <textarea
              ref={codeEditorRef}
              className="code-editor"
              value={fileContents[currentFile] || ''}
              onChange={handleCodeChange}
            />
          )}
        </div>

        {/* Output and Controls */}
        <div className="output-section">
          {/* Runtime Selector */}
          <div className="runtime-selector">
            <select
              value={activeRuntime}
              onChange={(e) => setActiveRuntime(e.target.value)}
            >
              <option value="react">React</option>
              <option value="nextjs">Next.js</option>
              <option value="nodejs">Node.js/Express</option>
              <option value="mongodb">MongoDB</option>
              <option value="vanilla">Vanilla JS</option>
            </select>
            <button onClick={runCode} disabled={isRunning}>
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
            {['express', 'mongodb', 'nextjs'].map(type => (
              serverStatus[type] === 'running' && (
                <button
                  key={type}
                  onClick={() => stopServer(type)}
                  className="stop-button"
                >
                  Stop {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              )
            ))}
          </div>

          {/* Output Display */}
          <div className="output">
            <h3>Output</h3>
            <pre>{output}</pre>
            {errors && <pre className="errors">{errors}</pre>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalCompiler;