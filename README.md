# Checklist de Hardening

Aplicación web para guiar la revisión de **hardening** (endurecimiento) de un equipo o servicio antes de ponerlo en producción, con listas de controles y evidencia por cada revisión.

> Proyecto del curso **Programación II** · **Equipo 7** · Escuela Profesional de Ingeniería en Ciberseguridad · Universidad **Nacional Agraria de la Selva** · Ciclo **IV**

**Sitio publicado:** [https://ronald962.github.io/Programacion-desarrollo-de-trabajo/](https://ronald962.github.io/Programacion-desarrollo-de-trabajo/)

## Problema que resuelve

Antes de poner un equipo o servicio en producción hay que aplicar medidas de endurecimiento. Hoy esa revisión se hace de memoria. Esta herramienta guía la revisión con listas de controles, calcula el avance y deja evidencia de lo que se aplicó.

## Usuarios

Administradores de sistemas y auditores.

## Integrantes

| Nombre |
|---|
| Arnold Cesar Ponce Ramirez |
| Sayury Shandal Lazo Gonzales |

## Páginas

| Página | Archivo | Qué hace |
|---|---|---|
| **Inicio** | `index.html` | Propósito del proyecto, pasos de uso y acceso a las secciones |
| **Auditorías** | `auditoria.html` | Crear auditorías; buscar, filtrar por tipo y estado, ordenar, ver el resumen, editar, duplicar, eliminar, cargar datos de ejemplo y exportar en JSON |
| **Checklist** | `checklist.html` | Marcar el estado de cada control, escribir notas de evidencia, filtrar y ver el avance; cerrar o reabrir la auditoría |
| **Reporte** | `reporte.html` | Resumen imprimible: avance, porcentaje por categoría y pendientes de prioridad alta |

Las cuatro páginas comparten el mismo menú, que resalta la página activa (`aria-current="page"`). En pantallas pequeñas los enlaces se acomodan en filas.

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

Cada tipo de lista tiene 8 controles.

## Reglas de la aplicación

- El avance **excluye** los controles marcados como "no aplica".
  Ejemplo: 3 controles aplicados de 8, con 1 "no aplica", dan 43 % (3 de 7).
- No se puede cerrar una auditoría con controles de prioridad alta pendientes sin escribir una justificación.
- Una auditoría cerrada se puede reabrir.
- Se puede duplicar una auditoría existente (la copia inicia con todos los controles en pendiente).

## Capturas

| Auditorías | Checklist | Reporte |
|---|---|---|
| ![Auditorías](docs/capturas/auditorias.png) | ![Checklist](docs/capturas/checklist.png) | ![Reporte](docs/capturas/reporte.png) |

## Estructura del repositorio

```text
Programacion-desarrollo-de-trabajo/
├── README.md
├── LICENSE
├── .gitignore
├── index.html
├── auditoria.html
├── checklist.html
├── reporte.html
├── css/
│   └── style.css
├── js/
│   ├── datos.js
│   ├── auditoria.js
│   ├── checklist.js
│   └── reporte.js
└── docs/
    ├── informe-final.pdf
    ├── pruebas-y-seguridad.md
    ├── capturas/
    │   ├── auditorias.png
    │   ├── checklist.png
    │   └── reporte.png
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

HTML5 semántico, CSS3 (variables, Flexbox y Grid, enfoque *mobile-first*) y JavaScript puro, sin frameworks ni librerías. Los datos se guardan en el navegador con `localStorage` en formato JSON.

## Seguridad

- No se usan datos reales de equipos: los nombres de activos y responsables son ficticios; no hay claves ni credenciales.
- Todo texto escrito por el usuario se muestra con `textContent`, nunca con `innerHTML`; no se usa `eval`.
- Validación de campos en JavaScript (no sustituye la validación de un servidor).
- Enlaces externos con `rel="noopener noreferrer"`.
- `localStorage` guarda solo datos no sensibles.
- Política de seguridad de contenido (CSP) en `<meta>` y ningún script de terceros.

El detalle de las pruebas y de la revisión de seguridad está en [`docs/pruebas-y-seguridad.md`](docs/pruebas-y-seguridad.md).

## Fichas de investigación

| Tema | Ficha |
|---|---|
| E1 · HTML semántico y Git | [ficha-e1-estructura-html.md](docs/investigacion/ficha-e1-estructura-html.md) |
| S11 · CSS y diseño responsive | [ficha-s11-css-responsive.md](docs/investigacion/ficha-s11-css-responsive.md) |
| S12 · JavaScript y Web Storage | [ficha-s12-javascript-storage.md](docs/investigacion/ficha-s12-javascript-storage.md) |
| S13 · Interfaces y usabilidad | [ficha-s13-interfaces.md](docs/investigacion/ficha-s13-interfaces.md) |
| S14 · Frameworks Front End | [ficha-s14-frameworks.md](docs/investigacion/ficha-s14-frameworks.md) |
| S15 · Integración y publicación | [ficha-s15-integracion-publicacion.md](docs/investigacion/ficha-s15-integracion-publicacion.md) |

## Etapas del proyecto

| Etapa | Entrega | Rama | Versión | PR | Estado |
|---|---|---|---|---|---|
| E1 Estructura y navegación | Repositorio con README, páginas HTML semánticas con el mismo menú, formulario maquetado y contenedor de datos | `etapa-1-estructura` | `v0.1` | [PR #1](https://github.com/ronald962/Programacion-desarrollo-de-trabajo/pull/1) | Listo |
| E2 Diseño responsive | `style.css` externo, variables CSS, diseño en 3 anchos | `etapa-2-css` | `v0.2` | [PR #2](https://github.com/ronald962/Programacion-desarrollo-de-trabajo/pull/2) | Listo |
| E3 Registro y presentación de datos | `localStorage`, búsqueda, filtros, orden, resumen, edición, eliminación, datos de ejemplo y exportación | `etapa-3-datos` | `v0.3` | [PR #3](https://github.com/ronald962/Programacion-desarrollo-de-trabajo/pull/3) | Listo |
| E4 Interfaz, validación y usabilidad | Validación accesible, estados de la interfaz, confirmaciones y 5 heurísticas de Nielsen | `etapa-4-interfaz` | `v0.4` | [PR #4](https://github.com/ronald962/Programacion-desarrollo-de-trabajo/pull/4) | Listo |
| E5 Integración y entrega | Pruebas manuales, revisión de seguridad, GitHub Pages, reflexión sobre frameworks e informe final | `etapa-5-entrega` | `v1.0` | [PR #5](https://github.com/ronald962/Programacion-desarrollo-de-trabajo/pull/5) | En curso |

## Licencia

Consulta el archivo [LICENSE](LICENSE).