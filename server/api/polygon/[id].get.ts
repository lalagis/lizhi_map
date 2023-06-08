import axios from 'axios'

export default defineEventHandler(async (event) => {
  if (!event.context.params?.id) return { "polygon": undefined }

  const id: number = parseInt(event.context.params.id)

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