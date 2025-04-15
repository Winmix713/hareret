import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface CreateFolderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateFolderDialog({ open, onOpenChange }: CreateFolderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new folder</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Folder name</Label>
            <Input id="name" placeholder="My folder" />
          </div>
          <Button type="submit">Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}