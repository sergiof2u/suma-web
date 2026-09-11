// Verifica que toda marca {{ruta.del.campo}} escrita en los archivos de
// contenido exista en src/precios.ts, antes de compilar.
//
// Por qué existe: el procesador de Markdown reporta el error pero el build de
// Astro termina con código 0 y deja el párrafo afuera. Sin esta verificación,
// un precio mal escrito desaparece de la página sin que nadie se entere.

import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const CONTENIDO = join(RAIZ, 'src', 'content');
const MARCA = /\{\{\s*([A-Za-z0-9_.]+)\s*\}\}/g;

const { precios } = await import(new URL('../src/precios.ts', import.meta.url).href);

function buscar(objeto, ruta) {
  return ruta.split('.').reduce((valor, clave) => (valor == null ? undefined : valor[clave]), objeto);
}

function archivosMarkdown(directorio) {
  return readdirSync(directorio, { recursive: true, withFileTypes: true })
    .filter((entrada) => entrada.isFile() && entrada.name.endsWith('.md'))
    .map((entrada) => join(entrada.parentPath ?? entrada.path, entrada.name));
}

const problemas = [];
let marcasVistas = 0;

for (const archivo of archivosMarkdown(CONTENIDO)) {
  const texto = readFileSync(archivo, 'utf8');
  const nombre = relative(RAIZ, archivo);

  for (const [linea, contenido] of texto.split('\n').entries()) {
    for (const coincidencia of contenido.matchAll(MARCA)) {
      marcasVistas += 1;
      const ruta = coincidencia[1];
      if (buscar(precios, ruta) === undefined) {
        problemas.push(`${nombre}:${linea + 1} → "${ruta}" no existe en src/precios.ts`);
      }
    }
  }
}

if (problemas.length > 0) {
  console.error('\nPrecios mal escritos. La compilación se detiene:\n');
  for (const problema of problemas) console.error(`  ${problema}`);
  console.error('\nRutas disponibles en src/precios.ts:');
  for (const [linea, campos] of Object.entries(precios)) {
    if (campos && typeof campos === 'object') {
      console.error(`  ${linea}: ${Object.keys(campos).map((c) => `${linea}.${c}`).join(', ')}`);
    } else {
      console.error(`  ${linea}`);
    }
  }
  console.error('');
  process.exit(1);
}

console.log(`Precios verificados: ${marcasVistas} marca(s) en ${archivosMarkdown(CONTENIDO).length} archivo(s), todas correctas.`);
