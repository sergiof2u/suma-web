import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Talleres y actividades con fecha. Es lo que alimenta la agenda.
// Un archivo por taller. El nombre del archivo es la URL.
const talleres = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talleres' }),
  schema: z.object({
    title: z.string(),
    // Quién lo dicta. Vacío significa que lo dicta SUMA.
    // Si lleva valor, tiene que coincidir con el nombre de un archivo
    // de src/content/talleristas/.
    tallerista: z.string().optional(),
    tipo: z.enum(['Taller', 'Curso', 'Clase', 'Encuentro', 'Otro']).default('Taller'),
    fecha: z.coerce.date(),
    fechaFin: z.coerce.date().optional(),
    horario: z.string().optional(),
    duracion: z.string().optional(),
    lugar: z.string().optional(),
    precio: z.string().optional(),
    cupo: z.string().optional(),
    // Qué se lleva la persona y qué está incluido en el precio.
    incluye: z.string().optional(),
    descripcion: z.string().optional(),
    imagen: z.string().optional(),
    galeria: z.array(z.string()).default([]),
    inscripcion: z.string().optional(),
    publicado: z.boolean().default(true),
  }),
});

// Cada tallerista invitado conserva su nombre, su cara y su voz.
// El texto de su taller lo escribe esa persona y se publica como lo mande.
const talleristas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talleristas' }),
  schema: z.object({
    nombre: z.string(),
    oficio: z.string(),
    bio: z.string().optional(),
    foto: z.string().optional(),
    instagram: z.string().optional(),
    enlace: z.string().url().optional(),
  }),
});

// Lo que se repite cada semana. No son eventos: no generan ficha ni
// ocupan la agenda como algo fechado.
const horarios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/horarios' }),
  schema: z.object({
    actividad: z.string(),
    dia: z.enum([
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
      'domingo',
    ]),
    hora: z.string(),
    duracion: z.string().optional(),
    lugar: z.string().optional(),
    precio: z.string().optional(),
    // Nombre del campo en src/precios.ts, para no repetir la cifra acá.
    // Ver AGENTS.md, «Los precios viven en un solo lugar».
    precioClave: z.string().optional(),
    // Lo gratuito se nombra gratuito, siempre y solo cuando lo es.
    gratuito: z.boolean().default(false),
    descripcion: z.string().optional(),
    orden: z.number().default(0),
  }),
});

// El texto de las páginas fijas. Separa la prosa de la maquetación:
// se puede reescribir una página entera sin tocar código.
const paginas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/paginas' }),
  schema: z.object({
    title: z.string(),
    descripcion: z.string().optional(),
    imagen: z.string().optional(),
  }),
});

export const collections = { talleres, talleristas, horarios, paginas };
