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
const selectEstadoFiltro = document.getElementById("filtro-estado");
const selectOrden = document.getElementById("orden");
const botonEjemplos = document.getElementById("btn-ejemplos");
const botonExportar = document.getElementById("btn-exportar");
const mensajeHerramientas = document.getElementById("mensaje-herramientas");
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


// ---------- DATOS DE EJEMPLO y EXPORTACIÓN ----------

botonEjemplos.addEventListener("click", function () {
    const ejemplos = crearEjemplos(siguienteId);
    siguienteId += ejemplos.length;

    for (let i = 0; i < ejemplos.length; i++) {
        auditorias.push(ejemplos[i]);
    }

    guardarAuditorias(auditorias);
    mostrarAuditorias();
    mensajeHerramientas.textContent = "Se cargaron " + ejemplos.length + " auditorías de ejemplo.";
    mensajeHerramientas.className = "estado-exito";
});

botonExportar.addEventListener("click", function () {
    if (auditorias.length === 0) {
        mensajeHerramientas.textContent = "No hay auditorías para exportar.";
        mensajeHerramientas.className = "";
        return;
    }

    const texto = JSON.stringify(auditorias, null, 2);
    const archivo = new Blob([texto], { type: "application/json" });
    const direccion = URL.createObjectURL(archivo);

    const enlace = document.createElement("a");
    enlace.href = direccion;
    enlace.download = "auditorias-hardening.json";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(direccion);

    mensajeHerramientas.textContent = "Se exportaron " + auditorias.length + " auditorías en JSON.";
    mensajeHerramientas.className = "estado-exito";
});


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
    estado.textContent = a.cerrada ? "Estado: Cerrada" : "Estado: Abierta";
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

function ordenarLista(lista, criterio) {
    const copia = lista.slice();

    copia.sort(function (a, b) {
        if (criterio === "fecha-asc") {
            return a.fecha < b.fecha ? -1 : (a.fecha > b.fecha ? 1 : 0);
        }
        if (criterio === "nombre") {
            return a.activo.localeCompare(b.activo, "es");
        }
        if (criterio === "avance") {
            return calcularAvance(b.controles).porcentaje - calcularAvance(a.controles).porcentaje;
        }
        return a.fecha < b.fecha ? 1 : (a.fecha > b.fecha ? -1 : 0);
    });

    return copia;
}

function mostrarResumen() {
    let abiertas = 0;
    let cerradas = 0;
    let porTipo = { so: 0, web: 0, red: 0 };
    let sumaAvance = 0;

    for (let i = 0; i < auditorias.length; i++) {
        const a = auditorias[i];
        if (a.cerrada) {
            cerradas++;
        } else {
            abiertas++;
        }
        porTipo[a.tipo]++;
        sumaAvance += calcularAvance(a.controles).porcentaje;
    }

    let promedio = 0;
    if (auditorias.length > 0) {
        promedio = Math.round(sumaAvance / auditorias.length);
    }

    document.getElementById("res-total").textContent = auditorias.length;
    document.getElementById("res-abiertas").textContent = abiertas;
    document.getElementById("res-cerradas").textContent = cerradas;
    document.getElementById("res-so").textContent = porTipo.so;
    document.getElementById("res-web").textContent = porTipo.web;
    document.getElementById("res-red").textContent = porTipo.red;
    document.getElementById("res-promedio").textContent = promedio + " %";
}

function mostrarAuditorias() {
    const texto = inputBuscar.value.trim().toLowerCase();
    const tipoFiltro = selectTipo.value;
    const estadoFiltro = selectEstadoFiltro.value;

    contenedor.textContent = "";

    const ordenadas = ordenarLista(auditorias, selectOrden.value);
    let cantidad = 0;

    for (let i = 0; i < ordenadas.length; i++) {
        const a = ordenadas[i];

        const coincideTexto = a.activo.toLowerCase().includes(texto) ||
            a.responsable.toLowerCase().includes(texto);
        const coincideTipo = tipoFiltro === "" || a.tipo === tipoFiltro;
        const coincideEstado = estadoFiltro === "" ||
            (estadoFiltro === "cerrada") === a.cerrada;

        if (coincideTexto && coincideTipo && coincideEstado) {
            contenedor.appendChild(crearTarjeta(a));
            cantidad++;
        }
    }

    if (cantidad > 0) {
        mensajeVacio.hidden = true;
    } else {
        mensajeVacio.hidden = false;
        if (auditorias.length === 0) {
            mensajeVacio.textContent = "Aún no hay auditorías. Crea una o carga los datos de ejemplo.";
        } else {
            mensajeVacio.textContent = "Ninguna auditoría coincide con la búsqueda.";
        }
    }

    mostrarResumen();
}

inputBuscar.addEventListener("input", mostrarAuditorias);
selectTipo.addEventListener("change", mostrarAuditorias);
selectEstadoFiltro.addEventListener("change", mostrarAuditorias);
selectOrden.addEventListener("change", mostrarAuditorias);

mostrarAuditorias();