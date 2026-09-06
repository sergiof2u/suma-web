# SUMA — sitio web

Sitio de SUMA, en el Paseo Hygge, Subachoque, Cundinamarca.
Publicado en [sumaensubachoque.com](https://sumaensubachoque.com).

Estático, hecho con Astro y publicado en GitHub Pages. Cada `git push` a `main`
compila y publica el sitio.

**Antes de tocar cualquier archivo, leer [AGENTS.md](AGENTS.md).** Ahí está el
flujo de trabajo, la estructura del contenido y las reglas de redacción del
proyecto.

## Comandos

| Comando             | Qué hace                             |
| ------------------- | ------------------------------------ |
| `npm install`       | Instala las dependencias             |
| `npm run dev`       | Servidor local en localhost:4321     |
| `npm run build`     | Compila a `dist/`                    |
| `npm run preview`   | Previsualiza la compilación          |
| `npm run astro check` | Valida tipos y contenido           |

## Dónde está cada cosa

| Ruta                      | Qué contiene                                    |
| ------------------------- | ----------------------------------------------- |
| `src/content/talleres/`   | Un archivo por taller. Alimenta la agenda        |
| `src/content/talleristas/`| Quién dicta cada taller invitado                 |
| `src/content/horarios/`   | Lo que se repite cada semana                     |
| `src/content/paginas/`    | El texto de las páginas fijas                    |
| `src/content.config.ts`   | Los campos de cada colección, validados          |
| `src/site.ts`             | Nombre, contacto, ubicación y menús              |
| `src/precios.ts`          | Todos los precios, en un solo lugar              |
| `src/lib/agenda.ts`       | Cómo se ordena y filtra la agenda                |
| `src/assets/`             | Imágenes. Astro las comprime desde acá           |
