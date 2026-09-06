# SUMA — sitio web

Sitio de SUMA, en el Paseo Hygge, Subachoque, Cundinamarca. Estático, hecho
con Astro, publicado gratis en GitHub Pages con despliegue automático en
`sumaensubachoque.com`.

Estas instrucciones aplican a cualquier IA que trabaje en este repositorio.

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

**Voseo** al dirigirse al lector: tenés, querés, podés, escribinos, contanos.
Nunca tuteo.

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

El menú vive en `src/site.ts`. "Dictá un taller en SUMA" va solo en el pie,
porque le habla a talleristas y no a clientes.

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

`actividad`, `dia`, `hora`, `duracion`, `lugar`, `precio`, `gratuito`,
`descripcion`, `orden`.

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

Los precios de un taller concreto van en el campo `precio` de su archivo.

---

## Imágenes

Van en `src/assets/`, no en `public/`. Así Astro las comprime y genera los
tamaños. Una foto de 4 MB sin optimizar es un problema real: mucha gente abre
este sitio desde el celular para decidir si sube a Subachoque.

`public/` queda solo para el favicon y el archivo `CNAME`.

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

## Convenciones

- Todo el contenido en español.
- Fechas en formato ISO `AAAA-MM-DD`.
- Sin comentarios en el código salvo que se pidan.
- Nunca tocar `dist/` ni `node_modules/`.
