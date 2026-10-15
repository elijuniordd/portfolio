import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

const root = fileURLToPath(new URL('.', import.meta.url))

// Em produção a Vercel executa os arquivos de /api. No `npm run dev`,
// este plugin faz o mesmo para que /api/wakatime funcione localmente.
function devApi() {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/wakatime', async (req, res) => {
        const { default: handler } = await server.ssrLoadModule('/api/wakatime.js')
        await handler(req, res)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, root, ''))
  return {
    plugins: [react(), tailwindcss(), devApi()],
  }
})
