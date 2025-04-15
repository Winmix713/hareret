import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"

interface FilePreviewProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  file: {
    id: string
    title: string
    type: string
    url: string
  }
}

export function FilePreview({ open, onOpenChange, file }: FilePreviewProps) {
  const isImage = file.type.startsWith('image/')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          {isImage ? (
            <Image
              src={file.url}
              alt={file.title}
              fill
              className="object-contain"
            />
          ) : (
            <iframe
              src={file.url}
              title={file.title}
              className="h-full w-full"
              sandbox="allow-same-origin allow-scripts"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}