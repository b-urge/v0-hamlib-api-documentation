"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Parameter {
  name: string
  type: string
  required: boolean
  description: string
}

interface EndpointCardProps {
  id: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  path: string
  description: string
  parameters: Parameter[]
  requestExample?: string
  responseExample: string
  curlExample: string
}

const methodColors: Record<string, string> = {
  GET: "bg-[hsl(142,76%,36%)]/15 text-[hsl(142,76%,46%)] border-[hsl(142,76%,36%)]/30",
  POST: "bg-[hsl(217,91%,60%)]/15 text-[hsl(217,91%,70%)] border-[hsl(217,91%,60%)]/30",
  PUT: "bg-[hsl(38,92%,50%)]/15 text-[hsl(38,92%,60%)] border-[hsl(38,92%,50%)]/30",
  DELETE: "bg-[hsl(0,84%,60%)]/15 text-[hsl(0,84%,70%)] border-[hsl(0,84%,60%)]/30",
  PATCH: "bg-[hsl(280,65%,60%)]/15 text-[hsl(280,65%,70%)] border-[hsl(280,65%,60%)]/30",
}

export function EndpointCard({
  id,
  method,
  path,
  description,
  parameters,
  requestExample,
  responseExample,
  curlExample,
}: EndpointCardProps) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="rounded-xl border border-border bg-card p-6">
        {/* Header */}
        <div className="flex flex-wrap items-start gap-3 mb-4">
          <Badge
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-bold tracking-wide border",
              methodColors[method]
            )}
          >
            {method}
          </Badge>
          <code className="text-base font-mono font-medium text-foreground">{path}</code>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">{description}</p>

        {/* Parameters Table */}
        {parameters.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">Parameters</h4>
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Name</th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Type</th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Required</th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parameters.map((param) => (
                      <tr key={param.name} className="border-t border-border">
                        <td className="px-4 py-2.5">
                          <code className="text-xs font-mono bg-secondary/50 px-1.5 py-0.5 rounded text-foreground">
                            {param.name}
                          </code>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{param.type}</td>
                        <td className="px-4 py-2.5">
                          {param.required ? (
                            <span className="text-xs font-medium text-[hsl(142,76%,46%)]">Required</span>
                          ) : (
                            <span className="text-xs text-muted-foreground">Optional</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Code Examples */}
        <Tabs defaultValue="curl" className="w-full">
          <TabsList className="bg-secondary/50 mb-3">
            <TabsTrigger value="curl" className="text-xs">cURL</TabsTrigger>
            {requestExample && (
              <TabsTrigger value="request" className="text-xs">Request Body</TabsTrigger>
            )}
            <TabsTrigger value="response" className="text-xs">Response</TabsTrigger>
          </TabsList>
          <TabsContent value="curl">
            <CodeBlock code={curlExample} language="bash" title="cURL" />
          </TabsContent>
          {requestExample && (
            <TabsContent value="request">
              <CodeBlock code={requestExample} language="json" title="Request Body" />
            </TabsContent>
          )}
          <TabsContent value="response">
            <CodeBlock code={responseExample} language="json" title="Response (200 OK)" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
