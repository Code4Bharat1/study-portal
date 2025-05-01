'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function NodeProjects() {
  const [projects, setProjects] = useState({ basic: [], intermediate: [], hard: [] })
  const [code, setCode] = useState(`const http = require('http');\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('Hello World!');\n});\nserver.listen(3000, () => {\n  console.log('Server running on port 3000');\n});`)
  const [output, setOutput] = useState('')

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('http://localhost:5000/api/projects?category=node')
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        console.log('Fetched Node projects:', data)
        const grouped = {
          basic: data.filter(p => p.level === 'basic'),
          intermediate: data.filter(p => p.level === 'intermediate'),
          hard: data.filter(p => p.level === 'hard'),
        }
        setProjects(grouped)
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }
    fetchProjects()
  }, [])

  async function runCode() {
    try {
      const response = await fetch('http://localhost:5000/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, category: 'node' }),
      })
      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('Result:', result)
      setOutput(result.output || result.error || 'No output')
    } catch (error) {
      setOutput('Error running code: ' + error.message)
    }
  }

  return (
    <main className="min-h-screen bg-purple-100 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-black mb-8 text-center">Node Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-black mb-4">Basic</h2>
            <ul className="list-disc pl-5 text-black">
              {projects.basic.map((project) => (
                <li key={project._id}>
                  <Link href={`/node-projects/${project.slug}`} className="text-purple-600 hover:underline">
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-black mb-4">Intermediate</h2>
            <ul className="list-disc pl-5 text-black">
              {projects.intermediate.map((project) => (
                <li key={project._id}>
                  <Link href={`/node-projects/${project.slug}`} className="text-purple-600 hover:underline">
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-black mb-4">Hard</h2>
            <ul className="list-disc pl-5 text-black">
              {projects.hard.map((project) => (
                <li key={project._id}>
                  <Link href={`/node-projects/${project.slug}`} className="text-purple-600 hover:underline">
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-black mb-4">Practice Node Code</h2>
          <p className="text-black mb-4">Write and test your Node code below. Click "Run Code" to execute it.</p>
          <textarea
            className="w-full h-64 p-4 bg-gray-100 rounded-lg text-black border border-gray-300"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
          <button
            className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition"
            onClick={runCode}
          >
            Run Code
          </button>
          {output && <pre className="mt-4 bg-gray-100 p-4 rounded-lg text-black">{output}</pre>}
        </div>
      </div>
    </main>
  )
}