const nombresTipo = {
    so: "Sistema operativo",
    web: "Servidor web",
    red: "Red Wi-Fi"
};

const plantillas = {
    so: [
        { descripcion: "Actualizaciones de seguridad aplicadas", categoria: "Actualizaciones", prioridad: "alta" },
        { descripcion: "Firewall del sistema activo", categoria: "Red", prioridad: "alta" },
        { descripcion: "Cuenta de administrador por defecto deshabilitada o renombrada", categoria: "Accesos", prioridad: "alta" },
        { descripcion: "Política de contraseñas robustas", categoria: "Accesos", prioridad: "media" },
        { descripcion: "Servicios innecesarios deshabilitados", categoria: "Servicios", prioridad: "media" },
        { descripcion: "Registro de eventos (logs) activado", categoria: "Registros", prioridad: "media" },
        { descripcion: "Cifrado de disco habilitado", categoria: "Datos", prioridad: "media" },
        { descripcion: "Copias de seguridad programadas", categoria: "Datos", prioridad: "baja" }
    ],
    web: [
        { descripcion: "HTTPS con certificado válido", categoria: "Cifrado", prioridad: "alta" },
        { descripcion: "Software del servidor web actualizado", categoria: "Actualizaciones", prioridad: "alta" },
        { descripcion: "Login de root por SSH desactivado", categoria: "Accesos", prioridad: "alta" },
        { descripcion: "Permisos mínimos en los archivos del sitio", categoria: "Accesos", prioridad: "alta" },
        { descripcion: "Redirección de HTTP a HTTPS", categoria: "Cifrado", prioridad: "media" },
        { descripcion: "Listado de directorios deshabilitado", categoria: "Configuración", prioridad: "media" },
        { descripcion: "Registros de acceso y errores habilitados", categoria: "Registros", prioridad: "media" },
        { descripcion: "Versión del servidor oculta en las respuestas", categoria: "Configuración", prioridad: "baja" }
    ],
    red: [
        { descripcion: "Cifrado WPA2 o WPA3 activo", categoria: "Cifrado", prioridad: "alta" },
        { descripcion: "Contraseña del Wi-Fi robusta", categoria: "Accesos", prioridad: "alta" },
        { descripcion: "Contraseña de administración del router cambiada", categoria: "Accesos", prioridad: "alta" },
        { descripcion: "Firmware del router actualizado", categoria: "Actualizaciones", prioridad: "alta" },
        { descripcion: "Administración remota del router deshabilitada", categoria: "Configuración", prioridad: "alta" },
        { descripcion: "WPS deshabilitado", categoria: "Configuración", prioridad: "media" },
        { descripcion: "Red de invitados separada de la red interna", categoria: "Red", prioridad: "media" },
        { descripcion: "Nombre de red (SSID) por defecto cambiado", categoria: "Configuración", prioridad: "baja" }
    ]
};

function crearControles(tipo) {
    const lista = [];
    const modelo = plantillas[tipo];

    for (let i = 0; i < modelo.length; i++) {
        lista.push({
            id: i + 1,
            descripcion: modelo[i].descripcion,
            categoria: modelo[i].categoria,
            prioridad: modelo[i].prioridad,
            estado: "pendiente",
            nota: ""
        });
    }

    return lista;
}

function calcularAvance(controles) {
    let aplicados = 0;
    let noAplica = 0;

    for (let i = 0; i < controles.length; i++) {
        if (controles[i].estado === "aplicado") {
            aplicados++;
        }
        if (controles[i].estado === "no-aplica") {
            noAplica++;
        }
    }

    const total = controles.length - noAplica;

    let porcentaje = 0;
    if (total > 0) {
        porcentaje = Math.round((aplicados / total) * 100);
    }

    return {
        aplicados: aplicados,
        noAplica: noAplica,
        total: total,
        pendientes: total - aplicados,
        porcentaje: porcentaje
    };
}

const CLAVE_AUDITORIAS = "hardening-auditorias";
const CLAVE_ACTUAL = "hardening-actual";

function guardarAuditorias(lista) {
    try {
        localStorage.setItem(CLAVE_AUDITORIAS, JSON.stringify(lista));
    } catch (error) {
        alert("No se pudo guardar en el navegador.");
    }
}

function esControlValido(c) {
    if (typeof c !== "object" || c === null) {
        return false;
    }
    if (typeof c.id !== "number") {
        return false;
    }
    if (typeof c.descripcion !== "string" || typeof c.categoria !== "string" || typeof c.nota !== "string") {
        return false;
    }
    if (c.prioridad !== "alta" && c.prioridad !== "media" && c.prioridad !== "baja") {
        return false;
    }
    if (c.estado !== "pendiente" && c.estado !== "aplicado" && c.estado !== "no-aplica") {
        return false;
    }
    return true;
}

function esAuditoriaValida(a) {
    if (typeof a !== "object" || a === null) {
        return false;
    }
    if (typeof a.id !== "number") {
        return false;
    }
    if (typeof a.activo !== "string" || typeof a.responsable !== "string") {
        return false;
    }
    if (typeof a.fecha !== "string" || a.fecha.split("-").length !== 3) {
        return false;
    }
    if (a.tipo !== "so" && a.tipo !== "web" && a.tipo !== "red") {
        return false;
    }
    if (Array.isArray(a.controles) === false) {
        return false;
    }
    for (let i = 0; i < a.controles.length; i++) {
        if (esControlValido(a.controles[i]) === false) {
            return false;
        }
    }
    return true;
}

function cargarAuditorias() {
    let datos = [];

    try {
        const texto = localStorage.getItem(CLAVE_AUDITORIAS);
        if (texto !== null) {
            datos = JSON.parse(texto);
        }
    } catch (error) {
        return [];
    }

    if (Array.isArray(datos) === false) {
        return [];
    }

    const validas = [];
    for (let i = 0; i < datos.length; i++) {
        const a = datos[i];

        if (esAuditoriaValida(a)) {
            a.cerrada = (a.cerrada === true);
            if (typeof a.justificacion !== "string") {
                a.justificacion = "";
            }
            validas.push(a);
        }
    }
    return validas;
}

function guardarActual(id) {
    try {
        localStorage.setItem(CLAVE_ACTUAL, String(id));
    } catch (error) {
        alert("No se pudo guardar en el navegador.");
    }
}

function leerIdActual() {
    try {
        return Number(localStorage.getItem(CLAVE_ACTUAL));
    } catch (error) {
        return 0;
    }
}

function olvidarActual() {
    try {
        localStorage.removeItem(CLAVE_ACTUAL);
    } catch (error) {
    }
}

function buscarActual(lista) {
    const id = leerIdActual();

    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
            return lista[i];
        }
    }
    return null;
}
// ---------- Datos de ejemplo (ficticios) ----------
const EJEMPLOS = [
    { activo: "Servidor-Web-01", responsable: "Analista-01", fecha: "2026-03-02", tipo: "web", cerrada: false },
    { activo: "Servidor-Web-02", responsable: "Analista-02", fecha: "2026-03-05", tipo: "web", cerrada: true },
    { activo: "Servidor-Web-03", responsable: "Analista-01", fecha: "2026-03-09", tipo: "web", cerrada: false },
    { activo: "Equipo-SO-01", responsable: "Analista-03", fecha: "2026-03-12", tipo: "so", cerrada: false },
    { activo: "Equipo-SO-02", responsable: "Analista-02", fecha: "2026-03-14", tipo: "so", cerrada: true },
    { activo: "Equipo-SO-03", responsable: "Analista-03", fecha: "2026-03-18", tipo: "so", cerrada: false },
    { activo: "Red-Aula-01", responsable: "Analista-04", fecha: "2026-03-20", tipo: "red", cerrada: false },
    { activo: "Red-Aula-02", responsable: "Analista-04", fecha: "2026-03-23", tipo: "red", cerrada: true },
    { activo: "Red-Laboratorio", responsable: "Analista-01", fecha: "2026-03-26", tipo: "red", cerrada: false },
    { activo: "Equipo-SO-04", responsable: "Analista-02", fecha: "2026-03-30", tipo: "so", cerrada: false }
];

function crearEjemplos(idInicial) {
    const lista = [];

    for (let i = 0; i < EJEMPLOS.length; i++) {
        const modelo = EJEMPLOS[i];
        const controles = crearControles(modelo.tipo);

        for (let j = 0; j < controles.length; j++) {
            const resto = (i + j) % 4;
            if (resto === 0 || resto === 1) {
                controles[j].estado = "aplicado";
            } else if (resto === 3) {
                controles[j].estado = "no-aplica";
            }
        }

        lista.push({
            id: idInicial + i,
            activo: modelo.activo,
            responsable: modelo.responsable,
            fecha: modelo.fecha,
            tipo: modelo.tipo,
            cerrada: modelo.cerrada,
            justificacion: modelo.cerrada ? "Pendientes aceptados hasta la ventana de mantenimiento (dato de ejemplo)." : "",
            controles: controles
        });
    }

    return lista;
}