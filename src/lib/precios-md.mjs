// Reemplaza las marcas `{{ruta.del.campo}}` del texto por su valor en
// `src/precios.ts`, para que cada precio exista en un solo lugar aunque la
// página sea un archivo Markdown.
//
// Si una ruta no existe, la marca se deja tal cual en el texto: se ve rota en
// la página en vez de desaparecer en silencio. La comprobación que detiene la
// publicación es `scripts/verificar-precios.mjs`, que corre antes del build.

const MARCA = /\{\{\s*([A-Za-z0-9_.]+)\s*\}\}/g;

function buscar(objeto, ruta) {
  return ruta.split('.').reduce((valor, clave) => (valor == null ? undefined : valor[clave]), objeto);
}

export default function precios({ precios = {}, mostrarPrecio } = {}) {
  const mostrar = mostrarPrecio ?? ((valor) => (valor && String(valor).trim() !== '' ? valor : 'Precio por definir'));

  return {
    name: 'precios',

    // Visita cada nodo de texto del Markdown y cambia las marcas por el valor.
    text(nodo) {
      if (typeof nodo.value !== 'string' || !nodo.value.includes('{{')) return;

      const valor = nodo.value.replace(MARCA, (marca, ruta) => {
        const encontrado = buscar(precios, ruta);
        return encontrado === undefined ? marca : mostrar(encontrado);
      });

      if (valor === nodo.value) return;
      return { type: 'text', value: valor };
    },
  };
}
