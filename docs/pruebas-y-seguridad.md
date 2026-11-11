# Pruebas Manuales y Revisión de Seguridad — Checklist de Hardening

> **Proyecto:** Checklist de Hardening (Equipo 7)
> **Curso:** Programación II · FIIS-UNAS
> **Etapa:** E5 Integración y entrega (`v1.0`)
> **Datos:** todos ficticios (`Servidor-Web-01`, `Red-Aula-01`, `Analista-01`…).

---

## 1. Casos de prueba manuales

Se verifican las operaciones CRUD, las reglas de negocio del proyecto y los controles de validación y seguridad. Cada prueba se ejecuta en el navegador sobre el sitio publicado en GitHub Pages.

| ID | Requisito / Regla evaluada | Precondición | Pasos y datos de entrada | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|---|---|
| **CP-01** | **Prueba de aceptación: el avance excluye "no aplica"** | Auditoría abierta de tipo *Sistema operativo* (8 controles en `pendiente`). | 1. Ir a `checklist.html`.<br>2. Marcar 3 controles como `Aplicado`.<br>3. Marcar 1 control como `No aplica`.<br>4. Dejar 4 en `Pendiente`. | Total válido = 7 (8 − 1). La barra y el texto muestran **43 %** (`3 de 7, sin contar "no aplica"`). | La barra `<progress>` toma el valor `43` y el texto muestra `43 % (3 de 7, sin contar "no aplica")`. | **Aprobado** |
| **CP-02** | **Bloqueo de cierre con prioridad alta pendiente sin justificación** | Auditoría abierta con al menos 1 control `alta` en `pendiente`. | 1. Dejar vacío `<textarea id="justificacion">`.<br>2. Clic en **Cerrar auditoría**. | No se cierra; el campo se marca con `aria-invalid="true"`, el foco pasa al campo y se muestra el mensaje indicando cuántos controles de prioridad alta faltan. | No se cierra la auditoría y aparece el mensaje de error junto al campo. | **Aprobado** |
| **CP-03** | **Cierre válido con justificación** | Misma auditoría del CP-02. | 1. Escribir `Se mitigará en la ventana de mantenimiento del viernes`.<br>2. Clic en **Cerrar auditoría** y aceptar el diálogo. | Estado `Cerrada`, radios y notas deshabilitados, botón cambia a `Reabrir auditoría`. | Estado guardado en `localStorage`, controles `disabled` y reflejado en `reporte.html`. | **Aprobado** |
| **CP-04** | **Duplicar auditoría** | Al menos 1 auditoría registrada (ej. `Servidor-Web-01`). | 1. Clic en **Duplicar** en su tarjeta. | Nueva tarjeta `Servidor-Web-01 (copia)` con nuevo `id`, estado `Abierta` y 8 controles en `pendiente`. | La copia se agrega y persiste tras recargar (`F5`). | **Aprobado** |
| **CP-05** | **Validación accesible del formulario** | `auditoria.html` con el formulario vacío. | 1. Dejar todos los campos vacíos.<br>2. Pulsar **Crear**. | No se guarda; cada campo inválido muestra su mensaje vinculado con `aria-describedby` y el foco va al primer campo con error. | Mensajes bajo cada control y cursor en `input#activo`. | **Aprobado** |
| **CP-06** | **Prevención de XSS en notas y nombres** | Auditoría abierta en `checklist.html`. | 1. En una nota escribir `<img src=x onerror=alert(1)>` y `<script>alert("xss")</script>`.<br>2. Ir a `reporte.html`. | No se ejecuta ningún script ni ventana emergente; las etiquetas se muestran como texto (`textContent`). | El texto se ve como cadena literal inofensiva en el reporte y el checklist. | **Aprobado** |
| **CP-07** | **Eliminación con confirmación** | Auditoría existente. | 1. Clic en **Eliminar**.<br>2. Primero *Cancelar*, luego *Aceptar*. | Al cancelar permanece; al aceptar se elimina del DOM y de `localStorage`. | Solo se borra tras confirmar. | **Aprobado** |
| **CP-08** | **Reporte por categoría y vista de impresión** | Auditoría con controles aplicados y pendientes. | 1. Abrir `reporte.html`.<br>2. `Ctrl + P`. | Porcentaje por categoría sin contar `no-aplica`, lista de pendientes de prioridad alta; al imprimir se ocultan `<nav>`, `<footer>` y botones. | Hoja imprimible solo con encabezado, tablas y resúmenes. | **Aprobado** |
| **CP-09** | **Cargar datos de ejemplo** | `auditoria.html` con la lista vacía o con registros propios. | 1. Clic en **Cargar datos de ejemplo**.<br>2. Recargar con `F5`. | Se agregan 10 auditorías ficticias (4 SO, 3 servidor web, 3 red) sin borrar las existentes; aparece mensaje de éxito y el resumen suma 10. Persisten tras recargar. | Las 10 auditorías ficticias se agregan, se ven en la lista (parte inferior de la página) y persisten al recargar. | **Aprobado** |
| **CP-10** | **Exportar datos en JSON** | Al menos 1 auditoría registrada. | 1. Clic en **Exportar JSON**.<br>2. Abrir `auditorias-hardening.json` con un editor.<br>3. Repetir con la lista vacía. | Se descarga un archivo con un arreglo JSON válido que contiene las auditorías y sus controles. Con la lista vacía aparece "No hay auditorías para exportar." y no se descarga nada. | Se descarga `auditorias-hardening.json` en la PC con los datos de las auditorías (id, descripción, etc.); con la lista vacía muestra que no hay auditorías para exportar. | **Aprobado** |

---

## 2. Revisión de los 6 controles de seguridad

### 1. Sin claves, tokens ni credenciales; datos ficticios
- **Cumplimiento:** el proyecto no usa APIs externas, claves ni credenciales. Los nombres de activos (`Servidor-Web-01`, `Red-Aula-01`) y de responsables (`Analista-01`) son ficticios.
- **Verificación:** `git log -p | grep -iE "password|token|api_key|secret"` no debe devolver coincidencias relevantes.

### 2. `textContent` en lugar de `innerHTML`; sin `eval`
- **Cumplimiento:** en `auditoria.js`, `checklist.js` y `reporte.js` los nodos se crean con `document.createElement()` y los textos se asignan con `.textContent` o `.value`. Para vaciar contenedores se usa `textContent = ""`.
- **Verificación:** `grep -rnE "innerHTML|outerHTML|insertAdjacentHTML|eval\(|style=" .` no devuelve resultados en el código. Prueba funcional: CP-06.

### 3. Validación de campos en JavaScript
- **Cumplimiento:** `auditoria.js` valida activo (mínimo 3 caracteres), responsable (mínimo 2), fecha obligatoria y tipo de lista, con mensajes accesibles junto a cada campo. `checklist.js` exige justificación para cerrar con prioridad alta pendiente y limita las notas (300 caracteres) y la justificación (400) con `maxlength`. Al leer `localStorage`, `datos.js` revisa la estructura de cada registro (`esAuditoriaValida`, `esControlValido`).
- **Límite:** esta validación mejora la experiencia, pero **no sustituye** la del servidor: cualquiera puede modificarla desde las herramientas del navegador. Prueba: CP-05 y CP-15.

### 4. Enlaces externos con `rel="noopener noreferrer"`; solo http o https
- **Cumplimiento:** los únicos enlaces externos son los dos perfiles de LinkedIn del pie de página, con `target="_blank"` y `rel="noopener noreferrer"`.
- **Alcance:** la aplicación no solicita ni muestra enlaces escritos por el usuario, por lo que no hay valores como `javascript:` que filtrar. Si en el futuro se aceptaran direcciones, solo se admitirían las que empiecen por `http://` o `https://`.

### 5. `localStorage` solo para datos no sensibles
- **Cumplimiento:** solo se guardan auditorías ficticias y el identificador de la auditoría activa (`hardening-auditorias` y `hardening-actual`).
- **Por qué no guarda secretos:** `localStorage` no está cifrado y cualquier script que se ejecute en la página puede leerlo; ante una vulnerabilidad XSS, un atacante vería todo su contenido.
- **Límites:** unos 5 MB por origen, solo cadenas de texto (requiere `JSON.stringify` y `JSON.parse`), es síncrono y los datos viven solo en ese navegador y dispositivo.

### 6. Política de seguridad de contenido básica; sin scripts de terceros
- **Cumplimiento:** las cuatro páginas declaran en `<meta http-equiv="Content-Security-Policy">`:
  `default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'none'; form-action 'self';`
- **Efecto:** no se permiten scripts ni estilos en línea, ni recursos de otros orígenes. No se usa ninguna librería, CDN ni script de terceros.
- **Límite:** una CSP en `<meta>` no admite algunas directivas (por ejemplo `frame-ancestors`); en un servidor propio se enviaría como cabecera HTTP.

---

## 3. Limitaciones conocidas
- No hay servidor ni autenticación: los datos viven solo en el navegador de cada persona.
- La validación solo existe en el cliente.
- En pantallas pequeñas el menú se acomoda en filas; no tiene botón desplegable.