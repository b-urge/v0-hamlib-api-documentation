"use client"

import { cn } from "@/lib/utils"
import { Radio, Antenna, Settings, Zap, BookOpen, Play, ChevronRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DocsSidebarProps {
  activeSection: string
  onNavigate: (section: string) => void
}

const navigation = [
  {
    title: "Overview",
    items: [
      { id: "getting-started", label: "Getting Started", icon: BookOpen },
      { id: "authentication", label: "Authentication", icon: Settings },
    ],
  },
  {
    title: "Radio Control",
    items: [
      { id: "get-frequency", label: "GET /radio/frequency", icon: Radio },
      { id: "set-frequency", label: "POST /radio/frequency", icon: Radio },
      { id: "get-mode", label: "GET /radio/mode", icon: Radio },
    ],
  },
  {
    title: "VFO",
    items: [
      { id: "get-vfo", label: "GET /radio/vfo", icon: Zap },
      { id: "set-vfo", label: "POST /radio/vfo", icon: Zap },
    ],
  },
  {
    title: "Rotator",
    items: [
      { id: "get-position", label: "GET /rotator/position", icon: Antenna },
      { id: "set-position", label: "POST /rotator/position", icon: Antenna },
    ],
  },
  {
    title: "Playground",
    items: [
      { id: "playground", label: "API Playground", icon: Play },
    ],
  },
]

export function DocsSidebar({ activeSection, onNavigate }: DocsSidebarProps) {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 border-r border-border bg-card">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <Radio className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-foreground">Hamlib API</h1>
          <p className="text-xs text-muted-foreground">v4.5.0</p>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <nav className="px-3 py-4">
          {navigation.map((group) => (
            <div key={group.title} className="mb-6">
              <h2 className="px-3 mb-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                {group.title}
              </h2>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onNavigate(item.id)}
                        className={cn(
                          "flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        )}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                        {isActive && <ChevronRight className="w-3 h-3 ml-auto shrink-0" />}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}
