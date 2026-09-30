# Curso de IA 

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
- [https://11m-stats.com](https://11m-stats.com)


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