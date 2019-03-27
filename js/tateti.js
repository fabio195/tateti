var tabla = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];

var jugador = 1;
var nombreJugador1;
var nombreJugador2;

function marcar(cuadradito) {
    if (this.tabla[cuadradito] != 0) {
        deshabilitarBoton(cuadradito);
    } else {
        tabla[cuadradito] = jugador;
    }
    jugador = (jugador == 1) ? 2 : 1
    refreshUI()
}

function guardarJugador1() {
    nombreJugador1 = document.getElementById('nombJugador1').value;
}

function guardarJugador2() {
    nombreJugador2 = document.getElementById('nombJugador2').value;
}

function refreshUI() {
    tabla.forEach((val, index, table) => {
        document.getElementById("" + index).innerText = "" + val
    });
    document.getElementById('nombJugador1').innerText = "" + this.nombreJugador1
    document.getElementById('nombJugador2').innerText = "" + this.nombreJugador2
}

function deshabilitarBoton(idBoton) {
    document.getElementById('idBoton').disabled = true;
}

function tatetiLogrado() {

}