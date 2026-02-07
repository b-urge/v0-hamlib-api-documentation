"use client"

import { useState, useCallback } from "react"
import { DocsSidebar } from "@/components/docs-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { GettingStarted } from "@/components/getting-started"
import { AuthSection } from "@/components/auth-section"
import { EndpointCard } from "@/components/endpoint-card"
import { ApiPlayground } from "@/components/api-playground"
import { endpoints } from "@/lib/endpoints"
import { Search } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Page() {
  const [activeSection, setActiveSection] = useState("getting-started")
  const [searchQuery, setSearchQuery] = useState("")

  const handleNavigate = useCallback((section: string) => {
    setActiveSection(section)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  const filteredEndpoints = endpoints.filter((ep) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      ep.path.toLowerCase().includes(q) ||
      ep.description.toLowerCase().includes(q) ||
      ep.method.toLowerCase().includes(q)
    )
  })

  return (
    <div className="flex h-screen overflow-hidden">
      <DocsSidebar activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="flex flex-col flex-1 min-w-0">
        <MobileNav activeSection={activeSection} onNavigate={handleNavigate} />

        {/* Search Bar */}
        <div className="sticky top-0 z-40 hidden lg:block border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
          <div className="flex items-center gap-3 px-8 py-3">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search endpoints..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <ScrollArea className="flex-1">
          <main className="max-w-4xl mx-auto px-4 py-8 lg:px-8 lg:py-12">
            <div className="space-y-12">
              {/* Getting Started */}
              {!searchQuery && <GettingStarted />}

              {/* Authentication */}
              {!searchQuery && <AuthSection />}

              {/* Endpoints */}
              {!searchQuery && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">API Reference</h2>
                  <p className="text-sm text-muted-foreground mb-8">
                    Complete reference for all available Hamlib API endpoints.
                  </p>
                </div>
              )}

              {filteredEndpoints.map((ep) => (
                <EndpointCard
                  key={ep.id}
                  id={ep.id}
                  method={ep.method}
                  path={ep.path}
                  description={ep.description}
                  parameters={ep.parameters}
                  requestExample={ep.requestExample}
                  responseExample={ep.responseExample}
                  curlExample={ep.curlExample}
                />
              ))}

              {searchQuery && filteredEndpoints.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">
                    No endpoints match &quot;{searchQuery}&quot;
                  </p>
                </div>
              )}

              {/* API Playground */}
              {!searchQuery && (
                <>
                  <div className="border-t border-border" />
                  <ApiPlayground />
                </>
              )}

              {/* Footer */}
              {!searchQuery && (
                <footer className="border-t border-border pt-8 pb-4">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>Hamlib API Documentation v4.5.0</p>
                    <div className="flex items-center gap-6">
                      <a href="https://hamlib.github.io" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                        Hamlib Project
                      </a>
                      <a href="https://github.com/Hamlib/Hamlib" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                      <a href="#getting-started" className="hover:text-foreground transition-colors">
                        Back to top
                      </a>
                    </div>
                  </div>
                </footer>
              )}
            </div>
          </main>
        </ScrollArea>
      </div>
    </div>
  )
}
