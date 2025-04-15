import Link from "next/link"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface NavItemProps {
  href: string
  icon: ReactNode
  children: ReactNode
  active?: boolean
}

export function NavItem({ href, icon, children, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}