const auditoriaPrueba = {
    activo: "Servidor-Web-01 (prueba)",
    responsable: "Responsable de prueba",
    fecha: "2026-11-08",
    tipo: "web",
    cerrada: false,
    controles: crearControles("web")
};

auditoriaPrueba.controles[0].estado = "aplicado";
auditoriaPrueba.controles[0].nota = "Certificado verificado.";
auditoriaPrueba.controles[5].estado = "aplicado";
auditoriaPrueba.controles[6].estado = "aplicado";
auditoriaPrueba.controles[7].estado = "no-aplica";
auditoriaPrueba.controles[2].nota = "Falta coordinar con el responsable.";

const textoVacio = document.getElementById("rep-vacio");
const contenidoReporte = document.getElementById("lista-reporte");
const tablaCategorias = document.getElementById("tabla-categorias");
const listaPendientes = document.getElementById("lista-pendientes");
const mensajeSinPendientes = document.getElementById("mensaje-sin-pendientes");


function crearCelda(texto) {
    const celda = document.createElement("td");
    celda.textContent = texto;
    return celda;
}

function mostrarReporte(auditoria) {
    textoVacio.hidden = true;
    contenidoReporte.hidden = false;

    document.getElementById("rep-nombre").textContent = auditoria.activo;
    document.getElementById("rep-tipo").textContent = nombresTipo[auditoria.tipo];
    document.getElementById("rep-responsable").textContent = auditoria.responsable;
    const partesFecha = auditoria.fecha.split("-"); // 2026-11-08 -> 08/11/2026
    document.getElementById("rep-fecha").textContent = partesFecha[2] + "/" + partesFecha[1] + "/" + partesFecha[0];
    document.getElementById("rep-estado").textContent = auditoria.cerrada ? "Cerrada" : "Abierta";

    const avance = calcularAvance(auditoria.controles);
    document.getElementById("avance-general").value = avance.porcentaje;
    document.getElementById("rep-avance").textContent = avance.porcentaje + " %";
    document.getElementById("rep-aplicados").textContent = avance.aplicados;
    document.getElementById("rep-pendientes").textContent = avance.pendientes;
    document.getElementById("rep-noaplica").textContent = avance.noAplica;

    const porCategoria = {};

    for (let i = 0; i < auditoria.controles.length; i++) {
        const control = auditoria.controles[i];

        if (porCategoria[control.categoria] === undefined) {
            porCategoria[control.categoria] = { aplicados: 0, total: 0 };
        }

        if (control.estado !== "no-aplica") {
            porCategoria[control.categoria].total++;
        }
        if (control.estado === "aplicado") {
            porCategoria[control.categoria].aplicados++;
        }
    }

    for (const nombre in porCategoria) {
        const datos = porCategoria[nombre];

        let porcentaje = "—";
        if (datos.total > 0) {
            porcentaje = Math.round((datos.aplicados / datos.total) * 100) + " %";
        }

        const fila = document.createElement("tr");
        fila.appendChild(crearCelda(nombre));
        fila.appendChild(crearCelda(datos.aplicados));
        fila.appendChild(crearCelda(datos.total));
        fila.appendChild(crearCelda(porcentaje));
        tablaCategorias.appendChild(fila);
    }

    let cantidadPendientes = 0;

    for (let i = 0; i < auditoria.controles.length; i++) {
        const control = auditoria.controles[i];

        if (control.prioridad === "alta" && control.estado === "pendiente") {
            let nota = control.nota.trim();
            if (nota === "") {
                nota = "(sin nota)";
            }

            const item = document.createElement("li");
            item.textContent = control.descripcion + " — Nota: " + nota;
            listaPendientes.appendChild(item);
            cantidadPendientes++;
        }
    }

    mensajeSinPendientes.hidden = cantidadPendientes > 0;
}

mostrarReporte(auditoriaPrueba);