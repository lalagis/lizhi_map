import axios from 'axios'
import { Geometry } from 'geojson'

interface PutLinestringBody {
  id: number
  reason?: string
  geometry?: Geometry
}

export default defineEventHandler(async (event) => {
  const body: PutLinestringBody = await readBody(event)
  const { id, reason, geometry } = body

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL

  if (!id) return { "put-linestring": false }
  
  const res = await axios.put(apiBase + '/linestring' + id.toString(), {
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