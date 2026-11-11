# Ficha E1: Estructura semántica HTML5 y flujo de trabajo con Git

## Resumen (Palabras propias)
La construcción de una aplicación web mantenible y accesible comienza con una estructura HTML5 semántica bien definida y un control de versiones ordenado en Git. A diferencia del uso genérico de contenedores sin significado como `<div>`, las etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>` y `<footer>`) comunican la jerarquía del documento tanto a los navegadores como a las tecnologías de asistencia (lectores de pantalla). Asimismo, vincular cada control de formulario con su respectiva etiqueta `<label>` garantiza que los usuarios puedan interactuar con los campos de forma clara. Por otro lado, organizar el desarrollo en ramas por etapas, utilizando commits convencionales (`feat:`, `fix:`, `docs:`), Pull Requests y etiquetas de versión (`v0.1`), permite trabajar en pareja sin sobrescribir avances y mantener un historial auditable del proyecto desde su maquetación inicial.

## Preguntas clave de la etapa

### 1. ¿Por qué usar etiquetas semánticas HTML5 en lugar de solo `<div>`?
Las etiquetas semánticas describen el propósito del contenido que envuelven. Esto permite que los lectores de pantalla identifiquen rápidamente dónde está el menú de navegación (`<nav>`), el contenido principal (`<main>`) o las tarjetas independientes (`<article>`), mejorando la accesibilidad web, el posicionamiento y la legibilidad del código fuente para el equipo de desarrollo.

### 2. ¿Cuál es la importancia de asociar `<label for="...">` con el `id` de cada `<input>` o `<select>`?
Asociar explícitamente cada `<label>` con el atributo `id` del control mediante `for` cumple dos funciones esenciales: permite que los lectores de pantalla anuncien qué dato se espera cuando el usuario enfoca el campo y amplía el área de clic (al tocar el texto de la etiqueta, el foco pasa automáticamente al campo de entrada).

### 3. ¿Para qué sirven las ramas, los Pull Requests y los tags en GitHub?
- **Ramas (`branch`)**: Aíslan el trabajo de cada etapa (por ejemplo, `etapa-1-estructura`) sin afectar la rama principal `main`.
- **Pull Request (PR)**: Permite revisar los cambios en pareja antes de integrarlos (`merge`) a la rama principal.
- **Etiquetas (`tag`)**: Marcan un punto exacto en la historia del repositorio (como `v0.1`) para identificar entregas cerradas.

## Aplicación en el proyecto (Checklist de Hardening)
Se estructuraron las páginas del sistema (`index.html`, `auditoria.html`, `checklist.html` y `reporte.html`) con idioma `lang="es"`, codificación `UTF-8`, encabezado común con `<nav>`, tarjetas en `<article>`, tabla semántica con `<thead>`, `<tbody>` y `<th scope="col">` en el reporte, y el formulario de nueva auditoría con `<label>` en cada campo.

## Dudas surgidas en el equipo
- ¿Cuándo conviene usar `<section>` frente a `<article>` dentro de la página de reportes? (Resuelto: `<section>` agrupa bloques temáticos de la página y `<article>` envuelve bloques o tarjetas autocontenidas).

## Referencias (APA 7)
- Chacon, S., y Straub, B. (2014). *Pro Git* (2.ª ed.). Apress. https://git-scm.com/book
- Mozilla. (s. f.). *Elementos semánticos en HTML - MDN Web Docs*. https://developer.mozilla.org/es/docs/Glossary/Semantics
- W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/