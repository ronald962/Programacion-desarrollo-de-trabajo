# Pruebas Manuales y Revisión de Seguridad — Checklist de Hardening

> **Proyecto:** Checklist de Hardening (Equipo 7)  
> **Curso:** Programación II · FIIS-UNAS  
> **Etapa:** E5 Integración y entrega (`v1.0`)

---

## 1. Casos de Prueba Manuales Documentados

A continuación se documentan los casos de prueba ejecutados sobre la aplicación para verificar las operaciones CRUD, las reglas de negocio propias del proyecto y los controles de validación y seguridad:

| ID | Requisito / Regla evaluada | Precondición | Pasos y datos de entrada | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|---|---|
| **CP-01** | **Prueba de aceptación (Regla de avance sin "no aplica")** | Auditoría abierta de tipo *Sistema operativo* (8 controles iniciales en `pendiente`). | 1. Ir a `checklist.html`.<br>2. Marcar 3 controles como `Aplicado`.<br>3. Marcar 1 control como `No aplica`.<br>4. Dejar los 4 restantes en `Pendiente`. | El total válido pasa a ser 7 controles (8 - 1). La barra de progreso y el indicador muestran **43 %** (`3 de 7, sin contar "no aplica"`). | La barra `<progress>` toma el valor `43` y el texto muestra `43 % (3 de 7, sin contar "no aplica")`. | **Aprobado** |
| **CP-02** | **Bloqueo de cierre con prioridad alta pendiente sin justificación** | Auditoría abierta con al menos 1 control de prioridad `alta` en estado `pendiente`. | 1. En `checklist.html`, dejar vacío el campo `<textarea id="justificacion">`.<br>2. Hacer clic en **Cerrar auditoría**. | El sistema impide cerrar la auditoría, marca el campo con `aria-invalid="true"`, traslada el foco y muestra el mensaje de error indicando cuántos controles de prioridad alta faltan. | No se cierra la auditoría y se muestra el mensaje de error accesible junto al campo de justificación. | **Aprobado** |
| **CP-03** | **Cierre válido de auditoría con justificación** | Misma auditoría del caso CP-02. | 1. Escribir `"Se mitigará en la ventana de mantenimiento del viernes"` en Justificación.<br>2. Hacer clic en **Cerrar auditoría** y confirmar el diálogo. | La auditoría cambia su estado a `Cerrada`, se deshabilitan los radios y notas del checklist, y el botón cambia a `Reabrir auditoría`. | Estado actualizado en `localStorage`, controles deshabilitados (`disabled`) y reflejado en `reporte.html`. | **Aprobado** |
| **CP-04** | **Duplicación de auditoría existente** | Al menos 1 auditoría registrada en `auditoria.html` (ej. `Servidor-Web-01`). | 1. En la tarjeta de `Servidor-Web-01`, hacer clic en el botón **Duplicar**. | Se crea una nueva tarjeta llamada `Servidor-Web-01 (copia)` con un nuevo `id`, estado `Abierta` y sus 8 controles reiniciados en `pendiente`. | Se agrega la copia al listado y persiste tras recargar la página (`F5`). | **Aprobado** |
| **CP-05** | **Validación accesible en formulario de registro** | Estar en `auditoria.html` con el formulario vacío. | 1. Dejar todos los campos vacíos.<br>2. Presionar el botón **Crear**. | No se guarda el registro, cada campo inválido muestra su mensaje de error específico vinculado con `aria-describedby` y el foco va al primer campo con error. | Se muestran los mensajes de error bajo cada control y el cursor se sitúa en `input#activo`. | **Aprobado** |
| **CP-06** | **Prevención de Cross-Site Scripting (XSS) en notas y nombres** | Auditoría abierta en `checklist.html`. | 1. En la nota de evidencia de un control, escribir `<img src=x onerror=alert(1)>` y `<script>alert("xss")</script>`.<br>2. Ir a `reporte.html` para ver los pendientes de prioridad alta. | El navegador **no** ejecuta ningún script ni ventana emergente; las etiquetas se muestran literalmente como texto plano gracias al uso de `textContent`. | El texto `<img src=x onerror=alert(1)>` se visualiza como cadena literal inofensiva en el reporte y checklist. | **Aprobado** |
| **CP-07** | **Eliminación con confirmación** | Auditoría existente en `auditoria.html`. | 1. Hacer clic en **Eliminar**.<br>2. En el primer intento pulsar *Cancelar*; en el segundo intento pulsar *Aceptar*. | Al cancelar, la auditoría permanece intacta. Al aceptar, se elimina del DOM y de `localStorage`. | La auditoría solo se borra tras confirmar explícitamente en el cuadro de diálogo. | **Aprobado** |
| **CP-08** | **Reporte por categoría y vista de impresión (`@media print`)** | Auditoría seleccionada con controles aplicados y pendientes. | 1. Abrir `reporte.html`.<br>2. Presionar `Ctrl + P` para abrir la vista previa de impresión. | La tabla calcula el porcentaje por categoría excluyendo `no-aplica`, lista los pendientes de prioridad alta, y al imprimir oculta `<nav>`, `<footer>` y botones. | La hoja imprimible muestra solo el encabezado y las tablas/resúmenes en blanco y negro sin elementos de navegación. | **Aprobado** |

---

## 2. Revisión de los 6 Controles de Seguridad

Verificación de los 6 controles exigidos en la Sección 6 de la guía del proyecto:

1. **Sin claves, tokens ni credenciales en el código ni en el historial de Git; datos ficticios:**
   - **Cumplimiento:** El proyecto no utiliza APIs externas ni credenciales. Todos los nombres de activos (`Servidor-Web-01`, `Red UNAS`) y responsables son ficticios, evitando exponer infraestructura real.

2. **Datos del usuario mostrados con `textContent`, nunca con `innerHTML` (prevención de XSS); sin `eval`:**
   - **Cumplimiento:** En `auditoria.js`, `checklist.js` y `reporte.js`, absolutamente todos los nodos dinámicos se construyen con `document.createElement()` y sus textos se asignan mediante `.textContent` o `.value`. No existe ninguna llamada a `innerHTML`, `outerHTML` ni `eval()` en todo el repositorio.

3. **Validación de los campos en JavaScript (sabiendo que no sustituye la del servidor):**
   - **Cumplimiento:** En `auditoria.js` se validan longitudes mínimas,