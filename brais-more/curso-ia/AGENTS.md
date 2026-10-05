# AGENTS.md - Diario de Estudio

## Proyecto
App vanilla HTML/CSS/JS ("Diario de Estudio") - sin herramientas de build, sin framework, sin dependencias.

## Archivos
- `index.html` - punto de entrada, abrir directamente en el navegador
- `styles.css` - estilos
- `app.js` - lógica (localStorage, cálculo de racha, renderizado)

## Ejecutar
```
# No se necesita servidor - abrir directamente
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

## Lógica clave (app.js)
- Racha actual = días consecutivos con ≥1 sesión que terminan **hoy** (fecha local)
- Si hoy no hay sesión pero ayer sí, la racha sigue viva hasta medianoche
- Mejor racha = racha consecutiva más larga histórica (solo días con sesión real, sin regla "viva")
- **Total minutos esta semana**: suma de minutos de sesiones entre lunes y hoy (formato `yyyy-mm-dd`); se calcula al renderizar
- **Total días este mes**: cuenta de días únicos con sesión entre el 1 del mes y hoy (múltiples sesiones mismo día cuentan como 1); se calcula al renderizar
- Datos guardados en `localStorage` con clave: `study-diary-sessions`
- Sesión: `{ date: "YYYY-MM-DD", topic: string, minutes: number }`
- Formato de fecha en navbar: `yyyy-mm-dd`, actualizado cada minuto

## Forma de trabajar
- Haz solo lo que se pide: no añadas funcionalidades por tu cuenta.
- Cambios pequeños y enfocados; no reescribas lo que ya funciona.
- Al terminar, resume qué has cambiado y cualquier decisión que deba revisar.

## Memoria
- Al empezar, lee 'MEMORY.md` para conocer el estado del proyecto y las decisiones tomadas.
- Al terminar una tarea, actualízalo: estado actual, decisiones importantes (con su porqué) y errores a evitar.
- Mantenlo breve (maximo ~50 lineas): resume o elimina lo que ya no aporte.
- Si algo se convierte en una regla permanente, propón moverlo a 'AGENTS.md' en lugar de dejarlo en la
memoria.
- No guardes nunca datos sensibles (claves, tokens, datos personales).

## Límites
- ✅ Siempre: respetar las reglas de fechas y racha, mantener los textos en español.
- ⚠️ Pregunta antes: crear archivos nuevos, cambiar el formato de los archivos guardados.
- 🚫 Nunca: añadir dependencias, frameworks o un paso de build.

## Verificación
- No hay tests ni lint. Probar abriendo `index.html` en el navegador.
- Para empezar de cero: DevTools → Application → Local Storage → borrar la clave `study-diary-sessions`
