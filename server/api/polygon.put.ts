import axios from 'axios'
import { Feature } from 'geojson'

interface PutPolygonBody {
  id: number
  geometry?: Feature
  recommendedRouteId?: number
}

export default defineEventHandler(async (event) => {
  const body: PutPolygonBody = await readBody(event)
  const { id, geometry, recommendedRouteId } = body

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL

  if (!id) return { "put-polygon": false }
  
  const res = await axios.put(apiBase + '/polygon' + id.toString(), {
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      geometry,
      recommendedRouteId
    }
  })

  return {
    "put-polygon": res.data as boolean
  }
})