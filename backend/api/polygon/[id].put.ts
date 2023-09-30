import axios from 'axios'
import { Geometry } from 'geojson'

interface PutPolygonBody {
  geometry?: Geometry
  recommendedRouteId?: number
}

export default defineEventHandler(async (event) => {
  if (!event.context.params?.id) return { "put-polygon": false }

  const id: number = parseInt(event.context.params.id)

  const request: { body: PutPolygonBody } = await readBody(event)
  const { geometry, recommendedRouteId } = request.body

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL
  
  const res = await axios.put(apiBase + '/polygon/' + id.toString(), {
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