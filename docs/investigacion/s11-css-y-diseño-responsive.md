# Ficha S11 (Etapa 2): CSS y diseño responsive

## Resumen (Palabras propias)
El diseño web adaptable (*responsive*) con enfoque *mobile-first* consiste en construir primero la apariencia para pantallas pequeñas (móviles de hasta 600 px) e ir adaptando la distribución para tabletas (601 a 960 px) y escritorios (más de 960 px) mediante consultas de medios (`@media`). Para evitar desbordamientos al agregar márgenes internos y bordes, resulta fundamental aplicar el modelo de caja `border-box` en todos los elementos. Asimismo, la combinación de CSS Grid para la estructura general de la página y Flexbox para alinear elementos flexibles como la barra de navegación permite crear interfaces limpias sin necesidad de librerías externas. Finalmente, el uso de variables CSS en `:root` centraliza la paleta de colores asegurando un contraste visual adecuado según las pautas WCAG 2.2, además de incluir reglas `@media print` para documentos imprimibles.

## Respuestas a las preguntas guía

### 1. ¿Qué regla gana cuando dos selectores compiten?
En CSS, cuando dos o más reglas apuntan al mismo elemento, el navegador decide cuál aplicar siguiendo la **cascada y la especificidad**:
1. Primero gana el selector con **mayor especificidad**: un selector de ID (`#titulo` = `1-0-0`) le gana a un selector de clase, atributo o pseudoclase (`.container`, `:hover` = `0-1-0`), y este a su vez le gana a un selector de etiqueta (`article`, `p` = `0-0-1`).
2. Si dos selectores tienen **exactamente la misma especificidad**, gana la regla que esté **escrita más abajo** en la hoja de estilos `style.css`.

### 2. ¿Qué cambia entre `content-box` y `border-box`?
- **`content-box` (valor por defecto)**: La propiedad `width` solo define el ancho del contenido; si se agregan `padding` o `border`, estos se suman al tamaño final, haciendo que las cajas como los `<input width: 100%>` se salgan de su contenedor.
- **`border-box`**: La propiedad `width` incluye dentro de esa medida el contenido, el relleno (`padding`) y el borde (`border`), garantizando que un elemento con `width: 100%` nunca desborde su tarjeta.

### 3. ¿Cómo funcionan Flexbox, Grid y una media query?
- **Flexbox (`display: flex`)**: Sistema unidimensional (fila o columna) ideal para distribuir y alinear elementos en una sola dirección, como los enlaces del menú `<nav>` con `flex-wrap: wrap` y `justify-content: center`.
- **CSS Grid (`display: grid`)**: Sistema bidimensional (filas y columnas simultáneas) usado para maquetar la estructura completa del `<body>` (`grid-template-rows: auto 1fr auto`) y las columnas del `<footer>`.
- **Media query (`@media`)**: Condición que aplica estilos CSS únicamente cuando la pantalla o el medio cumple cierto criterio, como `@media (min-width: 601px)`, `@media (min-width: 961px)` o `@media print`.

## Aplicación en el proyecto (Checklist de Hardening)
En `style.css` se declararon variables globales en `:root` (`--color-fondo`, `--color-encabezado`, `--color-tarjeta`, `--radio`), se configuró `box-sizing: border-box` universal, se maquetó el pie de página fijo abajo con Grid, se adaptaron los anchos del `.container` en los tres puntos de corte (hasta 600 px, 601–960 px y más de 960 px) y se añadió `@media print` para ocultar el menú, botones y pie al imprimir el reporte de auditoría.

## Dudas surgidas en el equipo
- ¿Cómo lograr que el `<footer>` quede siempre al final de la pantalla aunque haya pocas auditorías? (Resuelto aplicando `min-height: 100vh`, `display: grid` y `grid-template-rows: auto 1fr auto` en el `body`).

## Referencias (APA 7)
- Mozilla. (s. f.). *Diseño responsivo y Flexbox/Grid - MDN Web Docs (CSS)*. https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout
- W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2 - Contrast (Minimum)*. https://www.w3.org/TR/WCAG22/