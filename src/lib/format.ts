export function formatearFecha(fecha: string): string {
  const d = new Date(fecha);
  if (Number.isNaN(d.getTime())) return fecha;
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatearRango(inicio: string, fin?: string): string {
  const ini = formatearFecha(inicio);
  if (!fin) return ini;
  const finFmt = formatearFecha(fin);
  if (finFmt === ini) return ini;
  return `${ini} — ${finFmt}`;
}

export function agruparPor<T>(items: T[], clave: (item: T) => string): Record<string, T[]> {
  const grupos: Record<string, T[]> = {};
  for (const item of items) {
    const k = clave(item);
    (grupos[k] ??= []).push(item);
  }
  return grupos;
}
