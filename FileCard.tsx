import { useState } from "react"
import Image from "next/image"
import { MoreVertical, FileText, Image as ImageIcon } from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Button } from "@/components/ui/button"
import { FilePreview } from "./FilePreview"

interface FileCardProps {
  id: string
  title: string
  metadata: string
  thumbnail: string
  type?: string
}

export function FileCard({ id, title, metadata, thumbnail, type = "image" }: FileCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="group relative overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent">
            <div className="absolute right-2 top-2 z-10">
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div 
              className="aspect-[4/3] overflow-hidden cursor-pointer"
              onClick={() => setIsPreviewOpen(true)}
            >
              <Image
                src={thumbnail}
                alt={title}
                width={400}
                height={300}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="rounded-full bg-white/90 p-2">
                  {type === "image" ? (
                    <ImageIcon className="h-6 w-6 text-gray-900" />
                  ) : (
                    <FileText className="h-6 w-6 text-gray-900" />
                  )}
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-card-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{metadata}</p>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => setIsPreviewOpen(true)}>
            Preview
          </ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
          <ContextMenuItem>Download</ContextMenuItem>
          <ContextMenuItem className="text-destructive">Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <FilePreview
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        file={{
          id,
          title,
          type: type === "image" ? "image/jpeg" : "application/pdf",
          url: thumbnail
        }}
      />
    </>
  )
}