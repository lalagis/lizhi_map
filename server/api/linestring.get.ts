import axios from 'axios'

interface Polygon {
  id: number
}

interface LinestringProperty {
  reason: string
  relatedPolygons: Polygon[]
}

interface Linestring {
  id: number
  property: LinestringProperty
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id: number = body.id

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL

  if (!id) return { "linestring": undefined }
  
  const res = await axios.get(apiBase + '/linestring/' + id.toString(), {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return {
    "linestring": res.data as Linestring
  }
})