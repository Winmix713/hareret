import Link from "next/link"
import { Folder } from "lucide-react"
import type { ReactNode } from "react"

interface FolderItemProps {
  href: string
  children: ReactNode
}

export function FolderItem({ href, children }: FolderItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
    >
      <Folder className="h-4 w-4" />
      <span>{children}</span>
    </Link>
  )
}