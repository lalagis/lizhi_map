import axios from 'axios'

export default defineEventHandler(async (event) => {
  if (!event.context.params?.id) return { "delete-linestring": false }

  const id: number = parseInt(event.context.params.id)

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL
  
  const res = await axios.delete(apiBase + '/linestring/' + id.toString(), {
    headers: {
      'Content-Type': 'application/json'
    },
  })

  return {
    "delete-linestring": res.data as boolean
  }
})