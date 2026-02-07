"use client"

import { CodeBlock } from "@/components/code-block"
import { Shield } from "lucide-react"

export function AuthSection() {
  return (
    <section id="authentication" className="scroll-mt-20">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Authentication</h2>
            <p className="text-sm text-muted-foreground">Secure your API requests</p>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          The Hamlib API supports two authentication methods. All authenticated requests
          must include the appropriate credentials in the request headers.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">API Key Authentication</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Include your API key in the X-API-Key header. This is the recommended method
              for server-to-server communication.
            </p>
            <CodeBlock
              code={`curl -H "X-API-Key: ham_k1abc2def3" \\
  http://localhost:4532/api/radio/frequency`}
              language="bash"
              title="API Key Header"
            />
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Bearer Token</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use a Bearer token in the Authorization header. Ideal for applications
              using OAuth2 or JWT-based authentication flows.
            </p>
            <CodeBlock
              code={`curl -H "Authorization: Bearer eyJhbGc..." \\
  http://localhost:4532/api/radio/frequency`}
              language="bash"
              title="Bearer Token"
            />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-secondary/20 p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">Rate Limiting</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            API requests are rate-limited to 100 requests per minute per API key.
            Rate limit headers are included in every response:
            <code className="mx-1 px-1.5 py-0.5 bg-secondary rounded text-foreground font-mono">X-RateLimit-Remaining</code>
            and
            <code className="mx-1 px-1.5 py-0.5 bg-secondary rounded text-foreground font-mono">X-RateLimit-Reset</code>.
          </p>
        </div>
      </div>
    </section>
  )
}
