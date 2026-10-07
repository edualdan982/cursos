# Spec 002 — Objetivo semanal de estudio

Estado: implementada

## Contexto y objetivo

El Diario de Estudio ya muestra cuántos minutos se han estudiado en la semana actual (`weeklyTotal`), pero ese número aislado no dice si el usuario va cumpliendo lo que se propuso. Sin una meta, es difícil automotivarse.

El objetivo es permitir al usuario fijar un objetivo de minutos por semana y ver, de un vistazo, cuánto lleva respecto a ese objetivo. Así puede:

- Saber si va por buen camino o necesita intensificar.
- Tener una motivación clara (progreso hacia una meta concreta).
- Ajustar su objetivo cuando cambie su disponibilidad.

La semana se entiende igual que el total semanal actual: **de lunes a domingo**, en hora local.

## Usuarios

- Estudiante que registra sesiones en el Diario y quiere cumplir una meta semanal de estudio.

## Historias de usuario

- HU-1: Como estudiante, quiero fijar cuántos minutos quiero estudiar cada semana, para tener una meta concreta.
- HU-2: Como estudiante, quiero ver cuánto llevo respecto a mi objetivo esta semana, para saber si voy por buen camino.
- HU-3: Como estudiante, quiero cambiar o quitar mi objetivo, para adaptarlo a mi disponibilidad.
- HU-4: Como estudiante, quiero que mi objetivo se recuerde al volver a abrir la app, para no tener que reescribirlo.

## Definiciones

- **Objetivo semanal**: número de minutos que el usuario se propone estudiar entre el lunes y el domingo de la semana actual.
- **Progreso semanal**: minutos ya estudiados en la semana actual (de lunes a hoy), calculados igual que el total semanal existente.
- **Suma de varias sesiones**: si hay varias sesiones en la semana, sus minutos se suman para el progreso.

## Requisitos funcionales

### Fijar el objetivo (RF-1 a RF-3)

- **RF-1**: EL SISTEMA permitirá al usuario fijar un objetivo semanal en minutos.
  - Criterio de aceptación (EARS): CUANDO el usuario introduzca un valor de minutos y lo confirme, ENTONCES el sistema GUARDARÁ ese valor como su objetivo semanal.
- **RF-2**: SI el valor introducido no es un número entero de minutos mayor que cero, ENTONCES EL SISTEMA NO modificará el objetivo y mostrará un aviso.
  - Criterio de aceptación: CUANDO el valor sea vacío, 0, negativo o no numérico, ENTONCES el objetivo previo se mantiene sin cambios.
- **RF-3**: EL SISTEMA permitirá quitar el objetivo (dejarlo sin fijar).
  - Criterio de aceptación: CUANDO el usuario elimine su objetivo, ENTONCES el sistema dejará de mostrar progreso contra meta.

### Ver el progreso (RF-4 a RF-7)

- **RF-4**: MIENTRAS exista un objetivo fijado, EL SISTEMA mostrará el progreso semanal respecto al objetivo.
  - Criterio de aceptación: CUANDO haya objetivo, ENTONCES se mostrarán los minutos realizados, los minutos objetivo y una indicación de la proporción (p. ej. porcentaje o barra).
- **RF-5**: EL SISTEMA calculará el progreso sumando los minutos de las sesiones entre el lunes de la semana actual y hoy (hora local), con el mismo criterio que el total semanal existente.
  - Criterio de aceptación: CUANDO haya sesiones en la semana, ENTONCES el progreso será la suma de sus minutos; las sesiones de semanas anteriores no cuentan.
- **RF-6**: CUANDO el progreso alcance o supere el objetivo, ENTONCES EL SISTEMA lo indicará claramente (p. ej. estado de "objetivo cumplido").
  - Criterio de aceptación: CUANDO los minutos de la semana sean iguales o mayores que el objetivo, ENTONCES se mostrará el estado de cumplido.
- **RF-7**: SI no hay objetivo fijado, ENTONCES EL SISTEMA no mostrará progreso contra meta y ofrecerá fijar uno.
  - Criterio de aceptación: CUANDO no exista objetivo, ENTONCES se verá una invitación a fijarlo, sin porcentajes ni estados de cumplido.

### Persistencia y actualización (RF-8 a RF-9)

- **RF-8**: EL SISTEMA recordará el objetivo entre sesiones (se conserva al recargar y al cerrar y abrir la app).
  - Criterio de aceptación: CUANDO el usuario fije un objetivo y recargue la página, ENTONCES el objetivo seguirá fijado.
- **RF-9**: CUANDO el usuario guarde una sesión nueva, ENTONCES EL SISTEMA actualizará el progreso sin recargar.
  - Criterio de aceptación: CUANDO se añada una sesión de la semana actual, ENTONCES el progreso aumentará de inmediato.

### Semana nueva (RF-10)

- **RF-10**: CUANDO cambie la semana (nuevo lunes), ENTONCES EL SISTEMA reiniciará el progreso a 0 manteniendo el objetivo fijado.
  - Criterio de aceptación: CUANDO se consulte en una semana distinta, ENTONCES el progreso corresponderá solo a la nueva semana.

## Requisitos no funcionales

- **RNF-1**: La app sigue funcionando abriendo `index.html` con doble clic, sin servidor ni build.
- **RNF-2**: Sin dependencias ni frameworks: HTML, CSS y JS puros.
- **RNF-3**: El cálculo del progreso y de la proporción respecto al objetivo es una función pura, sin DOM ni localStorage, que recibe "hoy" como parámetro y está cubierta por tests con `node --test`.
- **RNF-4**: Fechas en hora local y formato `yyyy-mm-dd`, con compatibilidad hacia atrás con los datos ya guardados en localStorage.
- **RNF-5**: La vista del objetivo y su progreso es legible en móvil (375 px) y en escritorio.
- **RNF-6**: Interfaz y documentación en español; código en inglés.

## Casos límite

- Sin objetivo fijado: solo se muestra la invitación a fijarlo.
- Objetivo muy pequeño (p. ej. 1 min) ya superado: estado de cumplido desde el primer minuto.
- Progreso exactamente igual al objetivo: se considera cumplido.
- Objetivo eliminado tras estar cumplido: desaparece el progreso contra meta.
- Varias sesiones en la semana: se suman para el progreso.
- Sesiones de semanas anteriores: no afectan al progreso de la semana actual.
- Cambio de semana sin sesiones nuevas: el progreso vuelve a 0 pero el objetivo se mantiene.

## Fuera de alcance

- Objetivos diarios o mensuales.
- Historial de objetivos pasados o estadísticas de cumplimiento entre semanas.
- Rachas de objetivos cumplidos o insignias.
- Notificaciones o recordatorios.
- Sincronización entre dispositivos o backend.

## Criterios de finalización

- [x] Se puede fijar un objetivo semanal en minutos y se guarda al recargar.
- [x] Se muestra el progreso de la semana actual frente al objetivo, con estado de cumplido al alcanzarlo.
- [x] Se puede cambiar y quitar el objetivo; sin objetivo no se muestra progreso contra meta.
- [x] El progreso se actualiza al guardar una sesión sin recargar y respeta el criterio de semana lunes–hoy.
- [x] La lógica de cálculo es pura, con tests `node --test` en verde.
- [x] Vista correcta en móvil (375 px) y escritorio, sin errores en consola.

## Decisiones de clarificación

- El objetivo y su progreso se muestran en una **sección propia en el cuerpo** (no en la navbar).
- El objetivo se fija o edita con un **botón que abre la edición** ("Fijar/Editar objetivo"); no hay formulario permanente.
- El avance se indica con **barra de progreso + porcentaje en texto**.
- Al superar el objetivo, la **barra se llena al 100 % y el texto muestra el porcentaje real** (p. ej. 130 %).

## Dudas abiertas

- Ninguna pendiente.
