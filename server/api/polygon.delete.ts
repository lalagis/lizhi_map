import axios from 'axios'

export default defineEventHandler(async (event) => {
  const body: { id: number } = await readBody(event)
  const { id } = body

  const config = useRuntimeConfig()
  const apiBase = config.public.API_URL

  if (!id) return { "delete-polygon": false }
  
  const res = await axios.delete(apiBase + '/polygon' + id.toString(), {
    headers: {
      'Content-Type': 'application/json'
    },
  })

  return {
    "delete-polygon": res.data as boolean
  }
})