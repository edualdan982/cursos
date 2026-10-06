# MEMORY.md - Diario de Estudio

Memoria del proyecto entre sessiones. Maximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado Actual
- v1.4 total días este mes en navbar
- Verificado con Chrome DevTools (06-10-2026): 3 sesiones (hoy/ayer/anteayer) → racha 3, mejor racha 3, sin errores de consola, vista móvil 375px correcta
- Pluralización arreglada: "1 día este mes" y etiqueta de racha "día/días" dinámica; fecha hardcodeada en index.html eliminada (la rellena JS)
- Mapa de calor tipo GitHub añadido (spec 001): 5 niveles (0/1-15/16-45/46-90/>90 min), selector 8/12/26/52 semanas (persiste en localStorage, def. 12), tooltip, clic filtra sesiones, tema claro/oscuro con variables CSS. Lógica pura testeada con `node --test` (16 tests verdes)
- Datos en localStorage (sesión, rachas, mejor racha, minutos semanales, días este mes)
- **Añadida responsividad**: navbar colapsa en móvil, título y botones se reacomodan
- **Añadido modo oscuro**: variables CSS, toggle con ícono ☀️/🌙, persiste en localStorage
- **Fecha actual en navbar**: se muestra y actualiza cada minuto (yyyy-mm-dd)
- **Total minutos esta semana**: suma de minutos de sesiones entre lunes y hoy, Mostrado en navbar
- **Total días este mes**: cuenta de días únicos con sesión entre el 1 del mes y hoy

## Decisiones (y por qué)
- Sin backend ni dependencias: cualquiera debe poder abrirlo con doble clic
- **Navbar con tema (izquierda), título (centro) y fecha (derecha)**: mejora accesibilidad y orientación
- **Modo oscuro con persistencia en localStorage**: si el usuario lo cambia, se recuerda
- **Fecha en navbar actualizada cada minuto**: captura el cambio de día sin necesidad de recargar
- **Total minutos esta semana**: cálculo usando inicio de semana en lunes (es-ES); sesiones desde lunes 00:00 hasta hoy se suman. Se muestra en navbar junto a la fecha para visibilidad rápida
- **Total días este mes**: cuenta de **días únicos** con sesión entre el 1 del mes y hoy (múltiples sesiones mismo día cuentan como 1). Se muestra en navbar tras el total semanal
- **Racha = días consecutivos con sesión que terminan hoy**: regla mantenida tal cual
- **Mejor racha = récord histórico sin regla "viva"**: sin cambios, se conserva

## Aprendizajes y errores a evitar
- Los íconos de tema (☀️/🌙) funcionan mejor que texto para ahorrar espacio en móvil
- Las variables CSS en `:root` + `[data-theme="dark"]` son la forma más mantenible de hacer temas
- El `setInterval` cada minuto es suficiente para fecha; no sobrecarga el navegador
- Para el cálculo semanal: lunes es el primer día de la semana según `locale es-SE`; asegurar que las comparaciones de fecha funcionen correctamente con `parseDate`
- Para el cálculo mensual: solo contar días únicos (no sumar minutos); comparaciones de fecha `yyyy-mm-dd` funcionan por orden lexicográfico

## Proximos pasos
- Ninguno planeado por ahora. Si se añade modo "sistema", ya está soportado por `prefers-color-scheme`. Los cálculos semanal y mensual ya están integrados y persisten al recargar.


## TAREAS:
- Crea comando para los prompts de SSD
- Implementa una nueva spec.