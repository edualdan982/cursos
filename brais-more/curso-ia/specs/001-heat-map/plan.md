# Plan 001 — Mapa de calor de estudio

> Referencias: constitución en `constitution.md` (raíz del proyecto, no en `docs/`; ver nota al final), spec activa en `specs/001-heat-map/spec.md`.

## 1. Archivos que se crean o modifican

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `app.js` | Modificar | Punto de entrada de la app. Nuevas funciones puras de lógica (sección 2) y pegado fino con el DOM: renderizado del mapa, selector de semanas, tooltip, filtrado de sesiones, re-render tras guardar sesión o cambiar tema. Los cálculos siguen siendo funciones puras sin DOM ni localStorage. |
| `styles.css` | Modificar | Estilos del mapa de calor (grid, celdas, niveles de intensidad para tema claro y oscuro vía variables CSS existentes), leyenda, selector y tooltip. Tema claro/oscuro con `[data-theme="dark"]` siguiendo el patrón actual. |
| `index.html` | Modificar | Marca HTML del mapa: contenedor del grid, selector de semanas, leyenda, tooltip y mensaje de filtro activo. Etiquetas en español, código en inglés. |
| `heat-map.test.js` (raíz, junto a `app.js`) | Crear | Tests con `node --test` sobre las funciones puras de `app.js` (niveles de color, rango de fechas, suma por día). Debe ejecutarse con `node --test` sin instalar paquetes. |
| `MEMORY.md` | Modificar | Registrar la decisión del mapa, umbrales y rango por defecto al terminar la implementación. |
| `specs/001-heat-map/spec.md` | No tocar | La spec manda; el plan la implementa, no la redefine. Las dudas marcadas `[NECESITA ACLARACIÓN]` se resuelven antes de codificar o se dejan explícitas abajo. |

## 2. Funciones puras de lógica (reciben "hoy" como parámetro)

Todas sin DOM ni localStorage, siguiendo la constitución §3 y RNF-3.

| Función (nombre orientativo) | Entrada | Salida | RF que cubre |
|---|---|---|---|
| `sumMinutesByDate(sessions)` | lista de sesiones | mapa `fecha → minutos totales` | RF-3 |
| `levelForMinutes(minutes)` | minutos de un día | nivel 0–4 | RF-2 |
| `buildHeatMapData(sessions, today, weeks)` | sesiones, hoy, semanas | lista de días `{date, minutes, level, isFuture}` alineada por lunes | RF-1, RF-2, RF-3, RF-7, RF-8 |
| `weekStartMonday(date)` | una fecha | lunes de esa semana | RF-7 |
| `formatTooltip(date, minutes)` | fecha, minutos | texto "lun, 5 oct — 45 min" / "sin sesiones" | RF-9 |
| `filterSessionsByDate(sessions, date)` | sesiones, fecha | sesiones de ese día | RF-10 |

## 3. Algoritmo del mapa en pseudocódigo

```
heatMapData(sessions, today, weeks):
    start = weekStartMonday(today) - (weeks - 1) semanas
    end   = weekStartMonday(today) + 6 días        // domingo de la semana actual
    minutesByDate = sumMinutesByDate(sessions)
    days = []
    for d in start .. end:
        minutes = minutesByDate[d] ?? 0
        level = isFuture(d, today) ? "future" : levelForMinutes(minutes)
        days.push({ date: d, minutes, level })
    return days

levelForMinutes(m):
    m == 0     -> 0
    1..15      -> 1
    16..45     -> 2
    46..90     -> 3
    >90        -> 4
```

Filtrado: `filterSessionsByDate` devuelve las sesiones cuyo `date` coincide exactamente con la celda pulsada; desfiltrar restaura la lista completa sin tocar localStorage.

## 4. Cómo se pinta en la interfaz

- **Grid**: `CSS grid` con 7 filas (lunes a domingo) y N columnas (semanas). Cada celda es un `<div>` con clase según nivel (`level-0`…`level-4`, `level-future`). Una semana = una columna.
- **Colores**: variables CSS por tema (`:root` claro, `[data-theme="dark"]` oscuro), 5 pasos de intensidad en un solo tono (p. ej. verde) para que "más oscuro = más minutos". `level-future` usa color atenuado y `pointer-events` reducido.
- **Selector de semanas**: `<select>` con opciones 8/12/26/52, valor por defecto 12. Al cambiar, se recalcula `buildHeatMapData` y se repinta.
- **Tooltip**: al pasar el ratón sobre una celda se muestra fecha y minutos (o "sin sesiones"). En móvil se muestra al tocar.
- **Clic en celda**: filtra la lista de sesiones a ese día y muestra un aviso "Mostrando sesiones de … · ver todo". Segundo clic en la misma celda o el control "ver todo" quita el filtro.
- **Tema**: al alternar el tema, solo cambian las variables CSS; no se recalcula nada (RF-4).
- **Actualización**: tras guardar una sesión se recalcula y se repinta el mapa junto a racha y totales (RF-12).

## 5. Decisiones técnicas justificadas (y alternativa descartada)

| Decisión | Justificación | Alternativa descartada y por qué |
|---|---|---|
| Funciones puras en `app.js` recibiendo `today` | Cumple constitución §3 y RNF-3; permite tests sin DOM | Separar en un módulo nuevo: añade complejidad de carga de scripts sin beneficio real en esta app |
| CSS grid con clases `level-N` y variables por tema | Simple, repintado gratis al cambiar tema, sin JS | Inline styles por celda: acopla datos y presentación y obliga a repintar al cambiar tema |
| Tooltip con elemento posicionado / `title` nativo | `title` nativo es lo más simple y accesible sin librerías | Librería de tooltips: violaría constitución §1 (sin dependencias) |
| Persistir selector de semanas en localStorage (como el tema) | Consistente con la persistencia del tema; mejora la UX | No persistir: el usuario tendría que re-elegir en cada carga; la propia spec ya lo deja como duda y el patrón del tema lo favorece |
| Tests solo de lógica pura con `node --test` | Constitución §4: los tests son la puerta y la lógica pura es lo testeable sin navegador | Tests E2E con navegador: requieren dependencias y build, prohibidos |
| Umbrales fijos 0/15/45/90 | Aprobados en la spec; simples y predecibles | Gradiente continuo: menos legible y más difícil de testear |

## 6. Estrategia de tests con `node --test`

Archivo `heat-map.test.js` en la raíz, ejecutable con `node --test` (sin instalar paquetes, sin package.json, sin build). Cubre las funciones puras de `app.js`:

- `sumMinutesByDate`: varias sesiones el mismo día se suman; días distintos se separan; lista vacía devuelve mapa vacío. → RF-3
- `levelForMinutes`: bordes exactos 0, 1, 15, 16, 45, 46, 90, 91. → RF-2
- `buildHeatMapData`: rango de N semanas empieza en lunes y termina en domingo; los días futuros se marcan como `future` aunque tengan minutos 0; los minutos de un día coinciden con la suma de sus sesiones. → RF-1, RF-7, RF-8
- `weekStartMonday`: un domingo devuelve el lunes anterior; un lunes devuelve el mismo día. → RF-7
- `filterSessionsByDate`: devuelve solo las sesiones de la fecha; fecha sin sesiones devuelve lista vacía. → RF-10
- `formatTooltip`: día con sesiones incluye minutos; día sin sesiones dice "sin sesiones". → RF-9

Toda implementación queda bloqueada hasta que `node --test` pase en verde (constitución §4).

## 7. Cobertura RF → plan

| RF | Dónde se cubre |
|---|---|
| RF-1 | `buildHeatMapData`, grid CSS, pseudocódigo §3 |
| RF-2 | `levelForMinutes`, clases `level-N`, tests de bordes |
| RF-3 | `sumMinutesByDate`, tests |
| RF-4 | variables CSS por tema, decisión 5.2 |
| RF-5 | leyenda en `index.html`/`styles.css` |
| RF-6 | `<select>` de semanas, opciones 8/12/26/52, defecto 12 |
| RF-7 | `weekStartMonday`, tests de alineación |
| RF-8 | marca `future` en `buildHeatMapData`, estilo `level-future` |
| RF-9 | tooltip en grid, `formatTooltip`, tests |
| RF-10 | `filterSessionsByDate`, aviso de filtro activo |
| RF-11 | segundo clic / "ver todo" restaura lista |
| RF-12 | re-render tras guardar sesión en `app.js` |

## Notas

- La constitución está en `constitution.md` (raíz), no en `docs/constitution.md` como indica AGENTS.md; el plan asume el contenido leído en la raíz. Conviene mover el archivo o corregir AGENTS.md.
- No existe `package.json` ni carpeta de tests: `node --test` descubrirá `*.test.js` en la raíz sin configuración.
- Las tres dudas `[NECESITA ACLARACIÓN]` de la spec (persistencia del selector, posición del mapa, clic en días sin sesión) se han resuelto en este plan con las decisiones de la sección 5; si se prefiere otra opción, se actualiza la spec antes de codificar.
