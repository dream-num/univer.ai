import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

app.use('/pro', createProxyMiddleware({
  target: 'http://localhost:4322',
  changeOrigin: true,
  ws: true,
}))

app.use('/', createProxyMiddleware({
  target: 'http://localhost:4321',
  changeOrigin: true,
  ws: true,
}))

app.listen(3030, () => {
  console.log('Proxy server is running on port http://localhost:3030')
})
