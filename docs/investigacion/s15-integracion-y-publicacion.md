# Ficha S15: Integración, publicación y pruebas (Etapa 5)

## Resumen (131 palabras)
La etapa final del desarrollo web consiste en verificar la calidad y seguridad del software antes de publicarlo. Las pruebas manuales estructuradas permiten comprobar de forma sistemática que tanto las operaciones básicas como las reglas de negocio y las validaciones de seguridad respondan correctamente ante entradas válidas e inválidas. Asimismo, el uso de almacenamiento local en el navegador (`localStorage`) exige comprender sus restricciones técnicas de capacidad y su exposición frente a vulnerabilidades en el cliente, razón por la cual nunca debe emplearse para resguardar información confidencial. Finalmente, el despliegue continuo mediante servicios de alojamiento estático como GitHub Pages permite publicar directamente los archivos HTML, CSS y JavaScript desde la rama principal del repositorio, haciendo accesible la aplicación a través de HTTPS sin administrar servidores adicionales.

## Respuestas a las preguntas guía

### 1. ¿Qué es GitHub Pages y qué archivos se publican?
- **Qué es**: Es un servicio gratuito de alojamiento de sitios web estáticos integrado en GitHub que toma los archivos directamente desde una rama del repositorio (como `main`), sin ejecutar código de servidor (como PHP, Python o bases de datos SQL).
- **Qué archivos se publican**: Se publican públicamente todos los recursos estáticos del cliente: páginas HTML (`index.html`, `auditoria.html`, `checklist.html`, `reporte.html`), hojas de estilo (`style.css`), scripts (`datos.js`, `auditoria.js`, `checklist.js`, `reporte.js`), imágenes y documentación que estén en la raíz o carpeta configurada.

### 2. ¿Qué límites y riesgos tiene `localStorage`?
- **Límites técnicos**: Solo almacena cadenas de texto (requiere `JSON.stringify` y `JSON.parse`), tiene un límite de espacio reducido (aproximadamente 5 MB por origen/dominio), es síncrono (puede bloquear el hilo principal con volúmenes grandes) y los datos solo viven en ese navegador y dispositivo.
- **Riesgos de seguridad**: Carece de cifrado nativo y cualquier script de JavaScript que se ejecute en la página tiene acceso total a su contenido; por lo tanto, si existiera una vulnerabilidad XSS, un atacante podría leer o alterar todo el `localStorage`, motivo por el cual jamás debe guardar contraseñas, tokens ni datos reales sensibles.

### 3. ¿Cómo se diseña un caso de prueba manual?
Un caso de prueba manual se diseña definiendo 5 elementos claros:
1. **Identificador y objetivo**: Qué requisito o regla se va a verificar (ej. `CP-01: Cálculo de avance excluyendo "no aplica"`).
2. **Precondiciones**: Estado inicial necesario (ej. tener una auditoría abierta con 8 controles).
3. **Pasos de ejecución y datos de entrada**: Acciones concretas (ej. marcar 3 controles como "aplicado" y 1 como "no aplica").
4. **Resultado esperado**: Lo que especifica la regla (ej. la barra de avance debe mostrar `43 %`, equivalente a 3 de 7).
5. **Resultado obtenido y estado**: Lo que realmente mostró el navegador y si la prueba queda *Aprobada* o *Fallida*.

## Aplicación en el proyecto
Aplicamos esta sesión al publicar el repositorio en **GitHub Pages** desde la rama `main`, al validar y sanitizar la lectura de `localStorage` con `esAuditoriaValida()` usando solo nombres de activos ficticios, y al ejecutar nuestra matriz de pruebas manuales (incluyendo la prueba de aceptación del 43 % y el bloqueo de cierre sin justificación).

## Dudas surgidas en la investigación
- ¿Cómo se podría migrar en el futuro la persistencia de `localStorage` hacia una base de datos en el servidor manteniendo la posibilidad de trabajar sin conexión en el navegador?

## Referencias (APA 7)
- GitHub. (s. f.). *GitHub Pages documentation*. https://docs.github.com/pages
- Mozilla. (s. f.). *Web Storage API - MDN Web Docs*. https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
- OWASP Foundation. (2025). *OWASP Top 10:2025*. https://owasp.org/Top10/2025/