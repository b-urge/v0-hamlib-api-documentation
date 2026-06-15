# World Bank Indicators API

> A reference guide to the World Bank Indicators API — a free, public REST API providing access to global development data including economic indicators, country profiles, and time-series statistics.

The World Bank Indicators API gives developers programmatic access to over 16,000 indicators covering topics such as economic growth, education, health, the environment, and more. The API is completely open — **no authentication or API key is required**.

---

## Table of Contents

- [Overview](#overview)
- [Base URL](#base-url)
- [Response Formats](#response-formats)
- [Pagination](#pagination)
- [Language Support](#language-support)
- [API Resources](#api-resources)
  - [Country Queries](#country-queries)
  - [Indicator Queries](#indicator-queries)
  - [Indicator Data Queries](#indicator-data-queries)
  - [Topic Queries](#topic-queries)
  - [Aggregate / Region Queries](#aggregate--region-queries)
  - [Income Level Queries](#income-level-queries)
  - [Lending Type Queries](#lending-type-queries)
  - [Source Queries](#source-queries)
- [Filtering & Parameters](#filtering--parameters)
- [Date Ranges](#date-ranges)
- [Footer / Metadata](#footer--metadata)
- [Error Handling](#error-handling)
- [Code Examples](#code-examples)
- [Resources](#resources)

---

## Overview

The Indicators API provides access to nearly all of the World Bank's time-series development data. Each request returns a paginated set of results, and almost every query supports both **JSON** and **XML** output.

| Property | Value |
| --- | --- |
| Protocol | HTTPS REST |
| Authentication | None required |
| Formats | JSON, XML, JSONP |
| Default format | XML |
| Rate limits | No published hard limit (be respectful) |
| Versioning | `v2` (current) |

---

## Base URL

All API calls are made against the following base URL:

```
https://api.worldbank.org/v2/
```

A basic call structure looks like this:

```
https://api.worldbank.org/v2/{resource}/{id}/{sub-resource}/{id}?{parameters}
```

**Example:** Fetch GDP (current US$) for Brazil as JSON:

```
https://api.worldbank.org/v2/country/br/indicator/NY.GDP.MKTP.CD?format=json
```

---

## Response Formats

By default the API returns **XML**. To get JSON, append the `format` query parameter:

```
?format=json
```

| Format | Parameter | Notes |
| --- | --- | --- |
| XML | `?format=xml` | Default if no format specified |
| JSON | `?format=json` | Recommended for most applications |
| JSONP | `?format=jsonP&prefix=callback` | Wraps JSON in a callback for browser use |

Most JSON responses are an **array of two elements**: the first contains pagination metadata, the second contains the actual data.

```json
[
  {
    "page": 1,
    "pages": 1,
    "per_page": 50,
    "total": 1
  },
  [
    {
      "id": "BRA",
      "iso2Code": "BR",
      "name": "Brazil",
      "region": { "id": "LCN", "value": "Latin America & Caribbean" },
      "incomeLevel": { "id": "UMC", "value": "Upper middle income" },
      "capitalCity": "Brasilia",
      "longitude": "-47.9292",
      "latitude": "-15.7801"
    }
  ]
]
```

---

## Pagination

Results are paginated. Use these query parameters to navigate:

| Parameter | Description | Example |
| --- | --- | --- |
| `page` | The page number to retrieve | `page=2` |
| `per_page` | Number of results per page (max 32,500) | `per_page=100` |

**Example:** Get the second page of countries, 100 per page:

```
https://api.worldbank.org/v2/country?format=json&per_page=100&page=2
```

---

## Language Support

The API supports multiple languages. Insert the two-letter language code immediately after the base URL:

```
https://api.worldbank.org/v2/{language}/country/br?format=json
```

Supported languages include: `en` (English), `es` (Spanish), `fr` (French), `ar` (Arabic), `zh` (Chinese). Example:

```
https://api.worldbank.org/v2/es/country/br?format=json
```

---

## API Resources

### Country Queries

Retrieve information about countries, regions, and country groups.

| Query | Description |
| --- | --- |
| `/v2/country` | List all countries and aggregates |
| `/v2/country/{code}` | A single country (e.g. `br`, `usa`) |
| `/v2/country/{code1};{code2}` | Multiple countries (semicolon-separated) |

**Example:**

```
https://api.worldbank.org/v2/country/br;cn;us?format=json
```

You can also filter countries by region, income level, or lending type:

```
https://api.worldbank.org/v2/country?incomeLevel=LIC&format=json
https://api.worldbank.org/v2/country?region=SSF&format=json
https://api.worldbank.org/v2/country?lendingType=IBD&format=json
```

---

### Indicator Queries

List the indicators (metrics) available in the API.

| Query | Description |
| --- | --- |
| `/v2/indicator` | List all indicators |
| `/v2/indicator/{id}` | Details for a single indicator |
| `/v2/source/{id}/indicator` | Indicators for a specific data source |
| `/v2/topic/{id}/indicator` | Indicators for a specific topic |

**Example:** Look up the GDP indicator definition:

```
https://api.worldbank.org/v2/indicator/NY.GDP.MKTP.CD?format=json
```

---

### Indicator Data Queries

This is the core of the API — retrieve actual time-series values for one or more countries.

```
/v2/country/{country}/indicator/{indicator}
```

**Example:** Total population of China and the United States:

```
https://api.worldbank.org/v2/country/cn;us/indicator/SP.POP.TOTL?format=json
```

Combine with a date range and pagination:

```
https://api.worldbank.org/v2/country/br/indicator/NY.GDP.MKTP.CD?date=2010:2020&format=json&per_page=50
```

Use `all` to retrieve data for every country:

```
https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?date=2020&format=json
```

---

### Topic Queries

Indicators are grouped into 21 topics (e.g. Agriculture, Health, Education, Climate).

| Query | Description |
| --- | --- |
| `/v2/topic` | List all topics |
| `/v2/topic/{id}` | Details for one topic |
| `/v2/topic/{id}/indicator` | All indicators under a topic |

**Example:**

```
https://api.worldbank.org/v2/topic?format=json
https://api.worldbank.org/v2/topic/7/indicator?format=json
```

---

### Aggregate / Region Queries

Retrieve data aggregated by geographic region.

| Query | Description |
| --- | --- |
| `/v2/region` | List all regions |
| `/v2/country/{region}/indicator/{id}` | Indicator data for a region |

**Example:** GDP for the Sub-Saharan Africa aggregate:

```
https://api.worldbank.org/v2/country/SSF/indicator/NY.GDP.MKTP.CD?format=json
```

---

### Income Level Queries

| Query | Description |
| --- | --- |
| `/v2/incomeLevel` | List all income level classifications |
| `/v2/incomeLevel/{id}` | A single income level |

Common income level codes: `HIC` (High income), `UMC` (Upper middle income), `LMC` (Lower middle income), `LIC` (Low income).

```
https://api.worldbank.org/v2/incomeLevel?format=json
```

---

### Lending Type Queries

| Query | Description |
| --- | --- |
| `/v2/lendingType` | List all lending types |
| `/v2/lendingType/{id}` | A single lending type |

Codes: `IBD` (IBRD), `IDB` (Blend), `IDX` (IDA), `LNX` (Not classified).

```
https://api.worldbank.org/v2/lendingType?format=json
```

---

### Source Queries

Data comes from multiple sources (e.g. World Development Indicators, Doing Business).

| Query | Description |
| --- | --- |
| `/v2/source` | List all data sources |
| `/v2/source/{id}` | A single source |

```
https://api.worldbank.org/v2/source?format=json
```

---

## Filtering & Parameters

Common query parameters that can be combined on most endpoints:

| Parameter | Description | Example |
| --- | --- | --- |
| `format` | Response format (`json`, `xml`, `jsonP`) | `format=json` |
| `per_page` | Results per page | `per_page=100` |
| `page` | Page number | `page=2` |
| `date` | Year or year range | `date=2000:2020` |
| `mrv` | Most Recent Values (number of periods) | `mrv=5` |
| `gapfill` | Fill gaps with previous value (`Y`/`N`) | `gapfill=Y` |
| `frequency` | Data frequency (`Y`, `Q`, `M`) | `frequency=M` |
| `source` | Filter by data source id | `source=2` |
| `region` | Filter by region code | `region=SSF` |
| `incomeLevel` | Filter by income level code | `incomeLevel=HIC` |
| `lendingType` | Filter by lending type code | `lendingType=IBD` |

---

## Date Ranges

The `date` parameter accepts several formats:

| Format | Meaning | Example |
| --- | --- | --- |
| Single year | One year | `date=2020` |
| Year range | Inclusive range | `date=2000:2020` |
| Month range | Monthly data | `date=2010M01:2010M12` |
| Quarter range | Quarterly data | `date=2010Q1:2012Q3` |
| Year-to-date | YTD values | `date=YTD:2020` |

Alternatively, use `mrv` to get the most recent N values without specifying years:

```
https://api.worldbank.org/v2/country/br/indicator/NY.GDP.MKTP.CD?mrv=10&format=json
```

---

## Footer / Metadata

For data queries, the API can append metadata about the indicator and last-updated date by setting:

```
?footnote=y
```

The first element of every JSON response always contains pagination metadata:

```json
{
  "page": 1,
  "pages": 3,
  "per_page": 50,
  "total": 132,
  "sourceid": "2",
  "lastupdated": "2024-09-19"
}
```

---

## Error Handling

The API returns a structured message envelope rather than HTTP error codes for most issues. Inspect the `message` array in the response.

```json
[
  {
    "message": [
      {
        "id": "120",
        "key": "Invalid value",
        "value": "The provided parameter value is not valid"
      }
    ]
  }
]
```

| Code | Meaning |
| --- | --- |
| `120` | Invalid value provided for a parameter |
| `150` | Invalid format requested |
| `160` | Data not found for the requested query |
| `200` | Request returned successfully (no error) |

If a country code or indicator does not exist, the API typically returns a `message` element describing the problem with HTTP status `200`.

---

## Code Examples

### cURL

```bash
curl "https://api.worldbank.org/v2/country/br/indicator/NY.GDP.MKTP.CD?date=2018:2022&format=json"
```

### JavaScript (fetch)

```javascript
async function getGDP(countryCode, indicator) {
  const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json&per_page=100`
  const res = await fetch(url)
  const [metadata, data] = await res.json()

  console.log(`Total records: ${metadata.total}`)
  return data
}

getGDP("br", "NY.GDP.MKTP.CD").then((rows) => {
  rows.forEach((row) => {
    console.log(`${row.date}: ${row.value}`)
  })
})
```

### Python (requests)

```python
import requests

def get_indicator(country, indicator, start=2010, end=2020):
    url = f"https://api.worldbank.org/v2/country/{country}/indicator/{indicator}"
    params = {"format": "json", "date": f"{start}:{end}", "per_page": 100}
    response = requests.get(url, params=params)
    metadata, data = response.json()

    print(f"Total records: {metadata['total']}")
    for row in data:
        print(f"{row['date']}: {row['value']}")
    return data

get_indicator("br", "NY.GDP.MKTP.CD")
```

---

## Resources

- [Official API Documentation](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation)
- [API Basic Call Structures](https://datahelpdesk.worldbank.org/knowledgebase/articles/898581-api-basic-call-structures)
- [Developer Information](https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information)
- [Data Catalog](https://datacatalog.worldbank.org/)
- [World Bank Open Data](https://data.worldbank.org/)

---

> **Note:** This is an unofficial reference summary. Always consult the [official documentation](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation) for the most up-to-date details. The World Bank Indicators API is provided free of charge under the World Bank's [Terms of Use](https://www.worldbank.org/en/about/legal/terms-of-use-for-datasets).
