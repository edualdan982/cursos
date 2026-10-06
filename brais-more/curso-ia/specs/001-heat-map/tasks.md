# Tareas 001 — Mapa de calor de estudio

> Derivado de `spec.md` y `plan.md`. Cada tarea ≤ 20-30 min. Orden de dependencia: no empezar una tarea hasta completar las anteriores de las que depende.

## Lógica pura (base testeable)

- [x] **T-1** Crear `heat-map.test.js` con esqueleto de tests para `sumMinutesByDate` y `levelForMinutes` (casos vacíos y bordes 0/1/15/16/45/46/90/91). Cubre RF-2, RF-3.
  Hecho cuando: `node --test` ejecuta el archivo y los tests fallan por falta de implementación.

- [x] **T-2** Implementar `sumMinutesByDate(sessions)` en `app.js` como función pura. Cubre RF-3.
  Hecho cuando: `node --test` pasa en verde para T-1.

- [x] **T-3** Implementar `levelForMinutes(minutes)` con los umbrales 0/1–15/16–45/46–90/>90. Cubre RF-2.
  Hecho cuando: `node --test` pasa en verde para los tests de bordes de T-1.

- [x] **T-4** Añadir tests para `weekStartMonday` y `buildHeatMapData` (alineación lunes–domingo, rango de N semanas, marca de días futuros). Cubre RF-1, RF-7, RF-8.
  Hecho cuando: `node --test` falla solo en estos tests nuevos.

- [x] **T-5** Implementar `weekStartMonday(date)` y `buildHeatMapData(sessions, today, weeks)` en `app.js`. Cubre RF-1, RF-7, RF-8.
  Hecho cuando: `node --test` en verde para T-4.

- [x] **T-6** Añadir tests para `filterSessionsByDate` y `formatTooltip` (fecha con sesiones, fecha sin sesiones). Cubre RF-9, RF-10.
  Hecho cuando: `node --test` falla solo en estos tests nuevos.

- [x] **T-7** Implementar `filterSessionsByDate(sessions, date)` y `formatTooltip(date, minutes)`. Cubre RF-9, RF-10.
  Hecho cuando: `node --test` en verde para T-6.

## Interfaz

- [x] **T-8** En `index.html`, añadir el contenedor del mapa (grid), el `<select>` de semanas (8/12/26/52, valor 12), la leyenda y el contenedor del tooltip + aviso de filtro. Cubre RF-1, RF-5, RF-6.
  Hecho cuando: al abrir `index.html` se ven el hueco del mapa, el selector con 4 opciones y la leyenda vacía, sin errores en consola.

- [x] **T-9** En `styles.css`, definir variables de 5 niveles por tema (`:root` y `[data-theme="dark"]`) y la clase `level-future`. Cubre RF-2, RF-4, RF-8.
  Hecho cuando: cambiando `data-theme` en DevTools cambian los colores de ejemplo sin tocar JS.

- [x] **T-10** En `app.js`, función `renderHeatMap()` que pinta celdas con clases `level-N`/`level-future` en un CSS grid de 7 filas × N columnas. Cubre RF-1, RF-2, RF-7, RF-8.
  Hecho cuando: con 3 sesiones de prueba se ven 3 celdas coloreadas y el resto en nivel mínimo.

- [x] **T-11** En `styles.css`, dar layout al grid (celdas cuadradas, gap, leyenda de "menos a más") y estilos para móvil 375 px sin scroll horizontal. Cubre RF-5, RNF-5.
  Hecho cuando: en DevTools con viewport 375 px no hay scroll horizontal y la leyenda se lee.

- [x] **T-12** Conectar el `<select>` de semanas: al cambiar, recalcular `buildHeatMapData` y repintar. Cubre RF-6, RF-7.
  Hecho cuando: cambiar a 8/26/52 semanas cambia el número de columnas del grid.

- [x] **T-13** Tooltip al pasar el ratón (y al tocar en móvil) con `formatTooltip`. Cubre RF-9.
  Hecho cuando: al hover sobre una celda se ve "fecha — N min" o "sin sesiones".

- [x] **T-14** Clic en celda: filtrar la lista de sesiones con `filterSessionsByDate` y mostrar aviso "Mostrando sesiones de … · ver todo". Cubre RF-10.
  Hecho cuando: clic en un día coloreado deja la lista solo con sus sesiones y aparece el aviso.

- [x] **T-15** "Ver todo" y segundo clic en la misma celda restauran la lista completa. Cubre RF-11.
  Hecho cuando: tras filtrar, pulsar "ver todo" o re-clicar la misma celda muestra todas las sesiones.

- [x] **T-16** Al guardar una sesión, recalcular mapa + racha + totales sin recargar. Cubre RF-12.
  Hecho cuando: añadir una sesión hoy colorea la celda de hoy y actualiza racha y totales a la vez.

## Cierre

- [x] **T-17** Persistir la selección de semanas en localStorage y restaurarla al cargar. Cubre RF-6.
  Hecho cuando: elegir 26 semanas, recargar, y el selector sigue en 26 y el grid muestra 26 columnas.

- [x] **T-18** Verificación final: `node --test` en verde, sin errores en consola, captura móvil 375 px correcta y checklist de criterios de finalización de la spec. Cubre RNF-1…RNF-6.
  Hecho cuando: todos los puntos de "Criterios de finalización" de `spec.md` están verificados y marcados.

- [x] **T-19** Actualizar `MEMORY.md` (decisión, umbrales, defecto 12) y marcar T-1…T-18 como hechas. Cubre proceso del proyecto.
  Hecho cuando: `MEMORY.md` refleja el mapa de calor y las tareas están todas con `[x]`.
