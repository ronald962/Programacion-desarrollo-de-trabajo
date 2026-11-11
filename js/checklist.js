const todas = cargarAuditorias();
const auditoriaActual = buscarActual(todas);

const estados = [
    { valor: "pendiente", texto: "Pendiente" },
    { valor: "aplicado", texto: "Aplicado" },
    { valor: "no-aplica", texto: "No aplica" }
];

const textoNombre = document.getElementById("nombreAuditoria");
const textoTipo = document.getElementById("tipoAuditoria");
const barraAvance = document.getElementById("barra");
const textoAvance = document.getElementById("avance-barra");
const selectCategoria = document.getElementById("categoria");
const selectPrioridad = document.getElementById("prioridad");
const selectEstado = document.getElementById("estado");
const listaControles = document.getElementById("lista-controles");
const mensajeVacio = document.getElementById("mensaje-vacio");
const inputJustificacion = document.getElementById("justificacion");
const errorJustificacion = document.getElementById("error-justificacion");
const botonCerrar = document.getElementById("btn-cerrar");

function llenarCategorias() {
    const yaAgregadas = [];

    for (let i = 0; i < auditoriaActual.controles.length; i++) {
        const categoria = auditoriaActual.controles[i].categoria;

        if (yaAgregadas.includes(categoria) === false) {
            yaAgregadas.push(categoria);

            const opcion = document.createElement("option");
            opcion.value = categoria;
            opcion.textContent = categoria;
            selectCategoria.appendChild(opcion);
        }
    }
}

function actualizarAvance() {
    const avance = calcularAvance(auditoriaActual.controles);

    barraAvance.value = avance.porcentaje;
    textoAvance.textContent = avance.porcentaje + " % (" + avance.aplicados +
        " de " + avance.total + ", sin contar \"no aplica\")";
}

function mostrarEstadoCierre() {
    if (auditoriaActual.cerrada) {
        botonCerrar.textContent = "Reabrir auditoría";
        inputJustificacion.disabled = true;
    } else {
        botonCerrar.textContent = "Cerrar auditoría";
        inputJustificacion.disabled = false;
    }
}

function dibujarControl(control) {
    const tarjeta = document.createElement("article");
    const grupo = document.createElement("fieldset");

    const titulo = document.createElement("legend");
    titulo.textContent = control.descripcion;
    grupo.appendChild(titulo);

    const info = document.createElement("p");
    info.textContent = "Categoría: " + control.categoria + " · Prioridad: " + control.prioridad;
    grupo.appendChild(info);

    const parrafoEstado = document.createElement("p");

    for (let i = 0; i < estados.length; i++) {
        const opcionEstado = estados[i];

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "estado-" + control.id;
        radio.id = "control" + control.id + "-" + opcionEstado.valor;
        radio.value = opcionEstado.valor;
        radio.checked = (control.estado === opcionEstado.valor);
        radio.disabled = auditoriaActual.cerrada;

        radio.addEventListener("change", function () {
            control.estado = opcionEstado.valor;
            guardarAuditorias(todas);
            actualizarAvance();

            if (selectEstado.value !== "") {
                mostrarControles();
            }
        });

        const etiqueta = document.createElement("label");
        etiqueta.setAttribute("for", radio.id);
        etiqueta.textContent = opcionEstado.texto;

        parrafoEstado.appendChild(radio);
        parrafoEstado.appendChild(etiqueta);
    }
    grupo.appendChild(parrafoEstado);

    const parrafoNota = document.createElement("p");

    const etiquetaNota = document.createElement("label");
    etiquetaNota.setAttribute("for", "nota" + control.id);
    etiquetaNota.textContent = "Nota de evidencia";

    const cajaNota = document.createElement("textarea");
    cajaNota.id = "nota" + control.id;
    cajaNota.rows = 2;
    cajaNota.maxLength = 300;
    cajaNota.value = control.nota;
    cajaNota.disabled = auditoriaActual.cerrada;

    cajaNota.addEventListener("input", function () {
        control.nota = cajaNota.value;
        guardarAuditorias(todas);
    });

    parrafoNota.appendChild(etiquetaNota);
    parrafoNota.appendChild(cajaNota);
    grupo.appendChild(parrafoNota);

    tarjeta.appendChild(grupo);
    return tarjeta;
}

function mostrarControles() {
    listaControles.textContent = "";

    let cantidad = 0;

    for (let i = 0; i < auditoriaActual.controles.length; i++) {
        const control = auditoriaActual.controles[i];

        const okCategoria = selectCategoria.value === "" || control.categoria === selectCategoria.value;
        const okPrioridad = selectPrioridad.value === "" || control.prioridad === selectPrioridad.value;
        const okEstado = selectEstado.value === "" || control.estado === selectEstado.value;

        if (okCategoria && okPrioridad && okEstado) {
            listaControles.appendChild(dibujarControl(control));
            cantidad++;
        }
    }

    mensajeVacio.hidden = cantidad > 0;
    mensajeVacio.textContent = "No hay controles";
}

function cerrarOReabrir() {
    if (auditoriaActual.cerrada) {
        auditoriaActual.cerrada = false;
        inputJustificacion.removeAttribute("aria-invalid");
        errorJustificacion.textContent = "";
        guardarAuditorias(todas);
        mostrarEstadoCierre();
        mostrarControles();
        return;
    }

    let altasPendientes = 0;

    for (let i = 0; i < auditoriaActual.controles.length; i++) {
        const control = auditoriaActual.controles[i];
        if (control.prioridad === "alta" && control.estado === "pendiente") {
            altasPendientes++;
        }
    }

    const justificacion = inputJustificacion.value.trim();

    if (altasPendientes > 0 && justificacion === "") {
        inputJustificacion.setAttribute("aria-invalid", "true");
        errorJustificacion.textContent = "Error: Hay " + altasPendientes +
            " control(es) de prioridad alta pendientes. Escribe una justificación para cerrar.";
        inputJustificacion.focus();
        return;
    }

    const confirmarCierre = confirm("¿Confirmas que deseas cerrar la auditoría \"" + auditoriaActual.activo + "\"?");
    if (confirmarCierre === false) {
        return;
    }

    inputJustificacion.removeAttribute("aria-invalid");
    errorJustificacion.textContent = "";

    auditoriaActual.cerrada = true;
    auditoriaActual.justificacion = justificacion;
    guardarAuditorias(todas);

    mostrarEstadoCierre();
    mostrarControles();
}

if (auditoriaActual === null) {
    textoNombre.textContent = "(ninguna seleccionada)";
    textoTipo.textContent = "—";
    mensajeVacio.hidden = false;
    mensajeVacio.textContent = "No hay una auditoría abierta. Elige una en la página Auditorías.";
    botonCerrar.disabled = true;
    inputJustificacion.disabled = true;
    selectCategoria.disabled = true;
    selectPrioridad.disabled = true;
    selectEstado.disabled = true;
} else {
    textoNombre.textContent = auditoriaActual.activo;
    textoTipo.textContent = nombresTipo[auditoriaActual.tipo];
    inputJustificacion.value = auditoriaActual.justificacion;

    llenarCategorias();
    actualizarAvance();
    mostrarEstadoCierre();
    mostrarControles();

    selectCategoria.addEventListener("change", mostrarControles);
    selectPrioridad.addEventListener("change", mostrarControles);
    selectEstado.addEventListener("change", mostrarControles);

    botonCerrar.addEventListener("click", cerrarOReabrir);
}