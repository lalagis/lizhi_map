import axios from 'axios'
import { FeatureCollection } from 'geojson'
import type { Geometry } from 'geojson'

interface PointResponse {
  id: number
  location: string // geojson like string
  property: string // as json
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL

  const collection: FeatureCollection = {
    "type": "FeatureCollection",
    features: []
  }
  
  const res = await axios.get(apiBase + '/points', {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  res.data.collection.forEach((item: PointResponse) => {
    const { likes, matureStatus } = JSON.parse(item.property)

    collection.features.push({
      type: 'Feature',
      properties: {
        id: item.id,
        likes,
        matureStatus
      },
      geometry: JSON.parse(item.location) as Geometry
    })
  })

  return {
    "points": collection
  }
})