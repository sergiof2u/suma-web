// Precios. Viven acá una sola vez y se traen a donde hagan falta.
//
// Regla del proyecto: los precios van a la vista, nunca "consultar por
// interno". Lo gratuito se nombra gratuito.
//
// Para actualizar un precio se cambia esta línea y cambia en todo el sitio.
// Un precio en `null` se muestra como "por definir" y hay que llenarlo.

export const precios = {
  joyeria: {
    tallerDeUnDia: null as string | null,
    cursoTrimestral: null as string | null,
    claseIndividual: null as string | null,
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
  resplandor: {
    botella375: '$45.000',
  },
  cineClub: null as string | null,
} as const;

export function mostrarPrecio(valor: string | null | undefined): string {
  return valor && valor.trim() !== '' ? valor : 'Precio por definir';
}
