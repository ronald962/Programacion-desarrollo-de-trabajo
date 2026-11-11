# Checklist de Hardening
 
Aplicación web para guiar la revisión de **hardening** (endurecimiento) de un equipo o servicio antes de ponerlo en producción, con listas de controles y evidencia por cada revisión.
 
> Proyecto del curso **Programación 2** · **Equipo 7** · Universidad **Nacional Agraria de la Selva** · Ciclo **IV**
 
## Problema que resuelve
 
Antes de poner un equipo o servicio en producción hay que aplicar medidas de endurecimiento. Hoy esa revisión se hace de memoria. Esta herramienta guía la revisión con listas de controles, calcula el avance y deja evidencia de lo que se aplicó.
 
## Usuarios
 
Administradores de sistemas y auditores.
 
## Integrantes
 
| Nombre |
|---|
| Arnold Cesar Ponce Ramirez |
| Sayuri Shandal Lazo Gonzales |

## Páginas
 
| Página | Archivo | Qué hace |
|---|---|---|
| **Inicio** | `index.html` | Presentación del propósito del proyecto y acceso a las secciones |
| **Auditorías** | `auditoria.html` | Crear una auditoría y ver las existentes (buscar, filtrar, editar, duplicar, eliminar) |
| **Checklist** | `checklist.html` | Marcar el estado de cada control, escribir notas de evidencia y ver el avance |
| **Reporte** | `reporte.html` | Resumen imprimible: avance, porcentaje por categoría y pendientes de prioridad alta |
 
Las páginas comparten el mismo menú, que indica la página activa.
 
## Datos que se registran
 
**Auditoría**
 
- Nombre del activo (ficticio)
- Responsable
- Fecha
- Tipo de lista: sistema operativo, servidor web o red Wi-Fi

**Control**
 
- Descripción
- Categoría
- Prioridad: alta, media o baja
- Estado: pendiente, aplicado o no aplica
- Nota de evidencia

Cada tipo de lista tiene al menos 8 controles.
 
## Reglas de la aplicación
 
- El avance **excluye** los controles marcados como "no aplica".
  Ejemplo: 3 controles aplicados de 8, con 1 "no aplica", dan 43 % (3 de 7).
- No se puede cerrar una auditoría con controles de prioridad alta pendientes sin escribir una justificación.
- Se puede duplicar una auditoría existente.

## Estructura del repositorio
 
```text
Programacion-desarrollo-de-trabajo/
├── README.md
├── index.html
├── auditoria.html
├── checklist.html
├── reporte.html
├──css/
    └── style.css
├──js/
    ├── datos.js
    ├── auditoria.js
    ├── checklist.js
    └── reporte.js
└── docs/
    ├── pruebas-y-seguridad.md
    └── investigacion/
        ├── ficha-e1-estructura-html.md
        ├── ficha-s11-css-responsive.md
        ├── ficha-s12-javascript-storage.md
        ├── ficha-s13-interfaces.md
        ├── ficha-s14-frameworks.md
        └── ficha-s15-integracion-publicacion.md
```
 
## Cómo ejecutarlo
 
No requiere instalación ni servidor. Descarga o clona el repositorio y abre `index.html` en el navegador.
 
```bash
git clone https://github.com/ronald962/Programacion-desarrollo-de-trabajo.git
cd Programacion-desarrollo-de-trabajo
```
 
## Tecnologías
 
HTML5 semántico, CSS3 y JavaScript puro, sin frameworks. Los datos se guardan en el navegador con `localStorage`.
 
## Seguridad
 
- La aplicación **no usa datos reales de equipos**: los nombres de activos son ficticios.
- Las notas escritas por el usuario se muestran con `textContent`, no con `innerHTML`.
- Enlaces externos protegidos con `rel="noopener noreferrer"`.
- Política de Seguridad de Contenido (CSP) definida en `<meta>`.

## Etapas del proyecto
 
| Etapa | Entrega | Rama | Versión | PR | Estado |
|---|---|---|---|---|---|
| E1 Estructura y navegación | Repositorio con README, 3 páginas HTML semánticas con el mismo menú, formulario maquetado y contenedor de datos | `etapa-1-estructura` | `v0.1` | [PR #1](https://github.com/ronald962/Programacion-desarrollo-de-trabajo/pull/1) | Listo |
| E2 Diseño responsive | `style.css` externo, menú adaptable, variables CSS | `etapa-2-css` | `v0.2` | [PR #2](https://github.com/ronald962/Programacion-desarrollo-de-trabajo/pull/2) | Listo |
| E3 Registro y presentación de datos | JavaScript con `localStorage`, búsqueda, filtros, orden, resumen, edición, eliminación, datos de ejemplo y exportación | `etapa-3-datos` | `v0.3` | [PR #3](https://github.com/ronald962/Programacion-desarrollo-de-trabajo/pull/3) | Listo |
| E4 Interfaz, validación y usabilidad | Validación accesible, estados de la interfaz, confirmaciones y 5 heurísticas de Nielsen | `etapa-4-interfaz` | `v0.4` | [PR #4](https://github.com/ronald962/Programacion-desarrollo-de-trabajo/pull/4) | Listo |
| E5 Integración y entrega | Pruebas manuales, revisión de seguridad, GitHub Pages, reflexión sobre frameworks e informe final | `etapa-5-entrega` | `v1.0` | [PR #5](https://github.com/ronald962/Programacion-desarrollo-de-trabajo/pull/5) | Listo |
 
## Publicación
 
Sitio publicado en GitHub Pages (Etapa 5): **[https://ronald962.github.io/Programacion-desarrollo-de-trabajo/](https://ronald962.github.io/Programacion-desarrollo-de-trabajo/)**