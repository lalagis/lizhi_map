import axios from 'axios'

export default defineEventHandler(async (event) => {
  const body: { id: number } = await readBody(event)
  const { id } = body

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL

  if (!id) return { "delete-point": false }
  
  const res = await axios.delete(apiBase + '/point' + id.toString(), {
    headers: {
      'Content-Type': 'application/json'
    },
  })

  return {
    "delete-point": res.data as boolean
  }
})