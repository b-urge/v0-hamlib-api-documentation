"use client"

import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"

export function GettingStarted() {
  return (
    <section id="getting-started" className="scroll-mt-20">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-foreground">Getting Started</h2>
            <Badge variant="outline" className="text-xs">v4.5.0</Badge>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            The Hamlib API provides a RESTful interface for controlling amateur radio equipment
            and antenna rotators. This documentation covers all available endpoints, authentication
            methods, and includes an interactive playground for testing.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="w-10 h-10 rounded-lg bg-[hsl(142,76%,36%)]/10 flex items-center justify-center mb-3">
              <span className="text-sm font-bold text-[hsl(142,76%,46%)]">01</span>
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Install Hamlib</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Install the Hamlib library and ensure rigctld or rotctld is running on your system.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <span className="text-sm font-bold text-primary">02</span>
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Get API Key</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Generate an API key from your Hamlib dashboard to authenticate your requests.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="w-10 h-10 rounded-lg bg-[hsl(38,92%,50%)]/10 flex items-center justify-center mb-3">
              <span className="text-sm font-bold text-[hsl(38,92%,60%)]">03</span>
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Make Requests</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Start making API calls to control your radio or rotator using the endpoints below.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Base URL</h3>
          <CodeBlock
            code="http://localhost:4532/api"
            language="bash"
            title="Base URL"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Quick Example</h3>
          <CodeBlock
            code={`curl -X GET "http://localhost:4532/api/radio/frequency" \\
  -H "X-API-Key: your-api-key" \\
  -H "Content-Type: application/json"`}
            language="bash"
            title="Quick Start"
          />
        </div>
      </div>
    </section>
  )
}
