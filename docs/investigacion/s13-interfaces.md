# Ficha S13: Interfaces gráficas, validación accesible y heurísticas de Nielsen

## Resumen (Palabras propias)
El diseño de una interfaz usable y accesible requiere comunicar en todo momento qué ocurre en la aplicación mediante estados visuales claros (foco, deshabilitado, vacío, éxito y error) y controles navegables con teclado. En seguridad web, la validación en el navegador mejora la experiencia del usuario al prevenir errores de entrada de forma inmediata, pero nunca reemplaza la validación en el servidor. Además, aplicar las heurísticas de usabilidad de Jakob Nielsen y las pautas WCAG 2.2 garantiza que cualquier auditor pueda utilizar la herramienta sin depender exclusivamente de la percepción del color.

## Respuestas a las preguntas guía

### 1. Explica 5 de las 10 heurísticas de Nielsen con un ejemplo aplicado al proyecto
1. **Visibilidad del estado del sistema**: La aplicación informa siempre qué ocurre mediante la barra `<progress>` que recalcula al instante el porcentaje de cumplimiento excluyendo los controles "no aplica" y muestra si la auditoría está "Abierta" o "Cerrada".
2. **Prevención de errores**: En `checklist.html`, el sistema impide cerrar una auditoría si existen controles de prioridad alta en estado "pendiente" sin haber escrito una justificación, y deshabilita el selector de tipo de lista al editar una auditoría para evitar borrar sus controles por accidente.
3. **Control y libertad del usuario**: El usuario cuenta con el botón "Cancelar" durante la edición de una auditoría y la opción de "Reabrir auditoría" en el checklist si cerró una revisión por equivocación.
4. **Consistencia y estándares**: Las páginas comparten el mismo encabezado, navegación (`<nav>`) e indicadores de botones, respetando las convenciones estándar de formularios HTML5.
5. **Ayuda a reconocer, diagnosticar y recuperarse de errores**: Cuando falta un dato obligatorio en el formulario de auditoría, se muestra un texto específico junto al campo (por ejemplo: *"Error: Selecciona un tipo de lista"*) y se traslada el foco automáticamente a ese control.

### 2. ¿Cómo se vincula un error con su campo y por qué no basta el color?
Un error se vincula programáticamente a su campo mediante el atributo `aria-describedby="id-del-error"` en el `<input>` o `<select>`, acompañado de `aria-invalid="true"` y `role="alert"` en el contenedor del mensaje. No basta usar únicamente el color (como pintar el borde de rojo) porque los usuarios con daltonismo, baja visión o lectores de pantalla no perciben ese cambio cromático; según WCAG 2.2 (Criterio 1.4.1 Uso del color), siempre debe acompañarse de un texto explícito o icono descriptivo.

### 3. ¿Qué valida el cliente y qué debe validar el servidor?
- **El cliente (navegador)** valida la forma y completitud inmediata de los datos (campos obligatorios no vacíos, longitudes mínimas, formato de fecha) para dar retroalimentación rápida sin recargar la página.
- **El servidor** debe volver a validar absolutamente todas las reglas de negocio, tipos de datos, permisos de autorización y sanitización, ya que cualquier validación en JavaScript del lado del cliente puede ser omitida o manipulada desde las herramientas de desarrollo del navegador.

## Referencias (APA 7)
- Nielsen, J. (1994). Enhancing the explanatory power of usability heuristics. En *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '94)* (pp. 152-158). ACM.
- Nielsen Norman Group. (s. f.). *10 usability heuristics for user interface design*. https://www.nngroup.com/
- W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/