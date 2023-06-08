import axios from 'axios'

export default defineEventHandler(async (event) => {
  if (!event.context.params?.id) return { "delete-point": false }

  const id: number = parseInt(event.context.params.id)

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL
  
  const res = await axios.delete(apiBase + '/point/' + id.toString(), {
    headers: {
      'Content-Type': 'application/json'
    },
  })

  return {
    "delete-point": res.data as boolean
  }
})