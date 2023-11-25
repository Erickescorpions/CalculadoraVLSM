//console.log("Hola mundo");

const tablaSubredes = document.getElementById("tabla-subredes");
const tbodyTablaSub = document.getElementById("subredes-tbody");
const botonSubredes = document.getElementById("boton-subredes");
const botonSubmit = document.getElementById("boton-submit");
const prefijo = document.getElementById("prefijo");

let filaIndex = 1;

botonSubredes.addEventListener('click', (e) => {
    e.preventDefault();
    //console.log("Se presiono el boton");

    if (tbodyTablaSub.childElementCount === 1) {
        let fila = tbodyTablaSub.children;
        if(fila[0].querySelectorAll('input').length == 0) {
            fila[0].remove();
        }
    }


    let nombreSubred = document.createElement("td");
    let hostsSubred =  document.createElement("td");
    let botonSubredes = document.createElement("td");
    let fila = document.createElement("tr");

    nombreSubred.innerHTML = '<input type="text" class="form-control" placeholder="Ingresa el nombre de la subred">';
    hostsSubred.innerHTML = '<input type="number" class="form-control" placeholder="Ingresa los hosts de la subred" value="0">';
    botonSubredes.innerHTML = `<button class="btn btn-danger" onclick="eliminarFila(event, ${filaIndex});">Eliminar</button>`;

    fila.id = "fila" + filaIndex;
    filaIndex++;
    fila.appendChild(nombreSubred);
    fila.appendChild(hostsSubred);
    fila.appendChild(botonSubredes);
    tbodyTablaSub.appendChild(fila);
});


function eliminarFila(event, index) {
    event.preventDefault();
    //console.log(index);
    document.getElementById("fila" + index).remove();

    if (tbodyTablaSub.childElementCount === 0) {
        // Crear la fila sin subredes
        let filaSinSubredes = document.createElement("tr");
        
        // Agregar clases de Bootstrap para estilos
        filaSinSubredes.classList.add("table-warning");
    
        // Crear y agregar celda con el mensaje
        let celdaMensaje = document.createElement("td");
        celdaMensaje.colSpan = 3;
        celdaMensaje.classList.add("text-center");
        celdaMensaje.textContent = "No se ha registrado ninguna subred";
        filaSinSubredes.appendChild(celdaMensaje);
    
        // Agregar la fila al tbody
        tbodyTablaSub.appendChild(filaSinSubredes);
    
        console.log("El tbody no tiene hijos.");
    }
}

let primerOcteto = 0;
let segundoOcteto = 0;
let tercerOcteto = 0;
let cuartoOcteto = 0;

let datosSubred = [];
let subredes = [];

function decimalToBinary(decimal) {
    // Verificar si la entrada es un número
    if (isNaN(decimal)) {
        return "Error: Ingresa un número decimal válido.";
    }
  
    // Verificar si el número es entero
    if (!Number.isInteger(decimal)) {
        return "Error: Ingresa un número decimal entero.";
    }
  
    // Convertir a binario
    return decimal.toString(2);
}

prefijo.addEventListener('change',  (event) => {
    event.preventDefault();

    let binario = decimalToBinary(Number(prefijo.value));

    console.log(binario);

    console.log("se modifico el valor del prefijo");
})

function validarDatosRed() {
    datosSubred["segmento_1er"] = document.getElementById("primer_octeto").value;
    datosSubred["segmento_2do"] = document.getElementById("segundo_octeto").value;
    datosSubred["segmento_3er"] = document.getElementById("tercer_octeto").value;
    datosSubred["segmento_4to"] = document.getElementById("cuarto_octeto").value;
    datosSubred["prefijo"] = document.getElementById("prefijo").value;

    if(datosSubred["segmento_1er"] == 0) {
        document.getElementById("error-segmento").innerHTML = "Ingresa valores correctos para las subredes A, B o C. </br>";
        document.getElementById("error-segmento").style.display = 'block';
    }

    if(datosSubred["prefijo"] == 0) {
        document.getElementById("error-segmento").innerHTML += "Ingresa un prefijo para la red </br>";
        document.getElementById("error-segmento").style.display = 'block';
    }


    console.log(datosSubred);
}

botonSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    validarDatosRed();

    document.getElementById('errorAlert').style.display = 'none';
    let filas = tbodyTablaSub.children;

    if(filas.length == 1) {
        if(filas[0].querySelectorAll('input').length == 0) {
            document.getElementById('errorAlert').style.display = 'block';
            document.getElementById('errorAlert').innerHTML = 'Se necesitan subredes para hacer el calculo, registre nuevas subredes en la tabla.'
            return;
        }
    }

    for (let i = 0; i < filas.length; i++) {
        let fila = filas[i];

        // Obtiene todos los inputs dentro de la fila
        var inputs = fila.querySelectorAll('input');
        let nombre = inputs[0].value;
        let hosts = inputs[1].value;

        if(nombre == "" || hosts == 0) {
            continue;
        }
        
        subredes.push({
            nombre: inputs[0].value,
            hosts: inputs[1].value
        });
    }

    console.log(subredes);
});


function ordenarPorHosts() {

}