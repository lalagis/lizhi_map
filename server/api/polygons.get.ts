import axios from 'axios'
import { FeatureCollection } from 'geojson'
import type { Geometry } from 'geojson'

interface PolygonResponse {
  id: number
  geometry: string // geojson like string
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL

  const collection: FeatureCollection = {
    "type": "FeatureCollection",
    features: []
  }
  
  const res = await axios.get(apiBase + '/polygons', {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  res.data.collection.forEach((item: PolygonResponse) => {
    collection.features.push({
      type: 'Feature',
      properties: {
        id: item.id
      },
      geometry: JSON.parse(item.geometry) as Geometry
    })
  })

  return {
    "polygons": collection
  }
})