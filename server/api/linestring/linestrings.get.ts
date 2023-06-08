import axios from 'axios'
import { FeatureCollection } from 'geojson'
import type { Geometry } from 'geojson'

interface LinestringResponse {
  id: number
  line: string // geojson like string
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL

  const collection: FeatureCollection = {
    "type": "FeatureCollection",
    features: []
  }
  
  const res = await axios.get(apiBase + '/linestrings', {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  res.data.collection.forEach((item: LinestringResponse) => {
    collection.features.push({
      type: 'Feature',
      properties: {
        id: item.id
      },
      geometry: JSON.parse(item.line) as Geometry
    })
  })

  return {
    "linestrings": collection
  }
})