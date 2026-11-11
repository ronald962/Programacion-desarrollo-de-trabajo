let auditorias = [];
let siguienteId = 1;
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

    const activo = inputActivo.value.trim();
    const responsable = inputResponsable.value.trim();
    const fecha = inputFecha.value;
    const tipoLista = selectLista.value;

    if (activo === "" || responsable === "" || fecha === "" || tipoLista === "") {
        mensaje.textContent = "Completa todos los campos.";
        return;
    }
    mensaje.textContent = "";

    if (idEditando === null) {
        const nueva = {
            id: siguienteId,
            activo: activo,
            responsable: responsable,
            fecha: fecha,
            tipo: tipoLista,
            cerrada: false,
            controles: crearControles(tipoLista)
        };
        siguienteId++;
        auditorias.push(nueva);
        formulario.reset();
    } else {
        const posicion = buscarPosicion(idEditando);
        auditorias[posicion].activo = activo;
        auditorias[posicion].responsable = responsable;
        auditorias[posicion].fecha = fecha;
        terminarEdicion();
    }

    mostrarAuditorias();
});

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

function eliminarAuditoria(id) {
    const posicion = buscarPosicion(id);
    const quiere = confirm("¿Seguro que quieres eliminar \"" + auditorias[posicion].activo + "\"?");

    if (quiere === false) {
        return;
    }

    auditorias.splice(posicion, 1);

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
        controles: crearControles(original.tipo)
    };
    siguienteId++;
    auditorias.push(copia);

    mostrarAuditorias();
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

    const botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.textContent = "Editar";
    botonEditar.addEventListener("click", function () {
        editarAuditoria(a.id);
    });
    tarjeta.appendChild(botonEditar);

    const botonDuplicar = document.createElement("button");
    botonDuplicar.type = "button";
    botonDuplicar.textContent = "Duplicar";
    botonDuplicar.addEventListener("click", function () {
        duplicarAuditoria(a.id);
    });
    tarjeta.appendChild(botonDuplicar);

    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", function () {
        eliminarAuditoria(a.id);
    });
    tarjeta.appendChild(botonEliminar);

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