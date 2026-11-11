# Ficha S12 (Etapa 3): JavaScript aplicado, DOM y `localStorage`

## Resumen (Palabras propias)
JavaScript permite transformar páginas HTML estáticas en aplicaciones interactivas mediante la manipulación del Modelo de Objetos del Documento (DOM) y el almacenamiento local del navegador (`localStorage`). A través del DOM, el código puede leer los valores ingresados en los formularios, escuchar eventos del usuario (`submit`, `click`, `input`, `change`) y generar dinámicamente tarjetas o filas de tabla usando `document.createElement` y `appendChild`. Para conservar las auditorías y sus controles al recargar o cambiar de página sin requerir un servidor, la API de `Web Storage` permite guardar estructuras de datos serializadas en formato JSON. Asimismo, desde la perspectiva de la ciberseguridad, es obligatorio insertar cualquier texto escrito por el usuario utilizando `textContent` en lugar de `innerHTML`, previniendo así vulnerabilidades de inyección de scripts (*Cross-Site Scripting* o XSS).

## Respuestas a las preguntas guía

### 1. ¿Qué es el DOM y cómo se modifica?
El **DOM (Document Object Model)** es la representación en forma de árbol de objetos en memoria que el navegador crea a partir del documento HTML. Se modifica desde JavaScript seleccionando nodos existentes con `document.getElementById()`, creando nuevos elementos con `document.createElement()`, cambiando sus textos o atributos (`elemento.textContent`, `elemento.value`, `elemento.hidden`) e insertándolos en el árbol con `appendChild()`.

### 2. ¿Cómo se guarda y se lee un arreglo de objetos con `localStorage`, `JSON.stringify` y `JSON.parse`?
Dado que `localStorage` únicamente almacena cadenas de texto (`string`) bajo un par clave-valor:
- **Para guardar**: Se convierte el arreglo de objetos de JavaScript a una cadena de texto en formato JSON usando `JSON.stringify(lista)` y se almacena con `localStorage.setItem("hardening-auditorias", textoJson)`.
- **Para leer**: Se recupera el texto con `localStorage.getItem("hardening-auditorias")`; si no es `null`, se transforma nuevamente en un arreglo de objetos manipulable usando `JSON.parse(textoJson)`.

### 3. ¿Por qué `textContent` y no `innerHTML` con datos del usuario?
Porque `innerHTML` interpreta y ejecuta cualquier etiqueta HTML o código JavaScript contenido en el texto. Si un usuario malicioso escribe `<img src=x onerror=alert(1)>` en el nombre del activo o en la nota de evidencia de un control y se muestra con `innerHTML`, se ejecutará un ataque **XSS (Cross-Site Scripting)**. En cambio, `textContent` inserta el valor estrictamente como texto plano inofensivo, neutralizando cualquier intento de inyección de código.

## Aplicación en el proyecto (Checklist de Hardening)
Se separó el acceso a datos en `datos.js` (plantillas de 8 controles para SO, servidor web y red Wi-Fi, cálculo de avance excluyendo controles `"no-aplica"` y funciones de `localStorage` con validación de estructura) y la manipulación de la interfaz en `auditoria.js`, `checklist.js` y `reporte.js`, empleando exclusivamente `createElement` y `textContent`.

## Dudas surgidas en el equipo
- ¿Cómo saber en `checklist.html` y `reporte.html` cuál fue la auditoría que el usuario seleccionó en `auditoria.html`? (Resuelto guardando el ID de la auditoría activa en una segunda clave de `localStorage` llamada `"hardening-actual"`).

## Referencias (APA 7)
- Haverbeke, M. (2024). *Eloquent JavaScript* (4.ª ed.). No Starch Press. https://eloquentjavascript.net/
- Mozilla. (s. f.). *Usar la API de Web Storage y manipulación del DOM - MDN Web Docs*. https://developer.mozilla.org/es/docs/Web/API/Web_Storage_API
- OWASP Foundation. (2025). *Cross Site Scripting Prevention Cheat Sheet*. https://owasp.org/