# MEMORY.md - Diario de Estudio

Memoria del proyecto entre sessiones. Maximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado Actual
- v1.5 objetivo semanal (spec 002): fijar/editar/quitar objetivo en minutos, barra + porcentaje real, estado "cumplido". 30 tests verdes (16 heat-map + 14 weekly-goal)
- Verificado con Chrome DevTools (07-10-2026): progreso parcial/cumplido/quitado, refresco al guardar sesión, móvil 375px y tema oscuro sin errores
- v1.4 total días este mes en navbar
- Mapa de calor tipo GitHub añadido (spec 001): 5 niveles, selector 8/12/26/52 semanas (persiste), tooltip, clic filtra, tema claro/oscuro
- Datos en localStorage (sesiones, rachas, mejor racha, minutos semanales, días este mes, objetivo semanal)
- Responsividad (móvil 375px), modo oscuro persistente, fecha actual en navbar cada minuto

## Decisiones (y por qué)
- Sin backend ni dependencias: cualquiera debe poder abrirlo con doble clic
- **Objetivo semanal en clave propia `study-diary-weekly-goal`** (número en texto): quitar = `removeItem`; sin la clave no hay objetivo (compatibilidad hacia atrás)
- **`sumWeeklyMinutes(sessions, today)` como única fuente de verdad** de la semana lunes–hoy; `calculateWeeklyMinutes` delega en ella (evita divergencias)
- **Barra topada al 100 % + porcentaje real en texto** (p. ej. 150 %): barra legible sin desbordar
- **Formulario de edición oculto tras botón "Fijar/Editar objetivo"**: la vista normal queda limpia
- **`parseGoalInput` valida en UI y al cargar** (entero > 0; decimal/vacío/0/negativo → null): una sola regla
- **Navbar con tema (izquierda), título (centro) y fecha/derecha + totales**: orientación y visibilidad rápida
- **Racha = días consecutivos con sesión que terminan hoy**; **mejor racha = récord histórico sin regla "viva"**
- **Fecha en navbar actualizada cada minuto**: captura el cambio de día sin recargar

## Aprendizajes y errores a evitar
- Los íconos de tema (☀️/🌙) funcionan mejor que texto para ahorrar espacio en móvil
- Las variables CSS en `:root` + `[data-theme="dark"]` son la forma más mantenible de hacer temas
- El `setInterval` cada minuto es suficiente para fecha; no sobrecarga el navegador
- Para el cálculo semanal: lunes es el primer día de la semana según `locale es-SE`; asegurar que las comparaciones de fecha funcionen correctamente con `parseDate`
- Para el cálculo mensual: solo contar días únicos (no sumar minutos); comparaciones de fecha `yyyy-mm-dd` funcionan por orden lexicográfico

## Proximos pasos
- Ninguno planeado. Próximas specs irían en `specs/003-*/`.


## TAREAS:
- Crea comando para los prompts de SSD
- Implementa una nueva spec.