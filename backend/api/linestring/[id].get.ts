import axios from 'axios'

export default defineEventHandler(async (event) => {
  if (!event.context.params?.id) return { "linestring": undefined }

  const id: number = parseInt(event.context.params.id)

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL
  
  const res = await axios.get(apiBase + '/linestring/' + id.toString(), {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return {
    "linestring": res.data as Linestring
  }
})