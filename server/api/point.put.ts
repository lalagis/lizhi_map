import axios from 'axios'

type MatureStatus = 'IMMATURE' | 'PARTIALLY' | 'MATURE' | 'FULLY'

interface PutPointBody {
  id: number
  lng?: number
  lat?: number
  matureStatus?: MatureStatus
}

export default defineEventHandler(async (event) => {
  const body: PutPointBody = await readBody(event)
  const { id, lng, lat, matureStatus } = body

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL

  if (!id) return { "put-point": false }
  
  const res = await axios.put(apiBase + '/point' + id.toString(), {
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