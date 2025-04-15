"use client"

import { useState, useCallback } from "react"
import { useTheme } from "next-themes"
import { Search, Bell, Grid, LayoutGrid, Plus, Upload, FolderPlus, Video, Sun, Moon, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { NavItem } from "./NavItem"
import { FolderItem } from "./FolderItem"
import { FileCard } from "./FileCard"
import { FileUploadDialog } from "./FileUploadDialog"
import { CreateFolderDialog } from "./CreateFolderDialog"
import { useHotkeys } from "react-hotkeys-hook"
import { useSearch } from "@/hooks/use-search"
import { useFiles } from "@/hooks/use-files"
import { useToast } from "@/hooks/use-toast"

export default function FileManager() {
  const { theme, setTheme } = useTheme()
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
  const { searchQuery, setSearchQuery, filteredFiles } = useSearch()
  const { files, isLoading, error } = useFiles()
  const { toast } = useToast()

  // Keyboard shortcuts
  useHotkeys('ctrl+k', (e) => {
    e.preventDefault()
    document.querySelector('input[type="search"]')?.focus()
  })

  useHotkeys('ctrl+u', () => setIsUploadOpen(true))
  useHotkeys('ctrl+n', () => setIsCreateFolderOpen(true))

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    toast({
      title: "Files uploaded",
      description: `${acceptedFiles.length} files have been uploaded successfully.`
    })
    setIsUploadOpen(false)
  }, [toast])

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-destructive">Error loading files: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Showpad</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
        <nav className="space-y-1 px-2">
          <NavItem href="#" icon={<LayoutGrid className="h-4 w-4" />} active>
            All content
          </NavItem>
          <NavItem href="#" icon={<Upload className="h-4 w-4" />}>
            Presentations
          </NavItem>
          <NavItem href="#" icon={<Video className="h-4 w-4" />}>
            Analytics
          </NavItem>
          <div className="py-3">
            <div className="px-3 text-xs font-medium uppercase text-muted-foreground">
              Collections
            </div>
            <div className="mt-2">
              <FolderItem href="#">Product Demos</FolderItem>
              <FolderItem href="#">Case Studies</FolderItem>
              <FolderItem href="#">Sales Collateral</FolderItem>
              <FolderItem href="#">Training Materials</FolderItem>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <div className="w-96">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search files... (Ctrl+K)"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsUploadOpen(true)}
            >
              <Upload className="h-4 w-4" />
              Upload (Ctrl+U)
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsCreateFolderOpen(true)}
            >
              <FolderPlus className="h-4 w-4" />
              Create folder (Ctrl+N)
            </Button>
          </div>

          <div className="mb-6">
            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="starred">Starred</TabsTrigger>
                <TabsTrigger value="shared">Shared</TabsTrigger>
              </TabsList>
              <TabsContent value="recent" className="mt-6">
                {isLoading ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="h-[300px] rounded-lg bg-muted animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredFiles.map((file) => (
                      <FileCard key={file.id} {...file} />
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="starred">
                <div className="flex flex-col items-center justify-center py-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <p className="mt-2 text-sm text-muted-foreground">No starred files yet.</p>
                </div>
              </TabsContent>
              <TabsContent value="shared">
                <div className="flex flex-col items-center justify-center py-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="mt-2 text-sm text-muted-foreground">No shared files yet.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <FileUploadDialog 
        open={isUploadOpen} 
        onOpenChange={setIsUploadOpen}
        onDrop={handleDrop}
      />
      <CreateFolderDialog
        open={isCreateFolderOpen}
        onOpenChange={setIsCreateFolderOpen}
      />
    </div>
  )
}