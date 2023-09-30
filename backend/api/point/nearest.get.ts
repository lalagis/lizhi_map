import axios from 'axios'
import { FeatureCollection } from 'geojson'
import type { Geometry } from 'geojson'

interface NearestPointsBody {
  lng: number
  lat: number
}

interface PointResponse {
  id: number
  location: string // geojson like string
  property: string // as json
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { lng, lat } = query

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL

  const collection: FeatureCollection = {
    "type": "FeatureCollection",
    features: []
  }
  
  const res = await axios.get(apiBase + '/points/nearest', {
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      lng,
      lat,
      distance: 500
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
    "nearest": collection
  }
})