# < Prompt inicial >

```text
    ## Rol

    Actúa como desarrollador frontend senior que escribe código simple, claro y fácil de entender para alguien que está empezando a
    programar.

    ## Contexto

    Quiero crear desde cero "Diario de Estudio", una web para registrar mis sesiones de estudio y motivarme viendo mi racha de dias
    seguidos estudiando. Esta es la primera version y tiene que ser muy simple. La web se construira poco a poco, asi que ahora solo
    necesito una base limpia que funcione a la primera.

    ## Tarea

    Crea la web con estas funcionalidades:
    1. Un formulario para registrar una sesion con: - Fecha (por defecto hoy, pero editable para poder apuntar dias anteriores) - Tema (texto, obligatorio) - Minutos (numero mayor que 0, obligatorio) 
    2. La racha actual en grande, con un 🔥.
    3. La lista de sesiones, de la más reciente a la más antigua. 4. Los datos guardados en localStorage para que no se pierdan al recargar.

    ## Restricciones y reglas

    Racha: - Un dia cuenta si tiene al menos una sesión. - La racha son los dias consecutivos con sesión que terminan hoy. 
    - Si hoy todavia no he estudiado pero ayer si, la racha sigue viva: no se rompe hasta que termina el dia.
    - Usa siempre la fecha local del usuario, nunca UTC.

    Técnicas:
    -HTML, CSS y JavaScript, sin frameworks, sin librerias y sin compilar nada.
    - Solo tres archivos: index.html, styles.css y app.js.
    - Tiene que funcionar abriendo index.html con doble clic, sin servidor ni instalación.
    - No añadas nada que no aparezca en este mensaje.
    - Diseno limpio y moderno, que se vea bien en el movil.
    - Todos los textos de la interfaz en español.

    ## Formato de salida

    1. Crea los tres archivos directamente en la carpeta del proyecto.
    2. Al terminar, responde con:
        - Un resumen de 3-4 lineas de lo que has creado.
        - Los pasos para probario.
        - Cualquier decision que hayas tomado por tu cuenta y que yo deba revisar.
```

# < Uso del Modo Plan >

```text
    Quiero anadir la "mejor racha": la racha mas larga que he conseguido
    nunca, mostrada junto a la racha actual.

    Antes de escribir código, prepárame un plan con:
    1. Como vas a calcular la mejor racha a partir de las sesiones
    guardadas, respetando las reglas de fechas y racha de AGENTS.md.
    2. Que archivos vas a modificar y que cambia en cada uno.
    3. Los casos limite y las dudas que debo decidir yo antes de empezar.
    4. Que actualizaras en AGENTS.md y en MEMORY.md.
```