"use client"

import { useState, useMemo, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Play, Copy, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CodeBlock } from "@/components/code-block"

const endpoints = [
  {
    id: "get-frequency",
    method: "GET",
    path: "/api/radio/frequency",
    label: "Get Current Frequency",
    params: [
      { name: "vfo", label: "VFO", type: "query", default: "currVFO" },
    ],
    body: null,
  },
  {
    id: "set-frequency",
    method: "POST",
    path: "/api/radio/frequency",
    label: "Set Frequency",
    params: [],
    body: { frequency: 14250000, vfo: "VFOA" },
  },
  {
    id: "get-mode",
    method: "GET",
    path: "/api/radio/mode",
    label: "Get Operating Mode",
    params: [
      { name: "vfo", label: "VFO", type: "query", default: "currVFO" },
    ],
    body: null,
  },
  {
    id: "set-position",
    method: "POST",
    path: "/api/rotator/position",
    label: "Set Antenna Position",
    params: [],
    body: { azimuth: 180.5, elevation: 45.0 },
  },
  {
    id: "get-vfo",
    method: "GET",
    path: "/api/radio/vfo",
    label: "Get VFO",
    params: [],
    body: null,
  },
  {
    id: "set-vfo",
    method: "POST",
    path: "/api/radio/vfo",
    label: "Set VFO",
    params: [],
    body: { vfo: "VFOA" },
  },
  {
    id: "get-position",
    method: "GET",
    path: "/api/rotator/position",
    label: "Get Antenna Position",
    params: [],
    body: null,
  },
]

const methodColors: Record<string, string> = {
  GET: "bg-[hsl(142,76%,36%)]/15 text-[hsl(142,76%,46%)] border-[hsl(142,76%,36%)]/30",
  POST: "bg-[hsl(217,91%,60%)]/15 text-[hsl(217,91%,70%)] border-[hsl(217,91%,60%)]/30",
}

const sampleResponses: Record<string, string> = {
  "get-frequency": JSON.stringify(
    {
      status: "ok",
      data: {
        frequency: 14250000,
        vfo: "VFOA",
        formatted: "14.250 MHz",
      },
    },
    null,
    2
  ),
  "set-frequency": JSON.stringify(
    {
      status: "ok",
      message: "Frequency set successfully",
      data: { frequency: 14250000, vfo: "VFOA" },
    },
    null,
    2
  ),
  "get-mode": JSON.stringify(
    {
      status: "ok",
      data: {
        mode: "USB",
        passband_width: 2400,
        vfo: "VFOA",
      },
    },
    null,
    2
  ),
  "set-position": JSON.stringify(
    {
      status: "ok",
      message: "Position set successfully",
      data: { azimuth: 180.5, elevation: 45.0 },
    },
    null,
    2
  ),
  "get-vfo": JSON.stringify(
    {
      status: "ok",
      data: { vfo: "VFOA" },
    },
    null,
    2
  ),
  "set-vfo": JSON.stringify(
    {
      status: "ok",
      message: "VFO set successfully",
      data: { vfo: "VFOA" },
    },
    null,
    2
  ),
  "get-position": JSON.stringify(
    {
      status: "ok",
      data: { azimuth: 180.5, elevation: 45.0 },
    },
    null,
    2
  ),
}

export function ApiPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0].id)
  const [baseUrl, setBaseUrl] = useState("http://localhost:4532")
  const [apiKey, setApiKey] = useState("your-api-key")
  const [authMethod, setAuthMethod] = useState("api-key")
  const [bodyValues, setBodyValues] = useState<Record<string, string>>({})
  const [response, setResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [curlCopied, setCurlCopied] = useState(false)

  const endpoint = useMemo(
    () => endpoints.find((e) => e.id === selectedEndpoint) || endpoints[0],
    [selectedEndpoint]
  )

  const curlCommand = useMemo(() => {
    let cmd = `curl -X ${endpoint.method} "${baseUrl}${endpoint.path}`

    if (endpoint.params.length > 0) {
      const queryParams = endpoint.params
        .map((p) => `${p.name}=${bodyValues[p.name] || p.default || ""}`)
        .join("&")
      cmd += `?${queryParams}`
    }
    cmd += '"'

    if (authMethod === "api-key") {
      cmd += ` \\\n  -H "X-API-Key: ${apiKey}"`
    } else if (authMethod === "bearer") {
      cmd += ` \\\n  -H "Authorization: Bearer ${apiKey}"`
    }

    cmd += ' \\\n  -H "Content-Type: application/json"'

    if (endpoint.body) {
      const body: Record<string, unknown> = {}
      for (const [key, defaultVal] of Object.entries(endpoint.body)) {
        body[key] = bodyValues[key] || defaultVal
      }
      cmd += ` \\\n  -d '${JSON.stringify(body, null, 2)}'`
    }

    return cmd
  }, [endpoint, baseUrl, apiKey, authMethod, bodyValues])

  const handleTryIt = useCallback(() => {
    setIsLoading(true)
    setResponse(null)
    setTimeout(() => {
      setResponse(sampleResponses[endpoint.id] || '{"status": "ok"}')
      setIsLoading(false)
    }, 800)
  }, [endpoint.id])

  const handleCopyCurl = useCallback(() => {
    navigator.clipboard.writeText(curlCommand)
    setCurlCopied(true)
    setTimeout(() => setCurlCopied(false), 2000)
  }, [curlCommand])

  return (
    <section id="playground" className="scroll-mt-20">
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <Play className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">API Playground</h3>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Test API endpoints interactively. Select an endpoint, configure parameters, and try it out.
          </p>
        </div>

        <div className="p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: Configuration */}
            <div className="space-y-5">
              {/* Endpoint Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Endpoint</Label>
                <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {endpoints.map((ep) => (
                      <SelectItem key={ep.id} value={ep.id}>
                        <span className="flex items-center gap-2">
                          <Badge
                            className={cn(
                              "rounded px-1.5 py-0 text-[10px] font-bold border",
                              methodColors[ep.method]
                            )}
                          >
                            {ep.method}
                          </Badge>
                          {ep.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Base URL */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Base URL</Label>
                <Input
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="font-mono text-sm bg-background"
                  placeholder="http://localhost:4532"
                />
              </div>

              {/* Authentication */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Authentication</Label>
                <Select value={authMethod} onValueChange={setAuthMethod}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api-key">API Key (Header)</SelectItem>
                    <SelectItem value="bearer">Bearer Token</SelectItem>
                    <SelectItem value="none">No Authentication</SelectItem>
                  </SelectContent>
                </Select>
                {authMethod !== "none" && (
                  <Input
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="font-mono text-sm bg-background mt-2"
                    placeholder={authMethod === "bearer" ? "Bearer token" : "API key"}
                  />
                )}
              </div>

              {/* Query Parameters */}
              {endpoint.params.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Query Parameters</Label>
                  {endpoint.params.map((param) => (
                    <div key={param.name} className="space-y-1">
                      <span className="text-xs text-muted-foreground font-mono">{param.name}</span>
                      <Input
                        value={bodyValues[param.name] || param.default || ""}
                        onChange={(e) =>
                          setBodyValues((prev) => ({ ...prev, [param.name]: e.target.value }))
                        }
                        className="font-mono text-sm bg-background"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Request Body */}
              {endpoint.body && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Request Body</Label>
                  {Object.entries(endpoint.body).map(([key, defaultVal]) => (
                    <div key={key} className="space-y-1">
                      <span className="text-xs text-muted-foreground font-mono">{key}</span>
                      <Input
                        value={bodyValues[key] || String(defaultVal)}
                        onChange={(e) =>
                          setBodyValues((prev) => ({ ...prev, [key]: e.target.value }))
                        }
                        className="font-mono text-sm bg-background"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={handleTryIt}
                  disabled={isLoading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isLoading ? "Sending..." : "Try It"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCopyCurl}
                >
                  {curlCopied ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  {curlCopied ? "Copied" : "Copy cURL"}
                </Button>
              </div>
            </div>

            {/* Right: Generated cURL & Response */}
            <div className="space-y-4">
              <CodeBlock code={curlCommand} language="bash" title="Generated cURL Command" />
              {response && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <CodeBlock code={response} language="json" title="Response" />
                </div>
              )}
              {isLoading && (
                <div className="flex items-center justify-center py-12 rounded-lg border border-border bg-secondary/20">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    Sending request...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
