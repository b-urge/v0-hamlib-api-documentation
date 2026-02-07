"use client"

import { useState } from "react"
import { Radio, Menu, X, BookOpen, Settings, Zap, Antenna, Play, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavProps {
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

export function MobileNav({ activeSection, onNavigate }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10">
          <Radio className="w-3.5 h-3.5 text-primary" />
        </div>
        <span className="text-sm font-semibold text-foreground">Hamlib API</span>
      </div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 border-b border-border bg-card shadow-lg max-h-[70vh] overflow-y-auto">
          <nav className="px-3 py-4">
            {navigation.map((group) => (
              <div key={group.title} className="mb-4">
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
                          onClick={() => {
                            onNavigate(item.id)
                            setOpen(false)
                          }}
                          className={cn(
                            "flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-md transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                          )}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{item.label}</span>
                          {isActive && <ChevronRight className="w-3 h-3 ml-auto shrink-0" />}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
