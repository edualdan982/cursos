# Curso de IA - DIA 1

## LLM (Large Language Model)

- **LLM:** Es un modelo de IA entrenado con grandes cantidades de texto para aprender patrones del lenguaje y generar respuestas mediante probabilidad(inferencia).

- **Funcionamiento:**
    1. Recibe el mensaje
    2. Lo procesa en fragmentos llamados tokens
    3. Calcula que token podría venir a continuación, elige uno y repite el proceso hasta completar la respuesta.

## Tipos de modelos

- **Pesos abiertos/cerrados:** Si puedes acceder
a los parámetros del modelo. Su uso depende
de la licencia.

- **Ejecución nube/local:** Si el modelo se ejecuta
en tu equipo o en servidores remotos.

    - Un modelo de pesos abiertos puede ejecutarse tanto en local como en la nube.
    - Los de pesos cerrados suelen ofrecerse mediante servicios en la nube.
    - Pesos abiertos no significa necesariamente código abierto. Pueden faltar el código de entrenamiento, los datos o permisos de uso.

Resources: 
- [https://artificialanalysis.ai](https://artificialanalysis.ai)
- [https://llm-stats.com](https://llm-stats.com)


## Fundamentes de los LLM

- **Tokens:** Unidades en las que se procesa la info.
- **Parametros:** Valores internos aprendidos.
- **Temperatura:** Ajuste al seleccionar tokens.
- **Prompt:** Instrucciones que proporcionas al modelo.
- **Ventana **de contexto: Limite de token que maneja.
- **Multimodalidad:** Capacidad de procesamiento.
- **Razonamiento:** Resolución de problemas en pasos.
- **Alucinaciones:** Info incorrecta o inventada.
- **Latencia:** Tiempo de espera de la respuesta.

- **Ventana:** Es la "memoria a corto plazo" del modelo en una conversacion. Define la cantidad maxima de texto (tokens) que el modelo puede leer, procesar y recordar a la vez sin "olvidar" el principio del documento o la charla.
- **Multimodilidad:** Un modelo multimodal puede "ver" imágenes, "escuchar" audios, analizar vídeos ... 
- **Latencia:** Es el tiempo de espera. Se mide desde que pulsas "Enviar" hasta que el modelo responde el primer token.
- **Alucinaciones:** Es el mayor defecto de los LLM. Ocurre cuando el modelo no sabe la respuesta y se inventa info.
- **Fast vs. razonamiento:** Diferencia entre modelos convencionales y los nuevos modelos de razonamiento que pausan, planifican y verifican internamente sus pasos lógicos antes de darte la respuesta final.

Todo esto se resume en la parte de Inteligencia:
- **Inteligencia:** Es la capacidad de un sistema para comprender informacion, razonar sobre ella, aprender patrones y generar respuestas o acciones útiles para resolver tareas.

Ranking:
- [Modelos Ranking: Artificial Analitycs](https://artificialanalysis.ai/models#context-window)
- [LLM Stats](https://llm-stats.com/)

## Agentes

**Agente:** es un sistema que utiliza un modelo para realizar tareas orientadas a un objetivo, encadenando decisiones y acciones.

Puede planificar, consultar informacion, usar herramientas, modificar archivos, ejecutar código y comprobar resultados, según los permisos disponibles y bajo tu supervisión.

El bucle del Agente:

-Planifica > Actúa > Evalúa > Ajusta

## Modelos

Potencia <-> Velocidad <-> Coste:

Elegir según tarea.

- Modelo potente para pensar y arquitectura.
- Modelo medio para el día a día.
- Modelo rápido y barato para tareas mecánicas.

## 🧠 Prompting

### Anatomía de un Prompt

Un prompt efectivo suele estar compuesto por 5 elementos fundamentales:

#### 1. 🎭 Rol (¿Quién soy?)

Define el nivel de experiencia, profesión o especialidad que debe asumir la IA.

**Ejemplo:**

> Actúa como un desarrollador backend Senior especializado en ciberseguridad.

---

#### 2. 🌍 Contexto (¿Dónde estamos?)

Explica el proyecto, las tecnologías involucradas y el problema general.

**Ejemplo:**

> Estoy construyendo una API REST para un e-commerce usando Python 3.14.

---

#### 3. 🎯 Tarea (¿Qué necesitas?)

Describe de forma específica qué debe hacer la IA.

**Ejemplo:**

> Necesito que escribas un endpoint para el login de usuarios.

---

#### 4. 🚨 Restricciones (¿Qué límites hay?)

Indica reglas, estándares, convenciones o requisitos técnicos.

**Ejemplo:**

- Debe utilizar FastAPI.
- Debe implementar JWT.
- Debe usar bcrypt para las contraseñas.
- Debe manejar errores HTTP correctamente.

---

#### 5. 📦 Formato de salida (¿Cómo lo quieres?)

Especifica cómo deseas recibir la respuesta.

**Ejemplo:**

- Solo código fuente.
- Explicación paso a paso.
- Tabla comparativa.
- Resumen ejecutivo.

---

### ❌ Ejemplo de Mal Prompt

```text
Haz un código para un login en Python.
```

### Problemas

- No define un rol.
- No proporciona contexto.
- No especifica la tarea correctamente.
- No indica restricciones.
- No define el formato de salida.
- Puede generar respuestas ambiguas o incompletas.

---

### ⚠️ Ejemplo de Prompt Mejorado

```text
Actúa como un desarrollador backend Senior especializado en ciberseguridad.

Estoy construyendo una API REST para un e-commerce usando Python 3.14.

Necesito que escribas un endpoint para el login de usuarios.

El endpoint debe estar hecho con FastAPI.
Debe recibir un email y una contraseña.
Debe validar las credenciales simulando una consulta a PostgreSQL.
Debe devolver un token JWT.
Debe usar bcrypt para el almacenamiento seguro de contraseñas.
Debe devolver un error HTTP 401 cuando las credenciales sean incorrectas.

Devuélveme únicamente el bloque de código bien comentado,
sin explicaciones previas ni introducciones.
```

---

### ✅ Prompt Estructurado

```text
[🎭 Rol]
Actúa como un desarrollador backend Senior especializado en ciberseguridad.

[🌍 Contexto]
Estoy construyendo una API REST para un e-commerce usando Python 3.14.

[🎯 Tarea]
Necesito que escribas un endpoint para el login de usuarios.

[🚨 Restricciones]
- Utilizar FastAPI.
- Recibir email y contraseña.
- Simular consulta a PostgreSQL.
- Generar JWT.
- Utilizar bcrypt para las contraseñas.
- Retornar HTTP 401 cuando la autenticación falle.

[📦 Formato de salida]
Devuélveme únicamente el bloque de código bien comentado,
sin explicaciones previas ni introducciones.
```

---

### 🔍 ¿Por qué este Prompt es Mejor?

- ✅ Define claramente el rol de la IA.
- ✅ Proporciona contexto suficiente.
- ✅ Especifica una tarea concreta.
- ✅ Incluye restricciones técnicas.
- ✅ Define el formato esperado de la respuesta.
- ✅ Reduce respuestas ambiguas.
- ✅ Produce resultados más precisos y consistentes.

---

### 📋 Plantilla Reutilizable

```text
[🎭 Rol]
Actúa como un/a {especialidad} con experiencia en {área}.

[🌍 Contexto]
Estoy trabajando en {proyecto}.
Las tecnologías involucradas son:
- {tecnología_1}
- {tecnología_2}
- {tecnología_3}

[🎯 Tarea]
Necesito que {objetivo}.

[🚨 Restricciones]
- Debe utilizar {herramienta}.
- No debe utilizar {herramienta}.
- Debe seguir {estándar}.
- Debe considerar {requisito}.

[📦 Formato de salida]
- {formato deseado}
- {nivel de detalle}
- {estructura esperada}
```

---

### 💡 Consejo Práctico

La calidad de la respuesta suele ser proporcional a la calidad del prompt:

```text
Más contexto + Más restricciones + Formato claro
= Mejor resultado
```

Una buena práctica es pensar siempre en estas cinco preguntas antes de escribir un prompt:

1. ¿Quién debe ser la IA?
2. ¿Cuál es el contexto?
3. ¿Qué tarea debe realizar?
4. ¿Qué restricciones debe cumplir?
5. ¿Cómo quiero recibir la respuesta?

## Fine-tuning
Es coger un modelo general (que sabe de todo un poco) y darle un entrenamiento extra con ejemplos muy específicos para que se vuelva un experto total en una sola tarea, como redactar contratos legales o escribir código en un lenguaje concreto.


## Agentes

### Checklist código seguro con IA
Da contexto y pide seguridad por adelantado: di qué quieres y
exige validación antes de que escriba nada.

- Lee el código y entiéndelo entero: revisa lo que cambió de verdad. Lo que no entiendas, pídelo explicado. No apruebes a ciegas
- Verifica antes de subir nada: pasa tests y confirma que no se cuela ningún dato sensible.
- Cuida lo que compartes: nunca pegues claves ni datos reales de clientes en un prompt.

## OpenCode
- /connect: Conectar un proveedor.
- /models: Seleccionar un modelo.
- /variants: Seleccionar el esfuerzo del modelo.
- /exit: Salir.
- /new: Nueva sesión.
- /sessions: Navegar entre sesiones.
- /undo: Deshace un mensaje.
- /redo: Rehace un mensaje.
- /compact: Compacta la sesión.
- /diff: Muestra las diferencias.

@: Referencias. !: Modo Shell.
[https://opencode.ai](https://opencode.ai)



## Context engineering

- **Arnes (harness):** el sistema que rodea al modelo y le permite actuar como agente (gestiona contexto, herramientas y ejecución de tareas).
- **Guardarrailes:** reglas y controles que limitan sus acciones y validan sus resultados (permisos, aprobaciones y comprobaciones de seguridad).
- **Contexto:** es la informacion que tiene disponible para realizar una tarea (instrucciones, conversación, archivos, documentación y resultados de herramientas)

## Contexto

- **Markdown:** formato de texto sencillo para estructurar documentos con titulos, listas, enlaces y bloques de código.
- **AGENTS.md:** archivo con instrucciones para orientar a los agentes sobre cómo trabajar en un proyecto.


# AGENTS.md - [Nombre del proyecto]

[Una o dos frases: qué es, para quién y cuál es su objetivo.]

## Stack y estructura
- Tecnologias y versiones clave.
- Que hay en cada carpeta o archivo importante (solo lo que no es
obvio).

## Comandos
- Como ejecutar, probar, hacer lint y compilar (comandos exactos,
copiables).

## Convenciones
- Estilo de código, nombres, idioma de comentarios y textos.
- Patrones que hay que seguir (y cuál es el archivo de referencia).

## Reglas de dominio / trampas conocidas
- Lo que es facil hacer mal y el agente no puede deducir leyendo el
código.

## Forma de trabajar
- Cuándo planificar antes de tocar código, tamaño de los cambios, qué
explicar al terminar.

## Límites
- ✅ Siempre: lo que debe hacer sin preguntar.
- ⚠️ A Pregunta antes: dependencias nuevas, archivos nuevos, cambios en el formato de datos ...
- 🚫 Nunca: lo que no debe tocar bajo ningun concepto.

## Verificación
- Como comprobar que un cambio funciona antes de darlo


AGENTS.md y Reglas
- Coamndo /init: genera el AGENTS.md [agents.md](https://agents.md)

¿Qué incluir?

```Mermaid
    ---
    config:
    look: classic
    fontFamily: '''Open Sans Variable'', sans-serif'
    themeVariables:
        fontFamily: '''Open Sans Variable'', sans-serif'
    layout: dagre
    ---
    flowchart TB
        ST[Stack tecnologico]
        CD[Convenciones de código]
        P[Patrones]
        PH[Prohibiciones]
        
        EP[Estructuras Proyectos]
        FT[Flujos de trabajo]
        TCI[Testing, CI/CD]
        EC[Estilo de commits y PRs]
        UK[...]

        ST --> EP
        CD --> FT
        P --> TCI
        PH --> EC

        EP --> UK
        FT --> UK
        TCI --> UK
        EC --> UK
```

## Modo Plan (Agente)

- **Shift + TAB:** alterna entre el modo Build y Plan.
    - El modo plan permite al agente analizar una tarea, consultar el proyecto y proponer los pasos antes de ejecutarlos.
    - Sirve para aclarar requisitos, detectar riesgos y revisar el enfoque contigo antes de modificar el código.

## Tarea

Realiza la tarea de implementar una nueva funcionalidad en el proyecto de racha de aprendisaje.


# Curso de IA - DIA 2

## Comando personalizados

- **Custom Comand:** es un prompt reutilizable que ejecutas escribiendo /comando. Permite repetir tareas habituales sin volver a escribir las instrucciones.
- **Creación:** 
[Docs URL](https://opencode.ai/v2/docs/commands)
    1. Crea un archivo Markdown en .opencode/commands/
    2. Añade una descripción y las instrucciones
    3. Reinicia OpenCode y ejecutalo(/restart o /exit)

## Skills

- **Skill(/skill):** es un conjunto de instrucciones reutilizables que enseña al agente cómo realizar una tarea concreta. El agente puede cargar las instrucciones completas cuando las necesita(o utilizando / o @)
- **Creación:**
    1. Crea un archivo Markdown en .opencode(o agents)/skills/nombre_skill/
    2. Añade un archivo SKILL.md con instrucciones
    3. Reinicia Opencode y ejecútalo.

Rercursos: [https://www.skills.sh](https://www.skills.sh)


## Model Context Protocol (MCP)

- **MCP (/mcps):** es un protocolo que permite conectar al agente con herramientas y datos externos. Un servidor MCP proporciona esas capacidades: consultar documentación, acceder a servicios o interactuar con bases de datos.
- **Creación:**
  1. Crea o edita opencode. json en la raíz.
  2. Añade la configuración del servidor mcp
  3. Reinicia OpenCode y ejecútalo

Recursos:
- [https://modelcontextprotocol.io](https://modelcontextprotocol.io)
- [https://opencode.ai/v2/docs/mcp-servers](https://opencode.ai/v2/docs/mcp-servers)

## Pruebas del MCP
Prueba del MCP
```text
    Usa Chrome DevTools para probar el Diario de Estudio:

    1. Abre index.html en Chrome. 
    2. Registra tres sesiones: hoy, ayer y anteayer. 
    3. Comprueba que la racha muestra 3 y que la mejor racha es correcta. 
    4. Revisa la consola por si hay errores. 
    5. Haz una captura en tamaño móvil (375 px de ancho). 
    
    Dime qué has comprobado y si has encontrado algún problema. 
```

Mi modelo no es tan potente para poder realizar ciertas cosas. Dejo el comando para el AGENTS.md:
```text
    No hay tests automaticos. Despues de cada cambio, verifica con el MCP de Chrome DevTools: Abre `index.html`, prueba la funcionalidad, revisa la consola y comprueba la vista móvil.
```

## Estructura SDD
```text
project/ 
├── .opencode/,.agents/... 
├── AGENTS.md, MEMORY.md 
├── docs/ 
│ └── constitution.md 
├── specs/ 
│ └── 001-nombre-spec/ 
│ │ ├── spec.md 
│ │ ├── plan.md 
│ │ └── tasks.md 
│ └── 002-nombre-spec/... 
│ └── 003-nombre-spec/... 
├── tests/ 
└── <CÓDIGO DEL PROYECTO> 
```

## SDD paso a paso 
- **Paso 1:** Constitución (una vez por proyecto - constitution.md) 
- **Paso 2:** Especificación (spec.md) 
- **Paso 3:** Clarificación 
- **Paso 3:** Clarificación 
- **Paso 4:** Planificación (plan.md) 
- **Paso 5:** Tareas (tasks.md) 
- **Paso 6:** Implementación 
- **Paso 7:** Validación 
- **Loop al paso 2:** Mantenimiento

## Paso 1: Constitución
Ejemplo de Prompt para crear el archivo constitution.md

```text
Vamos a crear la constitución del Diario de Estudio. Es un proyecto que ya existe: lee 
AGENTS.md, MEMORY.md y el código antes de proponer nada. Es un proyecto educativo que 
debe poder mantener alguien que empieza a programar.

Proponme un docs/constitution.md con 6 principios innegociables, cortos y verificables, 
que cubran: simplicidad del stack, relación entre spec y código,separación entre lógica e 
interfaz, política de tests (sin instalar dependencias), protección de los datos del 
usuario e idioma del código y los textos. Máximo 15 líneas. Espera mi aprobación. 
```

## docs/constitution.md de nuestro Diario de Estudio

```text
# Constitución — Diario de Estudio 
Principios innegociables. Toda spec, plan y tarea debe cumplirlos. 
1. **Simplicidad primero**: HTML, CSS y JS puros. Sin dependencias ni build. Funciona 
abriendo index.html con doble clic. 
2. **La spec manda**: nada se implementa si no está en la spec activa. Si falta una 
decisión, se para y se pregunta. 
3. **Lógica separada de interfaz**: los cálculos (fechas, rachas, estadísticas) son 
funciones puras, sin DOM ni localStorage, que reciben "hoy" como parámetro. 
4. **Tests como puerta**: la lógica se prueba con `node --test`, sin instalar paquetes. 
Prohibido avanzar con tests en rojo. 
5. **Los datos del usuario son sagrados**: localStorage con compatibilidad hacia atrás y 
fechas siempre en hora local. Nunca se pierde una sesión. 
6. **Idioma**: código en inglés; interfaz y documentación en español. 
```

Dentro de nuestro AGENTS.md agregamos las siguientes líneas para hacer referencia a SDD: 

```
## Comandos 
- Tests: `node --test` 
## Reglas 
- Lee `docs/constitution.md` y la spec activa (`specs/NNN-*/`) antes de tocar código. 
```

## Paso 2: Especificación (spec.md) 
Ejemplo de Prompt para crear una nueva especificación

```text
NO escribas código en ningún momento. Vamos a redactar la especificación de una nueva funcionalidad del Diario de Estudio. Lee docs/constitution.md.

Idea inicial: un mapa de calor tipo GitHub que muestre los días estudiados de las últimas semanas, donde cuantos más minutos estudiados, más intenso es el color del día.

Tu trabajo: 
1. Hazme preguntas de UNA en UNA para eliminar ambigüedades (casos límite, comportamiento con errores, qué queda fuera de esta versión). Máximo 5 preguntas. 
2. Con mis respuestas, genera specs/001-heat-map/spec.md con esta estructura: contexto y objetivo, usuarios, historias de usuario, requisitos funcionales numerados (RF-x) con criterios de aceptación en notación EARS 
 en español, requisitos no funcionales, casos límite, fuera de alcance, criterios de finalización y dudas abiertas marcadas como [NECESITA ACLARACIÓN]. 
3. El QUÉ y el POR QUÉ. Nada de stack, arquitectura ni nombres de archivos: eso irá en el plan. 
```

## Plantilla genérica para especificaciones (spec.md
Plantilla para generar un spec:

```text
# Spec NNN — <Nombre de la funcionalidad>

## Contexto y objetivo 
<Qué problema resuelve y por qué merece la pena. Un párrafo.> 

## Usuarios / actores 
<Quién lo usa.> 

## Historias de usuario 
- H1: Como <rol> quiero <acción> para <beneficio>. 

## Requisitos funcionales (criterios de aceptación en EARS) 
- RF-1: CUANDO <evento>, EL SISTEMA <respuesta> (salida/resultado esperado). 
- RF-2: SI <condición no deseada>, ENTONCES EL SISTEMA <respuesta>. 
- RF-3: MIENTRAS <estado>, EL SISTEMA <respuesta>. 
- RF-4: EL SISTEMA <comportamiento permanente>. 

## Requisitos no funcionales 
<Solo los que apliquen: rendimiento, seguridad, plataformas, idioma...> 

## Casos límite 
<Vacíos, duplicados, datos corruptos, límites, concurrencia...>

## Fuera de alcance 
<Lo que explícitamente NO se hace en esta iteración.> 

## Criterios de finalización 
<Ej.: todos los RF con test en verde + demo manual del flujo principal.> 

## Dudas abiertas 
- [NECESITA ACLARACIÓN] <duda> 
```


## Paso 3: Clarificación
Ejemplo de Prompt para clarificar una especificación

```text
Revisa specs/001-heat-map/spec.md como si fueras un QA muy profesional. 
Lista: (1) ambigüedades restantes, (2) contradicciones entre requisitos, 
(3) casos límite no cubiertos, (4) conflictos con docs/constitution.md. 
No propongas soluciones todavía: solo detecta. Formato: lista numerada. 
```

## Paso 4: Planificación (plan.md)
Ejemplo de Prompt para crear planificación de la especificación 
```text
Lee docs/constitution.md y specs/001-heat-map/spec.md. NO escribas 
código. Genera specs/001-heat-map/plan.md con: qué archivos se crean o 
modifican y qué responsabilidad tiene cada uno, qué funciones puras de lógica 
se necesitan (con "hoy" como parámetro), algoritmo del mapa en pseudocódigo, 
cómo se pinta en la interfaz, decisiones técnicas justificadas (y su 
alternativa descartada) y estrategia de tests con node --test. Todo debe 
respetar la constitución y cubrir todos los RF. Marca qué RF cubre cada parte. 
```

## Paso 5: Tareas (tasks.md)
Ejemplo de Prompt para crear las tareas a partir de la planificación

```
A partir de spec.md y plan.md, genera specs/001-heat-map/tasks.md: 
tareas pequeñas (máx. 20-30 min cada una), en orden de dependencia, cada una 
con los RF que cubre y una línea "Hecho cuando:" verificable. Usa checkboxes. 
```

## Paso 6: Implementación 
Ejemplo de Prompt para implementar las tareas 
```text
Implementa SOLO la tarea T1 de specs/001-heat-map/tasks.md, siguiendo 
plan.md y la constitución. Escribe primero los tests, luego el código. 
Ejecuta node --test y muéstrame el resultado. Al terminar: marca T1 en 
tasks.md, indica qué RF cubre y PÁRATE. No empieces T2. 
```

## Paso 7: Validación
Ejemplo de Prompt para validar la especificación implementada
```
Recorre specs/001-heat-map/spec.md requisito por requisito. Para cada 
uno indica qué test lo cubre y el resultado de ejecutarlo. Los RF de interfaz 
14 
None
que no se puedan testear con node --test, verifícalos con Chrome DevTools 
(incluida la vista móvil). Si algún RF no está cubierto o falla, dilo 
claramente. Después comprueba los criterios de finalización y dame un 
veredicto: ¿la spec está cumplida? 
```

**Nota:** *el paso de Clarificación puede realizarse nuevamente luego de los pasos 4 y 5 si algo no está claro.* 
