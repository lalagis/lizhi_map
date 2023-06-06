import axios from 'axios'

type MatureStatus = 'IMMATURE' | 'PARTIALLY' | 'MATURE' | 'FULLY'

interface PostPointBody {
  lng: number
  lat: number
  matureStatus?: MatureStatus
}

export default defineEventHandler(async (event) => {
  const body: PostPointBody = await readBody(event)
  const { lng, lat, matureStatus } = body

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL
  
  const res = await axios.post(apiBase + '/point', {
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
    "post-point": res.data as boolean
  }
})