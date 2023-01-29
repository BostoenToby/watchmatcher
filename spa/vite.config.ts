import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Unocss from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetWebFonts from '@unocss/preset-web-fonts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    imagetools(),
    Unocss({
      presets: [
        presetUno(),
        presetWebFonts({
          provider: 'google',
          fonts: {
            classic: 'Quattrocento',
            text: [
              {
                name: 'Montserrat',
                weights: [400, 500, 700],
              },
            ],
          },
        }),
      ],
    }),
  ],
})
