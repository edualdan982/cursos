# Spec 001 — Mapa de calor de estudio

## Contexto y objetivo

El Diario de Estudio permite registrar sesiones de estudio (fecha, tema, minutos) y muestra rachas y totales. Sin embargo, no ofrece una visión rápida del esfuerzo a lo largo del tiempo: el usuario no puede percibir de un vistazo qué días ha estudiado ni con qué intensidad.

El objetivo es añadir un mapa de calor tipo GitHub que represente, en una cuadrícula de días, los minutos estudiados en cada día. Cuantos más minutos, más intenso es el color de la celda. Así, el usuario puede:

- Detectar de un vistazo su constancia y sus huecos de estudio.
- Tener una motivación visual para mantener el hábito (racha visible en forma de "cadena" de celdas coloreadas).
- Localizar fácilmente un día concreto y consultar sus sesiones.

## Usuarios

- Estudiante que registra sesiones en el Diario y quiere revisar su historial de actividad de forma visual.

## Historias de usuario

- HU-1: Como estudiante, quiero ver una cuadrícula con los días de las últimas semanas coloreados según los minutos estudiados, para percibir mi constancia de un vistazo.
- HU-2: Como estudiante, quiero elegir cuántas semanas hacia atrás se muestran, para adaptar la vista a mi horizonte de interés (p. ej. el último mes o el último semestre).
- HU-3: Como estudiante, quiero ver al pasar el ratón sobre un día su fecha y los minutos totales, para confirmar el detalle sin salir del mapa.
- HU-4: Como estudiante, quiero hacer clic en un día para que la lista de sesiones se filtre a ese día, para consultar qué estudié exactamente.
- HU-5: Como estudiante, quiero que el mapa respete el tema claro/oscuro de la aplicación, para que siga siendo legible.

## Requisitos funcionales

### Visualización del mapa (RF-1 a RF-5)

- **RF-1**: El sistema mostrará una cuadrícula donde cada celda representa un día natural, organizada en columnas por semana y filas por día de la semana.
  - Criterio de aceptación (EARS): CUANDO la página cargue, ENTONCES el sistema MOSTRARÁ la cuadrícula con una celda por día.
- **RF-2**: El sistema coloreará cada celda según los minutos totales de ese día con 5 niveles de intensidad: 0 minutos, 1–15, 16–45, 46–90 y más de 90 minutos.
  - Criterio de aceptación: CUANDO un día tenga 0 minutos, ENTONCES su celda se mostrará con la intensidad mínima; CUANDO tenga entre 1 y 15, ENTONCES con el primer nivel; y así sucesivamente hasta el nivel máximo para más de 90 minutos.
- **RF-3**: El sistema sumará los minutos de todas las sesiones de un mismo día para calcular su nivel.
  - Criterio de aceptación: SI un día tiene varias sesiones, ENTONCES el sistema SUMARÁ sus minutos antes de asignar el nivel de color.
- **RF-4**: El sistema respetará el tema (claro u oscuro) de la aplicación al elegir la paleta de colores.
  - Criterio de aceptación: CUANDO el usuario cambie el tema, ENTONCES el mapa se mostrará con colores acordes al nuevo tema sin recargar.
- **RF-5**: El sistema incluirá una leyenda que explique los niveles de intensidad (de "menos" a "más").
  - Criterio de aceptación: CUANDO el usuario vea el mapa, ENTONCES se mostrará una leyenda con los distintos niveles de color.

### Rango configurable (RF-6 a RF-8)

- **RF-6**: El sistema mostrará un selector para elegir el número de semanas hacia atrás visibles (opciones: 8, 12, 26 y 52 semanas; por defecto 12).
  - Criterio de aceptación: CUANDO el usuario seleccione un número de semanas, ENTONCES el mapa se actualizará para cubrir exactamente ese rango terminando en la semana actual.
- **RF-7**: El sistema empezará la cuadrícula en el lunes de la semana más antigua del rango y terminará en el último día de la semana actual.
  - Criterio de aceptación: CUANDO el rango seleccionado sea de N semanas, ENTONCES el mapa mostrará N semanas completas alineadas por lunes.
- **RF-8**: El sistema dejará visibles, pero sin colorear como estudiado, los días posteriores a hoy dentro de la semana actual.
  - Criterio de aceptación: SI un día del rango es posterior a hoy, ENTONCES su celda se mostrará distinta (p. ej. atenuada o vacía) y nunca como día con estudio.

### Interacción (RF-9 a RF-11)

- **RF-9**: El sistema mostrará un texto informativo (tooltip) al pasar el ratón sobre una celda con la fecha del día y los minutos totales (o "sin sesiones" si no hubo estudio).
  - Criterio de aceptación: CUANDO el usuario sitúe el ratón sobre una celda, ENTONCES se mostrará la fecha y los minutos totales de ese día.
- **RF-10**: El sistema filtrará la lista de sesiones al día de la celda pulsada.
  - Criterio de aceptación: CUANDO el usuario haga clic en una celda, ENTONCES la lista de sesiones mostrará solo las sesiones de ese día.
- **RF-11**: El sistema permitirá quitar el filtro para volver a ver todas las sesiones.
  - Criterio de aceptación: CUANDO el usuario vuelva a hacer clic en el mismo día (o use un control de "ver todo"), ENTONCES se mostrarán de nuevo todas las sesiones.

### Persistencia y coherencia (RF-12)

- **RF-12**: El sistema recalculará el mapa con los mismos datos que las rachas y totales existentes, y se actualizará al añadir una sesión nueva.
  - Criterio de aceptación: CUANDO el usuario guarde una sesión, ENTONCES el mapa, la racha y los totales reflejarán los nuevos datos sin recargar.

## Requisitos no funcionales

- **RNF-1**: La aplicación sigue funcionando abriendo `index.html` con doble clic, sin servidor ni build.
- **RNF-2**: Sin dependencias ni frameworks: HTML, CSS y JS puros.
- **RNF-3**: La lógica de cálculo (niveles de color, rango de fechas, suma por día) es una función pura, sin DOM ni localStorage, que recibe "hoy" como parámetro y está cubierta por tests con `node --test`.
- **RNF-4**: Todas las fechas se manejan en hora local y en formato `yyyy-mm-dd`, manteniendo compatibilidad con los datos ya guardados en localStorage.
- **RNF-5**: El mapa es legible en móvil (375 px) y en escritorio; no produce scroll horizontal.
- **RNF-6**: La interfaz y la documentación están en español; el código, en inglés.

## Casos límite

- Un día con varias sesiones cortas que suman más de 90 minutos debe mostrarse con el nivel máximo.
- Un día con 0 minutos (o sin sesiones) usa el nivel mínimo, distinto de los días futuros.
- Días anteriores a la primera sesión registrada dentro del rango: nivel mínimo.
- Días futuros de la semana actual: celda atenuada, no clicable para filtrar (o filtro que muestre "sin sesiones").
- Rango máximo (52 semanas) con muchos datos: el mapa sigue siendo navegable y legible en móvil.
- Sin ninguna sesión registrada: el mapa muestra todas las celdas en nivel mínimo y la lista indica que no hay sesiones.
- Cambio de tema con el mapa visible: los colores se actualizan sin recargar.

## Fuera de alcance

- Navegar entre años o rangos personalizados distintos de las opciones fijas del selector.
- Exportar el mapa o compartirlo.
- Objetivos diarios, notificaciones o recordatorios.
- Animaciones o transiciones complejas.
- El clic en una celda no edita ni borra sesiones: solo filtra la lista.

## Criterios de finalización

- [ ] Existe el mapa de calor visible en la página, con celdas por día y 5 niveles de intensidad.
- [ ] El selector de semanas funciona y persiste/actualiza la vista al cambiar.
- [ ] Tooltip con fecha y minutos al pasar el ratón; clic en celda filtra la lista y se puede desfiltrar.
- [ ] El mapa se actualiza al guardar una sesión y respeta el tema claro/oscuro.
- [ ] La lógica de cálculo tiene tests con `node --test` y todos pasan.
- [ ] Vista correcta en móvil (375 px) y en escritorio, sin errores en consola.

## Dudas abiertas

- [NECESITA ACLARACIÓN] ¿Debe persistir la selección del número de semanas en localStorage (como el tema) o restablecerse a 12 en cada carga? R.- Leer del localStorage
- [NECESITA ACLARACIÓN] ¿En qué posición de la página se ubica el mapa (entre las rachas y el formulario, o debajo de las sesiones)? R.- Mejor una nueva pestaña
- [NECESITA ACLARACIÓN] ¿Las celdas de días sin sesión dentro del rango deben ser clicables (filtrando a "sin sesiones") o no? R.- Filtarando.
