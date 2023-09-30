import axios from 'axios'
import { Geometry } from 'geojson'

interface PostLinestringBody {
  geometry: Geometry
  reason?: string
}

export default defineEventHandler(async (event) => {
  const body: PostLinestringBody = await readBody(event)
  const { geometry, reason } = body

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL
  
  const res = await axios.post(apiBase + '/linestring', {
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      geometry,
      reason
    }
  })

  return {
    "post-linestring": res.data as boolean
  }
})