import { useState, useEffect } from "react"

interface File {
  id: string
  title: string
  metadata: string
  thumbnail: string
  type: string
}

const DEMO_FILES: File[] = [
  {
    id: "1",
    title: "Q4 Sales Deck",
    metadata: "Shared folder • 8 presentations",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2274&q=80",
    type: "folder"
  },
  {
    id: "2",
    title: "Product Videos",
    metadata: "Shared folder • 5 videos",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=2274&q=80",
    type: "folder"
  },
  {
    id: "3",
    title: "ROI Calculator",
    metadata: "Shared file • 1 Excel",
    thumbnail: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2274&q=80",
    type: "excel"
  },
  {
    id: "4",
    title: "Project Alpha",
    metadata: "Shared folder • 3 items",
    thumbnail: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=2274&q=80",
    type: "folder"
  },
  {
    id: "5",
    title: "Marketing Assets",
    metadata: "Shared folder • 12 items",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2274&q=80",
    type: "folder"
  }
]

export function useFiles() {
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Simulate API call
    const loadFiles = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setFiles(DEMO_FILES)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load files"))
        setIsLoading(false)
      }
    }

    loadFiles()
  }, [])

  return { files, isLoading, error }
}