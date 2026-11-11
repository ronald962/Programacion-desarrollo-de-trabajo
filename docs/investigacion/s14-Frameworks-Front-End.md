# Ficha S14: Frameworks Front End (Etapa 5)

## Resumen (128 palabras)
A medida que una aplicación web crece en interactividad, actualizar el DOM manualmente con JavaScript puro vuelve el código repetitivo y propenso a errores de sincronización entre los datos en memoria y la pantalla. Un framework Front End resuelve este problema mediante una arquitectura declarativa: el desarrollador define qué debe mostrarse según el estado de los datos, y el framework actualiza el DOM automáticamente cuando ese estado cambia. La base de esta organización son los componentes, piezas independientes y reutilizables que encapsulan estructura (HTML), estilo (CSS) y lógica (JS). Aunque nuestro proyecto se construyó sin librerías para comprender los fundamentos del navegador, analizar su estructura desde el enfoque de componentes permite proyectar cómo escalaría hacia herramientas modernas como React o Vue sin duplicar código.

## Respuestas a las preguntas guía

### 1. ¿Qué problema resuelve un framework y qué es un componente?
- **Problema que resuelve**: Elimina la manipulación manual e imperativa del DOM (como vaciar contenedores con `textContent = ""` y reconstruir nodos con `createElement` en cada cambio) y mantiene sincronizado el estado de los datos con la interfaz de usuario de forma automática y eficiente.
- **Qué es un componente**: Es un bloque de construcción autónomo, aislado y reutilizable de la interfaz (como un botón, una tarjeta o un formulario) que agrupa su propia vista y su lógica para usarse varias veces con distintos datos (props).

### 2. ¿Qué partes de tu proyecto serían componentes reutilizables?
En **Checklist de Hardening**, las siguientes piezas se transformarían en componentes reutilizables:
- **`MenuNavegacion`**: El `<header>` y `<nav>` común que se repite en `index.html`, `auditoria.html`, `checklist.html` y `reporte.html`, recibiendo como propiedad la página activa.
- **`BarraAvance`**: El bloque de `<progress>` y el texto de porcentaje, que se usa tanto en las tarjetas de `auditoria.html`, en la cabecera de `checklist.html` y en el resumen de `reporte.html`.
- **`TarjetaAuditoria`**: Cada `<article>` generado en `auditoria.js` con los datos del activo y los botones Abrir, Editar, Duplicar y Eliminar.
- **`ItemControl`**: Cada `<fieldset>` generado en `checklist.js` con sus tres botones de radio (`pendiente`, `aplicado`, `no-aplica`) y su `<textarea>` de nota de evidencia.

### 3. ¿En qué se diferencian React y Vue, en una frase cada uno?
- **React**: Es una biblioteca centrada en la interfaz de usuario que utiliza JSX (HTML escrito dentro de JavaScript) y deja que el equipo elija o construya el resto de la arquitectura con total flexibilidad.
- **Vue**: Es un framework progresivo que separa de forma clásica HTML, CSS y JavaScript mediante plantillas en archivos de un solo componente (`.vue`) e incluye un sistema de reactividad automático más guiado desde el inicio.

## Aplicación en el proyecto
En la Etapa 5 utilizamos este análisis para redactar la sección de reflexión del informe final sobre cómo se reorganizaría **Checklist de Hardening** pasando de cuatro archivos `.js` imperativos (`datos.js`, `auditoria.js`, `checklist.js`, `reporte.js`) a un árbol de componentes con estado reactivo compartido.

## Dudas surgidas en la investigación
- ¿En qué momento del crecimiento de un proyecto pequeño deja de ser rentable usar JavaScript puro y pasa a justificarse el peso adicional de descargar un framework como React o Vue?

## Referencias (APA 7)
- Meta Platforms, Inc. (s. f.). *React documentation: Describing the UI*. https://react.dev/
- You, E. (s. f.). *Vue.js guide: Essentials and components in-depth*. https://vuejs.org/guide/