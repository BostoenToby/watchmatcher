import adapter from '@sveltejs/adapter-netlify'
import { vitePreprocess } from '@sveltejs/kit/vite'
import { imagetools } from 'vite-imagetools'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    csp: {
      mode: 'auto',
      directives: {'style-src': ['sha256-MH7r7zXSZBceJvx3XvkhrApPa5zaRD9uT+MfWo9Wrhs=', 'sha256-tcbDxjMo+xKqM21aCGYbs/QAJqB7yUXC06oPWDapBgc='], 'script-src': ['sha256-17sa32YYSCvs9Nz9rkm24JeRNwImNHhSIswd8Jlu2Uo=']}
    }
  },
}

export default config
