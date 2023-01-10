import { sveltekit } from '@sveltejs/kit/vite'
import Unocss from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetWebFonts from '@unocss/preset-web-fonts'

/** @type {import('vite').UserConfig} */
const config = {
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
