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