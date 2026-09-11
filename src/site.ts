// Datos del sitio. Todo lo que se repite en varias páginas vive acá y en
// ningún otro lugar. Ver AGENTS.md.

export const site = {
  nombre: 'SUMA',
  tagline: 'Joyeros, artistas y artesanos en un mismo lugar',
  descripcion:
    'Joyeros, artistas y artesanos en un mismo lugar. Vendemos lo que hacemos, enseñamos el oficio y practicamos yoga. Promovemos economías locales. Paseo Hygge, Subachoque, Cundinamarca.',

  // Contacto
  whatsapp: '573164142904',
  whatsappVisible: '316 414 2904',
  email: '',
  instagram: 'suma_en_subachoque',

  // Ubicación
  lugar: 'Paseo Hygge, Subachoque, Cundinamarca',
  direccion: 'Cl. 4 #4-58, Local 106, Subachoque, Cundinamarca',
  maps: 'https://www.google.com/maps/search/?api=1&query=Suma+Cl+4+4-58+Subachoque',
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}`;

// Menú principal. La capa 1 en el orden real de ingresos, y dos utilidades
// de navegación al final. Ver 5 ARQUITECTURA Y POSICIONAMIENTO en el vault.
export const nav = [
  { href: '/tienda/', label: 'Tienda' },
  { href: '/joyeria/', label: 'Estudio de joyería' },
  { href: '/yoga/', label: 'Yoga y meditación' },
  { href: '/talleres/', label: 'Talleres' },
  { href: '/agenda/', label: 'Agenda' },
  { href: '/visitar/', label: 'Visitar' },
] as const;

// Enlaces del pie. La convocatoria va solo acá: les habla a artesanos y
// talleristas, no a clientes.
export const navPie = [
  { href: '/que-es-suma/', label: 'Qué es SUMA' },
  { href: '/convocatoria/', label: 'Convocatoria para artesanos y talleristas' },
] as const;
