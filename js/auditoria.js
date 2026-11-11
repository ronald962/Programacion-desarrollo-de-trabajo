let auditorias = cargarAuditorias();

let siguienteId = 1;
for (let i = 0; i < auditorias.length; i++) {
    if (auditorias[i].id >= siguienteId) {
        siguienteId = auditorias[i].id + 1;
    }
}

let idEditando = null;

const formulario = document.getElementById("formulario");
const inputActivo = document.getElementById("activo");
const inputResponsable = document.getElementById("responsable");
const inputFecha = document.getElementById("fecha");
const selectLista = document.getElementById("lista");
const botonGuardar = document.getElementById("btn-guardar");
const botonCancelar = document.getElementById("btn-cancelar");
const mensaje = document.getElementById("mensaje");
const inputBuscar = document.getElementById("buscar");
const selectTipo = document.getElementById("tipo");
const contenedor = document.getElementById("lista-auditorias");
const mensajeVacio = document.getElementById("mensaje-vacio");
const errorActivo = document.getElementById("error-activo");
const errorResponsable = document.getElementById("error-responsable");
const errorFecha = document.getElementById("error-fecha");
const errorLista = document.getElementById("error-lista");

function marcarError(campo, contenedorError, textoError) {
    campo.setAttribute("aria-invalid", "true");
    contenedorError.textContent = textoError;
}

function limpiarError(campo, contenedorError) {
    campo.removeAttribute("aria-invalid");
    contenedorError.textContent = "";
}

function limpiarTodosLosErrores() {
    limpiarError(inputActivo, errorActivo);
    limpiarError(inputResponsable, errorResponsable);
    limpiarError(inputFecha, errorFecha);
    limpiarError(selectLista, errorLista);
}

function formatearFecha(fecha) {
    const partes = fecha.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

function buscarPosicion(id) {
    for (let i = 0; i < auditorias.length; i++) {
        if (auditorias[i].id === id) {
            return i;
        }
    }
    return -1;
}


// ---------- CREAR y EDITAR ----------

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limpiarTodosLosErrores();
    mensaje.textContent = "";
    mensaje.className = "";

    const activo = inputActivo.value.trim();
    const responsable = inputResponsable.value.trim();
    const fecha = inputFecha.value;
    const tipoLista = selectLista.value;

    let primerCampoConError = null;

    if (activo.length < 3) {
        marcarError(inputActivo, errorActivo, "Error: Ingresa un nombre de activo (mínimo 3 caracteres).");
        primerCampoConError = primerCampoConError || inputActivo;
    }

    if (responsable.length < 2) {
        marcarError(inputResponsable, errorResponsable, "Error: Ingresa el nombre del responsable.");
        primerCampoConError = primerCampoConError || inputResponsable;
    }

    if (fecha === "") {
        marcarError(inputFecha, errorFecha, "Error: Selecciona la fecha de la auditoría.");
        primerCampoConError = primerCampoConError || inputFecha;
    }

    if (tipoLista === "") {
        marcarError(selectLista, errorLista, "Error: Selecciona un tipo de lista.");
        primerCampoConError = primerCampoConError || selectLista;
    }

    if (primerCampoConError !== null) {
        primerCampoConError.focus();
        return;
    }

    if (idEditando === null) {
        const nueva = {
            id: siguienteId,
            activo: activo,
            responsable: responsable,
            fecha: fecha,
            tipo: tipoLista,
            cerrada: false,
            justificacion: "",
            controles: crearControles(tipoLista)
        };
        siguienteId++;
        auditorias.push(nueva);
        formulario.reset();
        mensaje.textContent = "Auditoría creada correctamente.";
        mensaje.className = "estado-exito";
    } else {
        const posicion = buscarPosicion(idEditando);
        auditorias[posicion].activo = activo;
        auditorias[posicion].responsable = responsable;
        auditorias[posicion].fecha = fecha;
        terminarEdicion();
        mensaje.textContent = "Cambios guardados correctamente.";
        mensaje.className = "estado-exito";
    }

    guardarAuditorias(auditorias);
    mostrarAuditorias();
});

function editarAuditoria(id) {
    const posicion = buscarPosicion(id);
    const a = auditorias[posicion];

    limpiarTodosLosErrores();
    mensaje.textContent = "";
    mensaje.className = "";

    inputActivo.value = a.activo;
    inputResponsable.value = a.responsable;
    inputFecha.value = a.fecha;
    selectLista.value = a.tipo;
    selectLista.disabled = true;

    idEditando = id;
    botonGuardar.textContent = "Guardar cambios";
    botonCancelar.hidden = false;
    inputActivo.focus();
}

function terminarEdicion() {
    idEditando = null;
    selectLista.disabled = false;
    botonGuardar.textContent = "Crear";
    botonCancelar.hidden = true;
    mensaje.textContent = "";
    mensaje.className = "";
    limpiarTodosLosErrores();
    formulario.reset();
}

function editarAuditoria(id) {
    const posicion = buscarPosicion(id);
    const a = auditorias[posicion];

    inputActivo.value = a.activo;
    inputResponsable.value = a.responsable;
    inputFecha.value = a.fecha;
    selectLista.value = a.tipo;
    selectLista.disabled = true;

    idEditando = id;
    botonGuardar.textContent = "Guardar cambios";
    botonCancelar.hidden = false;
    inputActivo.focus();
}

function terminarEdicion() {
    idEditando = null;
    selectLista.disabled = false;
    botonGuardar.textContent = "Crear";
    botonCancelar.hidden = true;
    mensaje.textContent = "";
    formulario.reset();
}

botonCancelar.addEventListener("click", terminarEdicion);

function abrirAuditoria(id) {
    guardarActual(id);
    window.location.href = "checklist.html";
}

function eliminarAuditoria(id) {
    const posicion = buscarPosicion(id);
    const quiere = confirm("¿Seguro que quieres eliminar \"" + auditorias[posicion].activo + "\"?");

    if (quiere === false) {
        return;
    }

    auditorias.splice(posicion, 1);
    guardarAuditorias(auditorias);

    if (leerIdActual() === id) {
        olvidarActual();
    }

    if (idEditando === id) {
        terminarEdicion();
    }
    mostrarAuditorias();
}

function duplicarAuditoria(id) {
    const posicion = buscarPosicion(id);
    const original = auditorias[posicion];

    const copia = {
        id: siguienteId,
        activo: original.activo + " (copia)",
        responsable: original.responsable,
        fecha: original.fecha,
        tipo: original.tipo,
        cerrada: false,
        justificacion: "",
        controles: crearControles(original.tipo)
    };
    siguienteId++;
    auditorias.push(copia);
    guardarAuditorias(auditorias);

    mostrarAuditorias();
}

function crearBoton(texto, accion) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = texto;
    boton.addEventListener("click", accion);
    return boton;
}

function crearTarjeta(a) {
    const tarjeta = document.createElement("article");

    const titulo = document.createElement("h3");
    titulo.textContent = a.activo;
    tarjeta.appendChild(titulo);

    const datos = document.createElement("p");
    datos.textContent = nombresTipo[a.tipo] + " · " + formatearFecha(a.fecha);
    tarjeta.appendChild(datos);

    const responsable = document.createElement("p");
    responsable.textContent = "Responsable: " + a.responsable;
    tarjeta.appendChild(responsable);

    const avance = calcularAvance(a.controles);
    const parrafoAvance = document.createElement("p");
    const barra = document.createElement("progress");
    barra.max = 100;
    barra.value = avance.porcentaje;
    parrafoAvance.appendChild(document.createTextNode("Avance: "));
    parrafoAvance.appendChild(barra);
    parrafoAvance.appendChild(document.createTextNode(" " + avance.porcentaje + " %"));
    tarjeta.appendChild(parrafoAvance);

    const estado = document.createElement("p");
    if (a.cerrada) {
        estado.textContent = "Estado: Cerrada";
    } else {
        estado.textContent = "Estado: Abierta";
    }
    tarjeta.appendChild(estado);

    tarjeta.appendChild(crearBoton("Abrir", function () {
        abrirAuditoria(a.id);
    }));
    tarjeta.appendChild(crearBoton("Editar", function () {
        editarAuditoria(a.id);
    }));
    tarjeta.appendChild(crearBoton("Duplicar", function () {
        duplicarAuditoria(a.id);
    }));
    tarjeta.appendChild(crearBoton("Eliminar", function () {
        eliminarAuditoria(a.id);
    }));

    return tarjeta;
}

function mostrarAuditorias() {
    const texto = inputBuscar.value.trim().toLowerCase();
    const tipoFiltro = selectTipo.value;

    contenedor.textContent = "";

    let cantidad = 0;

    for (let i = 0; i < auditorias.length; i++) {
        const a = auditorias[i];

        const coincideTexto = a.activo.toLowerCase().includes(texto) ||
            a.responsable.toLowerCase().includes(texto);
        const coincideTipo = tipoFiltro === "" || a.tipo === tipoFiltro;

        if (coincideTexto && coincideTipo) {
            contenedor.appendChild(crearTarjeta(a));
            cantidad++;
        }
    }

    if (cantidad > 0) {
        mensajeVacio.hidden = true;
    } else {
        mensajeVacio.hidden = false;
        if (auditorias.length === 0) {
            mensajeVacio.textContent = "Aún no hay auditorías.";
        } else {
            mensajeVacio.textContent = "Ninguna auditoría coincide con la búsqueda.";
        }
    }
}

inputBuscar.addEventListener("input", mostrarAuditorias);
selectTipo.addEventListener("change", mostrarAuditorias);

mostrarAuditorias();