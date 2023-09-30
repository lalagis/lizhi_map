import axios from 'axios'
import { Geometry } from 'geojson'

interface PutLinestringBody {
  reason?: string
  geometry?: Geometry
}

export default defineEventHandler(async (event) => {
  if (!event.context.params?.id) return { "put-linestring": false }

  const id: number = parseInt(event.context.params.id)

  const request: { body: PutLinestringBody } = await readBody(event)
  const { reason, geometry } = request.body

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL
  
  const res = await axios.put(apiBase + '/linestring/' + id.toString(), {
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      geometry,
      reason
    }
  })

  return {
    "put-linestring": res.data as boolean
  }
})