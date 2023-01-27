import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'
import brands from './src/lib/data/brands.json' assert { type: 'json' }
import watches from './src/lib/data/watches.json' assert { type: 'json' }

const routes = ['*']

for (let b of brands) {
  routes.push(`/brands/${b.name}`)
}

for (let w of watches) {
  routes.push(`/watches/${w.type}`)
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null, 
      precompress: true 
    }),
    prerender: {
      crawl: true,
      entries: routes,
    },
    csp: {
      mode: 'hash',
      directives: {
        'script-src': ['self'],
        'base-uri': ['self'],
        'font-src': [
          'self',
          'https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.ttf',
          'https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Ew-.ttf',
          'https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM70w-.ttf',
          'https://fonts.gstatic.com/s/quattrocento/v17/OZpEg_xvsDZQL_LKIF7q4jPHxA.ttf',
        ],
        'script-src': ['self'],
      },
    },
  },
}

export default config
