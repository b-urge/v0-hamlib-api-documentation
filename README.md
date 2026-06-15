# Hamlib API

The Hamlib API provides a RESTful interface for controlling amateur radio equipment and antenna rotators. This documentation covers all available endpoints, authentication methods, and includes an interactive playground for testing.

## Overview

Hamlib (Ham Radio Control Library) provides a standardized way to control a wide
range of radio transceivers and antenna rotators. This RESTful API wraps the
Hamlib backend so you can read and control your equipment over HTTP from any
language or platform.

| Feature        | Description                                              |
| -------------- | -------------------------------------------------------- |
| Protocol       | REST over HTTP/HTTPS                                      |
| Format         | JSON                                                     |
| Authentication | API Key or Bearer Token                                  |
| Equipment      | Transceivers (rigs) and antenna rotators                 |
| Version        | v4.5.0                                                   |

## Base URL

All API requests are made to the following base URL:

```
https://api.hamlib.dev/v1
```

All requests must be made over HTTPS. Requests made over plain HTTP will be
rejected.

## Authentication

The Hamlib API supports two authentication methods. Include your credentials
with every request.

### API Key

Pass your API key in the `X-API-Key` header:

```bash
curl https://api.hamlib.dev/v1/rig/frequency \
  -H "X-API-Key: your_api_key_here"
```

### Bearer Token

Alternatively, pass a bearer token in the `Authorization` header:

```bash
curl https://api.hamlib.dev/v1/rig/frequency \
  -H "Authorization: Bearer your_token_here"
```

> **Note:** Keep your credentials secure. Never commit API keys to version
> control or expose them in client-side code.

## Response Format

All responses are returned as JSON. A successful response includes a `status`
field and the requested data:

```json
{
  "status": "ok",
  "data": {
    "frequency": 14250000,
    "vfo": "VFOA"
  }
}
```

Error responses include a `status` of `"error"` and a descriptive message:

```json
{
  "status": "error",
  "code": "RIG_EINVAL",
  "message": "Invalid parameter value"
}
```

## Endpoints

### Radio Control

#### Get Frequency

Returns the current operating frequency of the active VFO, in Her
