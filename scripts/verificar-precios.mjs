// Verifica, antes de compilar, que todo precio escrito en los archivos de
// contenido exista en src/precios.ts. Cubre las dos formas de nombrarlo:
//
//   1. La marca {{ruta.del.campo}} dentro del texto de un Markdown.
//   2. El campo `precioClave` de una actividad que se repite, que apunta al
//      nombre de un campo de precios.ts.
//
// Por qué existe: si una marca apunta a una ruta que no existe, el procesador
// de Markdown reporta el error pero el build de Astro termina con código 0 y
// deja el párrafo afuera. Y si una `precioClave` está mal escrita, la página
// publica "Valor por definir" en vez del valor. En los dos casos, sin esta
// verificación el error sale a la luz sin que nadie se entere.

import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const CONTENIDO = join(RAIZ, 'src', 'content');
const MARCA = /\{\{\s*([A-Za-z0-9_.]+)\s*\}\}/g;
const CLAVE = /^precioClave:\s*(.+?)\s*$/;

const { precios } = await import(new URL('../src/precios.ts', import.meta.url).href);

function buscar(objeto, ruta) {
  return ruta.split('.').reduce((valor, clave) => (valor == null ? undefined : valor[clave]), objeto);
}

function archivosMarkdown(directorio) {
  return readdirSync(directorio, { recursive: true, withFileTypes: true })
    .filter((entrada) => entrada.isFile() && entrada.name.endsWith('.md'))
    .map((entrada) => join(entrada.parentPath ?? entrada.path, entrada.name));
}

function rutasDisponibles() {
  console.error('\nRutas disponibles en src/precios.ts:');
  for (const [linea, campos] of Object.entries(precios)) {
    if (campos && typeof campos === 'object') {
      console.error(`  ${linea}: ${Object.keys(campos).map((c) => `${linea}.${c}`).join(', ')}`);
    } else {
      console.error(`  ${linea}`);
    }
  }
  console.error('');
}

const archivos = archivosMarkdown(CONTENIDO);
const problemas = [];
let marcasVistas = 0;
let clavesVistas = 0;

for (const archivo of archivos) {
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

    const declarada = contenido.match(CLAVE);
    if (declarada) {
      clavesVistas += 1;
      const clave = declarada[1].replace(/^["']|["']$/g, '');
      const valor = precios[clave];
      if (typeof valor !== 'string') {
        problemas.push(
          `${nombre}:${linea + 1} → precioClave: ${clave} no es un precio con valor en src/precios.ts`
        );
      }
    }
  }
}

if (problemas.length > 0) {
  console.error('\nPrecios mal escritos. La compilación se detiene:\n');
  for (const problema of problemas) console.error(`  ${problema}`);
  rutasDisponibles();
  process.exit(1);
}

console.log(
  `Precios verificados: ${marcasVistas} marca(s) y ${clavesVistas} precioClave en ${archivos.length} archivo(s), todos correctos.`
);
