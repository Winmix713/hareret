import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface FileUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDrop: (files: File[]) => void
}

export function FileUploadDialog({ open, onOpenChange, onDrop }: FileUploadDialogProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload files</DialogTitle>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={`
            mt-4 rounded-lg border-2 border-dashed p-8 text-center
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted'}
          `}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <div className="mt-4 text-sm text-muted-foreground">
            <p className="font-medium">
              {isDragActive ? 'Drop the files here' : 'Drag & drop files here'}
            </p>
            <p className="mt-1">or click to select files</p>
          </div>
          <Button variant="outline" className="mt-4">
            Select Files
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            Supported formats: PNG, JPG, GIF, PDF, DOC, DOCX, XLS, XLSX
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}