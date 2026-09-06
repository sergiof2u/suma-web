import { getCollection, type CollectionEntry } from 'astro:content';

export type Taller = CollectionEntry<'talleres'>;

// El día de hoy a medianoche. Un taller que ocurre hoy sigue siendo próximo
// hasta que termina el día.
function hoy(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

// La fecha con la que un taller deja de ser próximo: la de cierre si el
// taller dura varios días, la de inicio si dura uno.
function fechaDeCierre(t: Taller): Date {
  return t.data.fechaFin ?? t.data.fecha;
}

// Próximos, del más cercano en adelante.
//
// Esta es la diferencia con un portafolio, que es un registro de lo hecho y
// por eso ordena al revés. Una agenda muestra lo que viene.
export async function proximosTalleres(): Promise<Taller[]> {
  const corte = hoy();
  const todos = await getCollection('talleres', ({ data }) => data.publicado);
  return todos
    .filter((t) => fechaDeCierre(t) >= corte)
    .sort((a, b) => a.data.fecha.getTime() - b.data.fecha.getTime());
}

// Los que ya pasaron, del más reciente hacia atrás. Sirven para mostrar qué
// se ha dictado acá, que es lo que mira un tallerista que evalúa proponer algo.
export async function talleresPasados(): Promise<Taller[]> {
  const corte = hoy();
  const todos = await getCollection('talleres', ({ data }) => data.publicado);
  return todos
    .filter((t) => fechaDeCierre(t) < corte)
    .sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

const ORDEN_DIAS = [
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
  'domingo',
] as const;

// La parrilla semanal, en orden de lunes a domingo.
export async function parrillaSemanal() {
  const horarios = await getCollection('horarios');
  return horarios.sort((a, b) => {
    const dia = ORDEN_DIAS.indexOf(a.data.dia) - ORDEN_DIAS.indexOf(b.data.dia);
    return dia !== 0 ? dia : a.data.orden - b.data.orden;
  });
}

export function formatearFechaTaller(fecha: Date, fechaFin?: Date): string {
  const opciones: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const inicio = fecha.toLocaleDateString('es-CO', opciones);
  if (!fechaFin) return inicio;
  const fin = fechaFin.toLocaleDateString('es-CO', opciones);
  return fin === inicio ? inicio : `${inicio} — ${fin}`;
}
