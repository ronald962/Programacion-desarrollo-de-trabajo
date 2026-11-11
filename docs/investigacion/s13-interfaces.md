# Ficha S13 (Etapa 4): Interfaces gráficas, validación accesible y heurísticas de Nielsen

## Resumen
Una interfaz usable y accesible debe comunicar en todo momento qué está pasando mediante estados visuales claros: foco, deshabilitado, vacío, éxito y error. Además, todos los controles deben poder usarse solo con el teclado. En seguridad web, validar los datos en el navegador mejora la experiencia porque avisa de inmediato al usuario, pero nunca reemplaza la validación en el servidor, ya que el código del cliente puede modificarse desde las herramientas del navegador. Las heurísticas de usabilidad de Jakob Nielsen sirven como lista de revisión para detectar problemas de diseño, y las pautas WCAG 2.2 recuerdan que el color no puede ser la única señal: cada error debe tener un texto explícito y estar vinculado a su campo para que un auditor con lector de pantalla también lo entienda.

## Respuestas a las preguntas guía

### 1. Explica 5 de las 10 heurísticas de Nielsen con un ejemplo aplicado al proyecto
1. **Visibilidad del estado del sistema**
   - *Ejemplo:* la barra `<progress>` se recalcula al instante cuando se marca un control y el texto indica `43 % (3 de 7, sin contar "no aplica")`; cada auditoría muestra si está "Abierta" o "Cerrada".
   - *Mejora propuesta:* mostrar un aviso breve ("Cambios guardados") al marcar un control, porque hoy el guardado en `localStorage` ocurre en silencio.
2. **Prevención de errores**
   - *Ejemplo:* no se puede cerrar una auditoría con controles de prioridad alta pendientes sin justificación, y el selector de tipo de lista se deshabilita al editar para no perder los controles.
   - *Mejora propuesta:* avisar mientras el usuario escribe si ya existe una auditoría con el mismo nombre de activo.
3. **Control y libertad del usuario**
   - *Ejemplo:* el botón "Cancelar" sale de la edición, y "Reabrir auditoría" permite deshacer un cierre hecho por equivocación.
   - *Mejora propuesta:* ofrecer "Deshacer" unos segundos después de eliminar una auditoría, en lugar de depender solo del cuadro de confirmación.
4. **Consistencia y estándares**
   - *Ejemplo:* las cuatro páginas comparten el mismo encabezado, menú y pie de página; el enlace de la página actual se marca con `aria-current="page"` y los formularios usan controles estándar de HTML5.
   - *Mejora propuesta:* unificar el vocabulario ("activo", "auditoría", "control") y el orden de los botones en todas las tarjetas.
5. **Ayuda a reconocer, diagnosticar y recuperarse de errores**
   - *Ejemplo:* si falta un dato en el formulario se muestra un texto específico junto al campo (*"Error: Selecciona un tipo de lista."*) y el foco pasa al primer campo con error.
   - *Mejora propuesta:* cuando el cierre se bloquea por controles de prioridad alta pendientes, filtrar automáticamente el checklist para mostrar justo esos controles.

### 2. ¿Cómo se vincula un error con su campo y por qué no basta el color?
El mensaje de error se vincula con su campo mediante `aria-describedby="id-del-error"` en el `<input>` o `<select>`, junto con `aria-invalid="true"` en el control y `role="alert"` en el contenedor del mensaje, para que el lector de pantalla lo anuncie al aparecer. El color (borde rojo) no basta porque las personas con daltonismo o baja visión pueden no percibirlo. Por eso el criterio 1.4.1 (Uso del color) de WCAG 2.2 exige acompañarlo con un texto; en el proyecto cada mensaje empieza con "Error:" y describe cómo corregirlo.

### 3. ¿Qué valida el cliente y qué debe validar el servidor?
- **El cliente (navegador)** valida la forma y completitud de los datos (campos obligatorios, longitudes mínimas, fecha elegida) para dar respuesta inmediata sin recargar la página.
- **El servidor** debe validar de nuevo todas las reglas de negocio, tipos de datos, permisos y sanitización, porque cualquier validación en JavaScript puede omitirse o alterarse desde las herramientas del navegador. En este proyecto no existe servidor, por lo que la validación del cliente solo protege la experiencia de uso, no la seguridad de los datos.

## Aplicación en el proyecto (Checklist de Hardening)
En `auditoria.js` el formulario valida el nombre del activo (mínimo 3 caracteres), el responsable (mínimo 2), la fecha y el tipo de lista; cada error aparece junto a su campo con `aria-describedby`, `aria-invalid` y `role="alert"`, y el foco se traslada al primer campo inválido. En `checklist.js` el cierre exige justificación cuando hay controles de prioridad alta pendientes. Los estados de la interfaz están cubiertos en `style.css`: foco visible (`:focus-visible`), controles deshabilitados, mensaje de lista vacía, mensaje de éxito y estado de error. Las eliminaciones y los cierres piden confirmación.

## Dudas surgidas en el equipo
- ¿Es redundante usar `role="alert"` junto con `aria-live` en el mismo mensaje? (Se usó `role="alert"` para errores, que se anuncian de inmediato, y `aria-live="polite"` solo para mensajes de éxito, que no deben interrumpir.)
- ¿Cómo validar sin servidor que no se repita el nombre de un activo? (Queda como mejora propuesta de la heurística 2.)

## Referencias (APA 7)
- Nielsen, J. (1994). Enhancing the explanatory power of usability heuristics. En *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '94)* (pp. 152-158). ACM.
- Nielsen Norman Group. (s. f.). *10 usability heuristics for user interface design*. https://www.nngroup.com/
- W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/