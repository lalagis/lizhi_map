import axios from 'axios'
import { Feature } from 'geojson'

interface PostPolygonBody {
  geometry: Feature
  recommendedRouteId?: number
}

export default defineEventHandler(async (event) => {
  const body: PostPolygonBody = await readBody(event)
  const { geometry, recommendedRouteId } = body

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL
  
  const res = await axios.post(apiBase + '/polygon', {
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      geometry,
      recommendedRouteId
    }
  })

  return {
    "post-polygon": res.data as boolean
  }
})