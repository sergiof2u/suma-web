// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import precios from './src/lib/precios-md.mjs';
import { precios as valores, mostrarPrecio } from './src/precios.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://sumaensubachoque.com',
  markdown: {
    // Deja escribir {{joyeria.tallerDeUnDia}} en un archivo Markdown y que el
    // valor salga de src/precios.ts al compilar, para que cada precio viva
    // en un solo lugar.
    processor: satteri({ mdastPlugins: [precios({ precios: valores, mostrarPrecio })] }),
  },
});
