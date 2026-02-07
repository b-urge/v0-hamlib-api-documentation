export const endpoints = [
  {
    id: "get-frequency",
    method: "GET" as const,
    path: "/api/radio/frequency",
    description:
      "Retrieve the current operating frequency of the radio. Returns the frequency in Hz along with the active VFO and a human-readable formatted string.",
    parameters: [
      {
        name: "vfo",
        type: "string",
        required: false,
        description: "Target VFO (e.g., VFOA, VFOB, currVFO). Defaults to currVFO.",
      },
    ],
    requestExample: undefined,
    responseExample: JSON.stringify(
      {
        status: "ok",
        data: {
          frequency: 14250000,
          vfo: "VFOA",
          formatted: "14.250 MHz",
          band: "20m",
        },
      },
      null,
      2
    ),
    curlExample: `curl -X GET "http://localhost:4532/api/radio/frequency?vfo=currVFO" \\
  -H "X-API-Key: your-api-key" \\
  -H "Content-Type: application/json"`,
  },
  {
    id: "set-frequency",
    method: "POST" as const,
    path: "/api/radio/frequency",
    description:
      "Set the operating frequency of the radio. Accepts frequency in Hz and optionally specifies which VFO to tune.",
    parameters: [
      {
        name: "frequency",
        type: "integer",
        required: true,
        description: "Target frequency in Hz (e.g., 14250000 for 14.250 MHz).",
      },
      {
        name: "vfo",
        type: "string",
        required: false,
        description: "Target VFO (e.g., VFOA, VFOB). Defaults to currVFO.",
      },
    ],
    requestExample: JSON.stringify(
      {
        frequency: 14250000,
        vfo: "VFOA",
      },
      null,
      2
    ),
    responseExample: JSON.stringify(
      {
        status: "ok",
        message: "Frequency set successfully",
        data: {
          frequency: 14250000,
          vfo: "VFOA",
          formatted: "14.250 MHz",
        },
      },
      null,
      2
    ),
    curlExample: `curl -X POST "http://localhost:4532/api/radio/frequency" \\
  -H "X-API-Key: your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "frequency": 14250000,
    "vfo": "VFOA"
  }'`,
  },
  {
    id: "get-mode",
    method: "GET" as const,
    path: "/api/radio/mode",
    description:
      "Get the current operating mode and passband width of the radio. Returns mode identifier (e.g., USB, LSB, CW, FM) and the passband width in Hz.",
    parameters: [
      {
        name: "vfo",
        type: "string",
        required: false,
        description: "Target VFO. Defaults to currVFO.",
      },
    ],
    requestExample: undefined,
    responseExample: JSON.stringify(
      {
        status: "ok",
        data: {
          mode: "USB",
          passband_width: 2400,
          vfo: "VFOA",
          description: "Upper Sideband",
        },
      },
      null,
      2
    ),
    curlExample: `curl -X GET "http://localhost:4532/api/radio/mode?vfo=currVFO" \\
  -H "X-API-Key: your-api-key" \\
  -H "Content-Type: application/json"`,
  },
  {
    id: "get-vfo",
    method: "GET" as const,
    path: "/api/radio/vfo",
    description:
      "Get the currently active VFO (Variable Frequency Oscillator). Returns which VFO is currently selected for receive and transmit operations.",
    parameters: [],
    requestExample: undefined,
    responseExample: JSON.stringify(
      {
        status: "ok",
        data: {
          vfo: "VFOA",
          split: false,
          satmode: false,
        },
      },
      null,
      2
    ),
    curlExample: `curl -X GET "http://localhost:4532/api/radio/vfo" \\
  -H "X-API-Key: your-api-key" \\
  -H "Content-Type: application/json"`,
  },
  {
    id: "set-vfo",
    method: "POST" as const,
    path: "/api/radio/vfo",
    description:
      "Set the active VFO. Switch between VFOs for receive and transmit operations. Supports standard VFO identifiers.",
    parameters: [
      {
        name: "vfo",
        type: "string",
        required: true,
        description: "VFO to select (VFOA, VFOB, VFOC, currVFO, VFO, MEM, Main, Sub).",
      },
    ],
    requestExample: JSON.stringify(
      {
        vfo: "VFOA",
      },
      null,
      2
    ),
    responseExample: JSON.stringify(
      {
        status: "ok",
        message: "VFO set successfully",
        data: {
          vfo: "VFOA",
        },
      },
      null,
      2
    ),
    curlExample: `curl -X POST "http://localhost:4532/api/radio/vfo" \\
  -H "X-API-Key: your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "vfo": "VFOA"
  }'`,
  },
  {
    id: "get-position",
    method: "GET" as const,
    path: "/api/rotator/position",
    description:
      "Get the current antenna rotator position. Returns azimuth (0-360 degrees) and elevation (0-90 degrees) of the antenna.",
    parameters: [],
    requestExample: undefined,
    responseExample: JSON.stringify(
      {
        status: "ok",
        data: {
          azimuth: 180.5,
          elevation: 45.0,
          target_azimuth: 180.5,
          target_elevation: 45.0,
          moving: false,
        },
      },
      null,
      2
    ),
    curlExample: `curl -X GET "http://localhost:4532/api/rotator/position" \\
  -H "X-API-Key: your-api-key" \\
  -H "Content-Type: application/json"`,
  },
  {
    id: "set-position",
    method: "POST" as const,
    path: "/api/rotator/position",
    description:
      "Set the antenna rotator position. Specify target azimuth and elevation for the antenna to move to. The rotator will begin moving immediately.",
    parameters: [
      {
        name: "azimuth",
        type: "number",
        required: true,
        description: "Target azimuth in degrees (0.0 - 360.0).",
      },
      {
        name: "elevation",
        type: "number",
        required: false,
        description: "Target elevation in degrees (0.0 - 90.0). Defaults to 0.",
      },
    ],
    requestExample: JSON.stringify(
      {
        azimuth: 180.5,
        elevation: 45.0,
      },
      null,
      2
    ),
    responseExample: JSON.stringify(
      {
        status: "ok",
        message: "Position set successfully",
        data: {
          azimuth: 180.5,
          elevation: 45.0,
          estimated_time: 12.5,
        },
      },
      null,
      2
    ),
    curlExample: `curl -X POST "http://localhost:4532/api/rotator/position" \\
  -H "X-API-Key: your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "azimuth": 180.5,
    "elevation": 45.0
  }'`,
  },
]
