# Tareas 002 — Objetivo semanal de estudio

> Derivado de `spec.md` y `plan.md`. Cada tarea ≤ 20-30 min. Orden de dependencia: no empezar una tarea hasta completar las anteriores de las que depende. Tests primero (en rojo), después el código.

## Lógica pura (base testeable)

- [x] **T-1** Crear `weekly-goal.test.js` con esqueleto de tests para `sumWeeklyMinutes` (semana lunes–hoy, ignora semanas anteriores, lista vacía) y `goalPercent` (0 %, 50 %, 100 %, 130 %, objetivo 0/negativo). Cubre RF-4, RF-5, RF-6.
  Hecho cuando: `node --test` ejecuta el archivo y los tests fallan por falta de implementación.

- [x] **T-2** Implementar `sumWeeklyMinutes(sessions, today)` en `app.js` como función pura y hacer que `calculateWeeklyMinutes` delegue en ella. Cubre RF-5, RF-10.
  Hecho cuando: `node --test` pasa en verde para la parte de `sumWeeklyMinutes`.

- [x] **T-3** Implementar `goalPercent(studied, goal)` con la regla de porcentaje real y objetivo 0/negativo = 0. Cubre RF-4, RF-6.
  Hecho cuando: `node --test` pasa en verde para los tests de bordes de T-1.

- [x] **T-4** Añadir tests para `weeklyGoalProgress` (sin objetivo, progreso parcial, `studied == goal`, `studied > goal`) y `parseGoalInput` (`""`, `"0"`, `"-5"`, `"abc"`, `null`, decimal → `null`; `"300"`/`300` → `300`). Cubre RF-2, RF-4, RF-6, RF-7.
  Hecho cuando: `node --test` falla solo en estos tests nuevos.

- [x] **T-5** Implementar `weeklyGoalProgress(sessions, today, goalMinutes)` y `parseGoalInput(raw)` en `app.js`, y exportarlas. Cubre RF-2, RF-4, RF-6, RF-7.
  Hecho cuando: `node --test` en verde para T-4.

## Persistencia y pegadizo con el DOM

- [x] **T-6** Añadir en `app.js` las funciones de persistencia del objetivo: leer (validando con `parseGoalInput`), guardar y quitar (con la clave `study-diary-weekly-goal`). Cubre RF-1, RF-3, RF-8.
  Hecho cuando: fijar un valor y recargar lo conserva; quitarlo lo elimina, sin errores en consola.

## Interfaz

- [x] **T-7** En `index.html`, añadir la sección `weekly-goal` (título, barra de progreso, texto, botón "Fijar/Editar objetivo", formulario oculto con input de minutos, "Guardar" y "Quitar objetivo", y aviso de error). Cubre RF-1, RF-3, RF-7.
  Hecho cuando: al abrir `index.html` se ve la sección con el botón y el formulario oculto, sin errores en consola.

- [x] **T-8** En `styles.css`, dar estilo a la sección, a la barra de progreso (relleno topado al 100 %), al estado "cumplido" y al formulario, con variables por tema. Cubre RNF-5.
  Hecho cuando: en ambos temas la barra y los textos son legibles y no hay scroll horizontal a 375 px.

- [x] **T-9** En `app.js`, implementar el render del progreso: barra + texto `"<studied> / <goal> min · <percent> %"` y estado cumplido cuando `achieved`; vista de invitación cuando no hay objetivo. Cubre RF-4, RF-6, RF-7.
  Hecho cuando: con objetivo parcial se ve la barra al porcentaje y el texto; al alcanzarlo aparece "cumplido"; sin objetivo se ve la invitación.

- [x] **T-10** Conectar el botón "Fijar/Editar objetivo", el guardado (con aviso si `parseGoalInput` devuelve `null`) y el botón "Quitar objetivo". Cubre RF-1, RF-2, RF-3.
  Hecho cuando: guardar un valor válido lo fija; uno inválido no cambia nada y muestra aviso; quitar el objetivo lo elimina y vuelve la vista de invitación.

- [x] **T-11** Refrescar el progreso al guardar una sesión nueva (en el submit del formulario) sin recargar. Cubre RF-9.
  Hecho cuando: añadir una sesión de la semana actual incrementa el progreso de inmediato.

## Cierre

- [x] **T-12** Verificación final: `node --test` en verde, sin errores en consola, captura móvil 375 px correcta y checklist de "Criterios de finalización" de la spec. Cubre RNF-1…RNF-6.
  Hecho cuando: todos los puntos de los criterios de finalización están verificados y la spec pasa a `implementada`.

- [x] **T-13** Actualizar `MEMORY.md` (clave, decisión y estado) y marcar T-1…T-12 como hechas.
  Hecho cuando: `MEMORY.md` refleja el objetivo semanal y las tareas están todas con `[x]`.
