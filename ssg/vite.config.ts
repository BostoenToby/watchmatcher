import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'
import Unocss from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetWebFonts from '@unocss/preset-web-fonts'

const config: UserConfig = {
  build: {
    assetsInlineLimit: 0,
  },
  plugins: [
    sveltekit(),
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
}

export default config
