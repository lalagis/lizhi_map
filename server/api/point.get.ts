import axios from 'axios'

interface PointProperty {
  matureStatus: MatureStatus
}

interface Point {
  id: number
  property: PointProperty
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id: number = body.id

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL

  if (!id) return { "point": undefined }
  
  const res = await axios.get(apiBase + '/point/' + id.toString(), {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return {
    "point": res.data as Point
  }
})