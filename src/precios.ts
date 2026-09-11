// Precios. Viven acá una sola vez y se traen a donde hagan falta.
//
// Regla del proyecto: los precios van a la vista, nunca "consultar por
// interno". Lo gratuito se nombra gratuito.
//
// Para actualizar un precio se cambia esta línea y cambia en todo el sitio.
// Un precio en `null` se muestra como "por definir" y hay que llenarlo.
//
// Cómo llegan estos valores a una página:
// - En una página `.astro` se importa `precios` y se imprime el campo.
// - En un archivo Markdown se escribe la marca `{{ruta.del.campo}}` y el
//   complemento `src/lib/precios-md.mjs` la reemplaza al compilar.
//
// Antes de compilar corre `scripts/verificar-precios.mjs`, que detiene el
// build si alguna marca apunta a una ruta que no existe.

export const precios = {
  joyeria: {
    tallerDeUnDia: '280.000 por persona, o 500.000 para dos',
    cursoTrimestral: 'El valor se acuerda con cada estudiante',
    claseIndividual: 'De tres a cuatro horas, 280.000',
  },
  yoga: {
    clasesuelta: null as string | null,
    mensualidad: null as string | null,
    meditacionMartes: 'Gratuito',
  },
  tienda: {
    joyeriaDesde: null as string | null,
    otrosOficiosDesde: null as string | null,
  },
  cineClub: null as string | null,
} as const;

export function mostrarPrecio(valor: string | null | undefined): string {
  return valor && valor.trim() !== '' ? valor : 'Precio por definir';
}
