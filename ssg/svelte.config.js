import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'
import brands from './src/lib/data/brands.json' assert { type: 'json' }
import watches from './src/lib/data/watches.json' assert { type: 'json' }

const routes = ['*']

for(let b of brands) {
  routes.push(`/brands/${b.name}`)
}

for(let w of watches) {
  routes.push(`/watches/${w.type}`)
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({ precompress: false }),
    prerender: {
      crawl: true,
      entries: routes
    }
  },
}

export default config
