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
| **Auditorías** | `index.html` | Crear una auditoría y ver las existentes (buscar, filtrar, editar, duplicar, eliminar) |
| **Checklist** | `checklist.html` | Marcar el estado de cada control, escribir notas de evidencia y ver el avance |
| **Reporte** | `reporte.html` | Resumen imprimible: avance, porcentaje por categoría y pendientes de prioridad alta |
 
Las tres páginas comparten el mismo menú, que indica la página activa.
 
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
 
```
checklist-hardening/
├── README.md
├── index.html
├── auditorias.html
├── checklist.html
└── reporte.html
```
 
Se irán sumando `estilos.css` (Etapa 2) y `app.js` (Etapa 3).
 
## Cómo ejecutarlo
 
No requiere instalación ni servidor. Descarga o clona el repositorio y abre `index.html` en el navegador.
 
```bash
git clone https://github.com/[usuario]/[repositorio].git
cd [repositorio]
```
 
## Tecnologías
 
HTML5 semántico, CSS3 y JavaScript puro, sin frameworks. Los datos se guardarán en el navegador con `localStorage` (Etapa 3).
 
## Seguridad
 
- La aplicación **no usa datos reales de equipos**: los nombres de activos son ficticios.
- Las notas escritas por el usuario se mostrarán con `textContent`, no con `innerHTML`.
## Etapas del proyecto
 
| Etapa | Entrega | Rama | Versión | Estado |
|---|---|---|---|---|
| E1 Estructura y navegación | Repositorio con README, 3 páginas HTML semánticas con el mismo menú, formulario maquetado y contenedor de datos | `etapa-1-estructura` | `v0.1` | Listo |
| E2 Diseño responsive | `estilos.css` externo, menú adaptable, variables CSS | `etapa-2-css` | `v0.2` | Listo |
| E3 Registro y presentación de datos | JavaScript con `localStorage`, búsqueda, filtros, orden, resumen, edición, eliminación, datos de ejemplo y exportación | `etapa-3-datos` | `v0.3` | Listo |
| E4 Interfaz, validación y usabilidad | Validación accesible, estados de la interfaz, confirmaciones y 5 heurísticas de Nielsen | `etapa-4-interfaz` | `v0.4` | Listo |
| E5 Integración y entrega | Pruebas manuales, revisión de seguridad, GitHub Pages, reflexión sobre frameworks e informe final | `etapa-5-entrega` | `v1.0` | Pendiente |
 
## Publicación
 
Sitio publicado en GitHub Pages (Etapa 5): **[enlace pendiente]**
 
