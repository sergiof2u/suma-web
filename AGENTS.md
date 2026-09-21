# SUMA — sitio web

Sitio de SUMA, en el Paseo Hygge, Subachoque, Cundinamarca. Estático, hecho
con Astro, publicado gratis en GitHub Pages con despliegue automático en
`sumaensubachoque.com`.

Estas instrucciones aplican a cualquier IA que trabaje en este repositorio.

Las reglas del negocio (qué es SUMA, modelo de tres capas, orden de ingresos, estacionalidad) viven en el vault de Obsidian, en `03 SUMA/CLAUDE.md`. Este archivo mantiene las reglas de redacción y la parte técnica del sitio; ante una discrepancia, manda el vault.

---

## Cómo se actualiza el sitio

El contenido no está en el código: vive en archivos Markdown con encabezado.
Quien administra el sitio describe por prompt lo que quiere, el agente escribe
el archivo que corresponde y hace `git push`. El sitio se publica solo.

**Agregar un taller es crear un archivo.** No hay que editar la agenda ni la
página de talleres: las dos se arman solas con los archivos que existan.

---

## Qué es SUMA, y qué no

Un lugar de oficios donde trabajan joyeros, artistas y artesanos. Adentro
funcionan un taller de joyería con clases, una tienda de productos artesanales,
un estudio de yoga y meditación, un salón de talleres y un cine club. Se publica
un fanzine y se produce Resplandor, un ron artesanal de caña panelera. Lo
sostienen Alexandra y Sergio Fernández Uribe, y es de lo que viven.

**Es un proyecto con ánimo de lucro.** Las actividades tienen un valor
económico y se dice.

**No se llama "centro cultural"** ni se usa ninguna expresión que prometa
programación pública gratuita. Quien llega esperando eso y encuentra que todo
tiene precio se siente defraudado.

**No es un lugar de entretenimiento**, en el sentido de que no busca públicos
masivos ni consumo pasivo. El visitante hace algo. Eso no significa austeridad:
la gente pasa un rato muy grato en el taller y eso es parte de lo que se vende.

**El eje es el oficio y su enseñanza.** El sitio explica procesos, no solo
muestra productos. Las clases y los talleres tienen peso propio aunque la
tienda sea la línea más grande.

---

## Reglas de redacción

**Los precios van a la vista.** Nunca "consultar por interno" ni "escríbenos
para saber el valor". Si un precio todavía no está definido, se dice que está
por definir.

**Lo gratuito se nombra gratuito**, y solo lo que efectivamente lo es. Hoy son
dos cosas: el fanzine y el grupo de meditación de los martes.

**Nunca la construcción "no es X, sino Y".** Es la regla de estilo más
estricta del proyecto.

Negrillas escasas. Sin preguntas retóricas de bisagra. Sin cerrar cada sección
con un aforismo. Pocos guiones largos. Sin anáforas repetidas.

**Tuteo** al dirigirse al lector: tienes, quieres, puedes, escríbenos, cuéntanos.
**Nunca voseo:** nada de tenés, querés, podés, escribinos, contanos.

**Cada tallerista invitado conserva su voz.** El texto de su taller lo escribe
esa persona y se publica como lo mande. SUMA no adopta el vocabulario de nadie
ni se lo corrige.

**El fin de semana cerca de Bogotá se promociona, y no va en el encabezado
ni en la identidad.** Vive en la página de visita.

**Evitar superlativos de turismo masivo**, del tipo "experiencia inolvidable".
El tono de referencia es este, de una publicación real de SUMA: "No necesitas
otra actividad más en tu agenda. Necesitas quizás 4 horas para parar. Para
aprender algo nuevo. Para trabajar con las manos. Para equivocarte sin afán."

---

## Orden y jerarquía

El menú y el peso de cada sección siguen el orden real de ingresos: tienda,
estudio de joyería, estudio de yoga. La tienda es cerca del 77 % del ingreso
y es un proyecto de Alexandra; **nunca describirla como "ventas" ni como apoyo
administrativo.**

El menú vive en `src/site.ts`. La convocatoria para artesanos y talleristas va
solo en el pie, porque les habla a ellos y no a clientes.

### La portada

Las tarjetas de la portada están en el arreglo `bloques` de
`src/pages/index.astro`, en el orden del negocio. Cada una acepta `ancha: true`
—ocupa la fila entera, y hoy la lleva la tienda, que es el 77 % del ingreso— y
`foto` con su `alt`, que pintan la imagen dentro de `.card-media`. Sin `foto` la
tarjeta sale solo con texto: hoy no hay fotos de la tienda ni de los talleres.

La rejilla es `.grid--portada`: tres columnas en pantalla ancha y una sola por
debajo de 1000 px. No volver a meter cuatro tarjetas en una rejilla de tres: la
cuarta queda sola abajo y deja dos tercios de la fila vacíos.

La portada tiene tres piezas y no más: encabezado, tarjetas y «Próximas
fechas». Los dos únicos botones son «Ver la agenda» y «Cómo llegar»: no repetir
la agenda dentro de «Próximas fechas». Los proyectos comunitarios —fanzine, cine
club, exposiciones y club de lectura— **no se listan en la portada**; viven en
«Qué es SUMA», y el cine club además en la agenda.

---

## Estructura del contenido

Cada colección está en `src/content/<coleccion>/`, con un archivo `.md` por
ítem. El nombre del archivo se convierte en la URL.

| Colección     | Carpeta                       | URL pública          |
| ------------- | ----------------------------- | -------------------- |
| Talleres      | `src/content/talleres/`       | `/talleres/<slug>/`  |
| Talleristas   | `src/content/talleristas/`    | no tiene página propia |
| Horarios      | `src/content/horarios/`       | se muestran en `/yoga/` y `/agenda/` |
| Páginas       | `src/content/paginas/`        | el texto de las páginas fijas |

Los campos están definidos y validados en `src/content.config.ts`. Un campo
mal escrito o una fecha inválida rompen la compilación antes de publicar, que
es a propósito.

### talleres

`title`, `tallerista`, `tipo`, `fecha`, `fechaFin`, `horario`, `duracion`,
`lugar`, `precio`, `cupo`, `incluye`, `descripcion`, `imagen`, `galeria[]`,
`inscripcion`, `publicado`.

`tallerista` vacío significa que lo dicta SUMA. Con valor, tiene que coincidir
con el nombre de un archivo de `src/content/talleristas/`.

El cuerpo del Markdown es el texto largo del taller.

### talleristas

`nombre`, `oficio`, `bio`, `foto`, `instagram`, `enlace`.

### horarios

`actividad`, `dia`, `hora`, `duracion`, `lugar`, `precio`, `precioClave`,
`gratuito`, `descripcion`, `orden`.

Es para lo que se repite cada semana: yoga, meditación de los martes, cine
club. **No crear fichas de taller para actividades recurrentes.**

---

## La agenda se genera sola

`/agenda/` y `/talleres/` no se editan nunca. Se arman con los archivos de
`talleres` y `horarios`, mostrando lo próximo primero y ocultando lo que ya
pasó. La lógica está en `src/lib/agenda.ts`.

---

## Los precios viven en un solo lugar

`src/precios.ts`. Aparecen en varias páginas y se traen desde ahí. Cambiar un
precio es cambiar una línea de ese archivo.

En una página `.astro` se importa `precios` y se imprime el campo.

En un archivo Markdown, que no puede importar, se escribe la marca
`{{joyeria.tallerDeUnDia}}`: el complemento `src/lib/precios-md.mjs` la cambia
por el valor al compilar. **El precio se escribe solo en `src/precios.ts`; en el
texto va la marca, nunca la cifra.**

Antes de cada compilación corre `scripts/verificar-precios.mjs` (está encadenado
en `npm run build`). Si una marca apunta a una ruta que no existe, el build se
detiene y dice cuál es la línea. La razón: el procesador de Markdown reporta ese
error pero Astro termina igual y deja el párrafo afuera, así que sin esta
comprobación un precio mal escrito desaparece de la página sin avisar.

Los precios de un taller concreto van en el campo `precio` de su archivo.

Una actividad que se repite (`src/content/horarios/`) puede declarar
`precioClave` con el nombre del campo de `src/precios.ts`, y el valor se lee de
ahí al compilar. Es lo que hace el cine club con `precioClave: cineClub`. Se
prefiere eso a volver a escribir la cifra en el archivo de la actividad: la
misma cifra en dos lados se desincroniza.

---

## Imágenes

Van en `public/fotos/<sección>/`, igual que en el portafolio personal, y se
referencian con ruta absoluta: `/fotos/joyeria/disco-de-cobre.jpg`.

**Hay que reducirlas antes de guardarlas.** Astro no las toca ahí. El criterio
que se ha venido usando: lado largo de 1600 px para fotos de contenido y
2400 px para las de encabezado, JPEG de calidad 80, progresivo. Eso deja
archivos de 150 a 400 KB. Los originales de la cámara pesan entre 2 y 4 MB y
no se suben: mucha gente abre este sitio desde el celular para decidir si sube
a Subachoque.

Los originales viven fuera del repositorio, en
`F:\OneDrive\1.SUMA LOCAL HYGGE\WEB SUMA\01 FOTOS\`.

**Las fotos se ven con el brillo del archivo.** Nada encima: ni velo, ni
degradado, ni `opacity`, ni `filter`. El texto va al lado o debajo, nunca sobre
la foto. La portada estuvo un tiempo con un velo oscuro y opacidad al 82 %, y
se intentó compensar aclarando el JPG dos veces; la foto seguía apagada porque
la causa estaba en el CSS. Si una foto se ve oscura, se busca primero ahí, y el
archivo que se sube es el de la carpeta de originales, sin retocar.

---

## Tipografías

Dos familias, y ninguna más: **Cormorant Garamond** para los títulos y
**Jost** para el texto corrido y las etiquetas. Las dos son de Google Fonts,
con licencia OFL.

Se cargan en `src/layouts/Base.astro`, en una sola etiqueta `<link>` que pide
Cormorant Garamond en 400, 500 y 600, y Jost en 300, 400 y 500. Pedir un peso
que no esté en esa lista hace que el navegador lo simule engordando el trazo,
y se nota. Si hace falta un peso nuevo, se agrega ahí primero.

En el CSS no se escribe el nombre de la fuente: se usan los tokens `--serif`
y `--sans` de `src/styles/global.css`, que ya traen su cadena de respaldo
(Georgia y Segoe UI). Una familia escrita a mano en una regla suelta se queda
por fuera cuando la marca cambie de tipografía.

**Las piezas gráficas también van en estas dos.** Volantes, avisos y posts
para redes se componen en Cormorant Garamond y Jost, y por eso las fuentes
están instaladas en el computador de SUMA, además de cargarse en el sitio.
Los archivos de esas piezas viven en
`F:\OneDrive\1.SUMA LOCAL HYGGE\WEB SUMA\05 MATERIAL PARA PUBLICIDAD\`, y las
notas de identidad, en `03 LOGO E IDENTIDAD`. Una pieza armada en un
computador que no tenga las fuentes instaladas sale en Georgia y Segoe UI sin
avisar de nada.

---

## Pasos para agregar un taller

1. Guardar la foto en `src/assets/talleres/`.
2. Si es de un tallerista invitado que no existe todavía, crear su archivo en
   `src/content/talleristas/`.
3. Crear `src/content/talleres/<slug>.md` con el encabezado completo.
4. Verificar con `npm run build`.
5. Commit y `git push`. El sitio se publica solo.

---

## Comandos

- `npm run dev` — servidor local en localhost:4321
- `npm run build` — compila a `dist/`
- `npm run preview` — previsualiza la compilación
- `npm run astro check` — valida tipos y contenido

## Despliegue

`git push` a `main` dispara GitHub Actions, que compila y publica en GitHub
Pages. El dominio se resuelve con `public/CNAME`.

El run tarda entre 30 y 100 segundos. Para comprobar el resultado, usar `curl`
o recargar sin caché: el navegador sigue sirviendo la versión anterior de la
página y del CSS un rato después de que el despliegue ya terminó, y parece que
el cambio no se hubiera publicado.

## Alineación

Dos anchos de columna, y ninguno se mezcla con el otro dentro de una misma
página:

- **Páginas de contenido** (`[pagina].astro` y la ficha de un taller): el texto
  va en la columna `.article`, de 820 px centrada en el contenedor. **El `h1`
  va dentro de esa misma columna**, junto con las imágenes, la tabla de datos y
  el texto. Un título suelto en el contenedor queda pegado a la izquierda, a
  166 px del texto, y se ve descolgado.
- **Páginas de listado** (`index`, `talleres`, `agenda`, `yoga`): todo al borde
  del contenedor, sin columna propia.

Las tablas de datos (`.meta-table`) son `<table>` de verdad, con `th` y `td`.
La etiqueta va en una columna de 160 px, alineada arriba con su valor, y en
pantalla angosta la etiqueta pasa arriba del valor.

## Convenciones

- Todo el contenido en español.
- Fechas en formato ISO `AAAA-MM-DD`.
- Sin comentarios en el código salvo que se pidan.
- Nunca tocar `dist/` ni `node_modules/`.
- Tuteo, nunca voseo: «Mira la agenda», no «Mirá la agenda».
