# Plan 002 — Objetivo semanal de estudio

> Referencias: constitución en `docs/constitution.md`, spec activa en `specs/002-weekly-goal/spec.md`.
> Existente relevante: `calculateWeeklyMinutes` y `weekStartMonday` en `app.js` ya usan el criterio lunes–hoy; el nuevo objetivo reutiliza ese mismo criterio.

## 1. Archivos que se modifican o crean

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `app.js` | Modificar | Nuevas funciones puras (sección 2) y pegado con el DOM: renderizar el progreso, mostrar/ocultar el formulario de edición, leer/guardar/borrar el objetivo en localStorage, y refrescar al guardar una sesión. Los cálculos siguen siendo puros, sin DOM ni localStorage. |
| `index.html` | Modificar | Nueva sección `weekly-goal` en el cuerpo (tras las rachas, antes del mapa de calor): título, barra de progreso, texto de progreso, botón "Fijar/Editar objetivo" y formulario de edición oculto. Etiquetas en español. |
| `styles.css` | Modificar | Estilos de la sección, barra de progreso y estado "cumplido", con variables CSS por tema (`:root` y `[data-theme="dark"]`). Responsive 375 px. |
| `weekly-goal.test.js` (raíz) | Crear | Tests `node --test` de las funciones puras (progreso semanal, porcentaje, validación de objetivo). |
| `MEMORY.md` | Modificar | Registrar la decisión y el estado al terminar. |
| `specs/002-weekly-goal/spec.md` | No tocar | La spec manda; el plan la implementa. |

## 2. Funciones puras de lógica (reciben "hoy" como parámetro)

Todas sin DOM ni localStorage (constitución §3, RNF-3).

| Función | Entrada | Salida | RF |
|---|---|---|---|
| `sumWeeklyMinutes(sessions, today)` | sesiones, hoy | minutos entre el lunes de la semana de `today` y `today` (inclusive) | RF-5 |
| `goalPercent(studied, goal)` | minutos estudiados, objetivo | entero `round(studied/goal*100)`; `0` si `goal <= 0`; puede superar 100 | RF-4, RF-6 |
| `weeklyGoalProgress(sessions, today, goalMinutes)` | sesiones, hoy, objetivo | `{ hasGoal, studied, goal, percent, achieved }` | RF-4, RF-5, RF-6, RF-7 |
| `parseGoalInput(raw)` | valor de un input (string/number/vacío) | entero positivo o `null` si no es válido | RF-2 |

Detalle de `weeklyGoalProgress`:
- `hasGoal = Number.isInteger(goalMinutes) && goalMinutes > 0`.
- `studied = sumWeeklyMinutes(sessions, today)`.
- Si no hay objetivo: `{ hasGoal:false, studied, goal:0, percent:0, achieved:false }`.
- Si hay objetivo: `goal = goalMinutes`, `percent = goalPercent(studied, goal)`, `achieved = studied >= goal`.

`calculateWeeklyMinutes(sessions)` existente pasa a delegar en `sumWeeklyMinutes(sessions, getToday())` para no duplicar el criterio de semana (una sola fuente de verdad).

## 3. Algoritmo en pseudocódigo

```
sumWeeklyMinutes(sessions, today):
    weekStart = weekStartMonday(today)
    total = 0
    for s in sessions:
        if weekStart <= parseDate(s.date) <= today: total += s.minutes
    return total

weeklyGoalProgress(sessions, today, goalMinutes):
    studied = sumWeeklyMinutes(sessions, today)
    if not (goalMinutes > 0): return {hasGoal:false, studied, goal:0, percent:0, achieved:false}
    return { hasGoal:true, studied, goal:goalMinutes,
             percent: goalPercent(studied, goalMinutes),
             achieved: studied >= goalMinutes }

goalPercent(studied, goal):
    if goal <= 0: return 0
    return round(studied / goal * 100)

parseGoalInput(raw):
    n = Number(raw)
    if raw == "" or not Number.isInteger(n) or n <= 0: return null
    return n
```

## 4. Persistencia de datos

- Nueva clave localStorage: `study-diary-weekly-goal`, con el valor como número en texto (p. ej. `"300"`).
- Al quitar el objetivo se elimina la clave (`localStorage.removeItem`).
- Al cargar: se lee y se valida con `parseGoalInput`; si no es válido, se trata como "sin objetivo". Compatibilidad hacia atrás: si la clave no existe, no hay objetivo y la app funciona igual que antes (RNF-4).

## 5. Cómo se pinta en la interfaz

- **Sección `weekly-goal`** (cuerpo, tras `.streaks-header`): `h2` "Objetivo semanal".
- **Vista de progreso** (visible cuando hay objetivo):
  - Barra: contenedor + relleno con `width: <min(percent,100)>%` (la barra nunca supera el 100 %, decisión de clarificación).
  - Texto: `"<studied> / <goal> min · <percent> %"` (el porcentaje real puede pasar de 100).
  - Estado cumplido: cuando `achieved`, se añade clase/etiqueta "¡Objetivo cumplido!".
- **Sin objetivo** (RF-7): se muestra un texto tipo "Aún no has fijado un objetivo semanal" y el botón "Fijar objetivo"; sin barra ni porcentaje.
- **Edición**: botón "Fijar/Editar objetivo" que muestra un formulario oculto con un `<input type="number" min="1">`, botón "Guardar" y botón "Quitar objetivo" (solo si ya hay objetivo). Al guardar inválido (RF-2) se muestra un aviso y no se modifica el valor previo.
- **Actualización** (RF-9): tras guardar una sesión se vuelve a renderizar el progreso junto al resto.
- **Tema** (RNF-5): barra y textos usan variables CSS de `:root` y `[data-theme="dark"]`.

## 6. Decisiones técnicas justificadas (y alternativa descartada)

| Decisión | Justificación | Alternativa descartada |
|---|---|---|
| Nueva función pura `sumWeeklyMinutes(sessions, today)` y que `calculateWeeklyMinutes` delegue en ella | Una sola fuente de verdad del criterio de semana y testeable | Duplicar el cálculo: dos sitios que podrían divergir |
| Guardar el objetivo como número simple en su propia clave | Mínimo cambio, compatible, fácil de validar y borrar | Objeto `{goal}`: más estructura de la necesaria para un único valor |
| Barra topada al 100 % y porcentaje real en texto | Decisión de clarificación de la spec; barra legible sin desbordar | Permitir >100 % en la barra: difícil de representar visualmente |
| Formulario de edición oculto tras un botón | Decisión de clarificación (HU-3); la vista normal queda limpia | Formulario siempre visible: ruido visual |
| Funciones puras en `app.js`, tests en la raíz | Constitución §1 y §4; sin build ni dependencias | Módulo separado: carga extra de scripts sin beneficio |
| Validación con `parseGoalInput` compartida por UI y carga | Una sola regla de validez (RF-2) | Validar en dos sitios: riesgo de divergencia |

## 7. Estrategia de tests con `node --test`

Archivo `weekly-goal.test.js` en la raíz (sin `package.json`, sin build). Cubre las funciones puras:

- `sumWeeklyMinutes`: suma solo lunes–hoy; ignora sesiones de la semana anterior; semana que cruza el fin de semana; lista vacía = 0. → RF-5
- `goalPercent`: 0/300 = 0 %; 150/300 = 50 %; 300/300 = 100 %; 390/300 = 130 %; objetivo 0 o negativo = 0 %. → RF-4, RF-6
- `weeklyGoalProgress`: sin objetivo → `hasGoal:false` y `percent:0`; con objetivo parcial → datos correctos; `studied == goal` y `studied > goal` → `achieved:true`. → RF-4, RF-6, RF-7
- `parseGoalInput`: `""`, `"0"`, `"-5"`, `"abc"`, `null` → `null`; `"300"` y `300` → `300`; decimal → `null`. → RF-2

Toda implementación queda bloqueada hasta que `node --test` pase en verde (constitución §4).

## 8. Cobertura RF → plan

| RF | Dónde se cubre |
|---|---|
| RF-1 | Formulario de edición (`index.html`, `app.js`) |
| RF-2 | `parseGoalInput`, aviso de valor inválido en UI |
| RF-3 | Botón "Quitar objetivo", `removeItem` |
| RF-4 | `weeklyGoalProgress` + `goalPercent`, barra y texto |
| RF-5 | `sumWeeklyMinutes`, tests |
| RF-6 | `achieved` en `weeklyGoalProgress`, estado "cumplido" |
| RF-7 | `hasGoal:false`, vista de invitación a fijar objetivo |
| RF-8 | Clave `study-diary-weekly-goal` en localStorage |
| RF-9 | Re-render del progreso tras guardar sesión en `app.js` |
| RF-10 | `sumWeeklyMinutes` con `weekStartMonday`, reinicio natural al cambiar de semana |
