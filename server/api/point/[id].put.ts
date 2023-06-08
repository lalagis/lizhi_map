import axios from 'axios'

interface PutPointBody {
  lng?: number
  lat?: number
  matureStatus?: MatureStatus
}

export default defineEventHandler(async (event) => {
  if (!event.context.params?.id) return { "put-point": false }

  const id: number = parseInt(event.context.params.id)

  const request: { body: PutPointBody } = await readBody(event)
  const { lng, lat, matureStatus } = request.body

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL
  
  const res = await axios.put(apiBase + '/point/' + id.toString(), {
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      lng,
      lat,
      matureStatus
    }
  })

  return {
    "put-point": res.data as boolean
  }
})