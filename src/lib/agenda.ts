import { getCollection, type CollectionEntry } from 'astro:content';
import { precios, mostrarPrecio } from '../precios';

export type Taller = CollectionEntry<'talleres'>;
export type Horario = CollectionEntry<'horarios'>;

// Lo que cuesta una actividad que se repite.
//
// Lo gratuito se nombra gratuito, siempre y solo cuando lo es. El valor puede
// estar escrito en el archivo de la actividad o, mejor, vivir una sola vez en
// src/precios.ts: para eso el archivo declara `precioClave` con el nombre del
// campo, y así la misma cifra no queda escrita en dos lugares.
export function precioDeHorario(h: Horario): string {
  if (h.data.gratuito) return 'Gratuito';
  if (h.data.precio) return h.data.precio;
  if (h.data.precioClave) {
    const valor = (precios as unknown as Record<string, unknown>)[h.data.precioClave];
    if (typeof valor === 'string') return mostrarPrecio(valor);
  }
  return 'Valor por definir';
}

// El día de hoy a medianoche, en UTC.
//
// Las fechas de los talleres son días del calendario, sin hora, y Astro las
// lee como medianoche UTC. Compararlas contra la medianoche local corre un día
// todo: un taller del sábado 26 aparecía como viernes 25. Todo se hace en UTC.
export function hoy(): Date {
  const ahora = new Date();
  return new Date(Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate()));
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
    timeZone: 'UTC',
  };
  const inicio = fecha.toLocaleDateString('es-CO', opciones);
  if (!fechaFin) return inicio;
  const fin = fechaFin.toLocaleDateString('es-CO', opciones);
  return fin === inicio ? inicio : `${inicio} — ${fin}`;
}
