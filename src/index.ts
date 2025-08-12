import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ text: "hello world" }, 200)
})

app.post('/', async (c) => {
  if (c.req.header('content-type') !== 'application/json') {
    return c.text('Bad Request', 400)
  }
  const body = await c.req.json()
  return c.json(body, 201)
})

serve({
  fetch: app.fetch,
  port: 8080
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
