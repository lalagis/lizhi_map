import axios from 'axios'

interface Polygon {
  id: number
  property: PolygonProperty
}

interface PolygonProperty {
  recommendedRouteId: number
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id: number = body.id

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL

  if (!id) return { "polygon": undefined }
  
  const res = await axios.get(apiBase + '/polygon/' + id.toString(), {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return {
    "polygon": res.data as Polygon
  }
})