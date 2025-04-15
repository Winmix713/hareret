import { useState, useMemo } from "react"
import { useFiles } from "./use-files"

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const { files } = useFiles()

  const filteredFiles = useMemo(() => {
    if (!searchQuery.trim()) return files

    const query = searchQuery.toLowerCase()
    return files.filter((file) =>
      file.title.toLowerCase().includes(query) ||
      file.metadata.toLowerCase().includes(query)
    )
  }, [files, searchQuery])

  return {
    searchQuery,
    setSearchQuery,
    filteredFiles,
  }
}