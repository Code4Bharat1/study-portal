'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function ReactProjectDetail() {
  const { project: slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${slug}`)
        if (!response.ok) throw new Error('Project not found')
        const data = await response.json()
        setProject(data)
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [slug])

  if (loading) return <div className="text-center text-black">Loading...</div>
  if (!project) return <div className="text-center text-black">Project not found</div>

  return (
    <main className="min-h-screen bg-[#f3e8ff] px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-4xl font-bold text-black mb-4">{project.title}</h1>
        <p className="text-lg text-black mb-4">{project.description}</p>
        <h2 className="text-2xl font-semibold text-black mb-2">Sample Code:</h2>
        <pre className="bg-gray-100 text-black p-4 rounded-lg overflow-x-auto border-l-4 border-pink-500">
          {project.sampleCode}
        </pre>
      </div>
    </main>
  )
}