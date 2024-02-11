import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import getVideo from './getVideo'

const app = new Hono()

app.get('/getVideo/', getVideo);

const port = 3030
serve({
  fetch: app.fetch,
  port
})
