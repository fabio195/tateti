var tabla = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

var jugador = 1;
var nombreJugador1;
var nombreJugador2;
var row = 0
var col = 0

function marcar(fila, columna) {

    switch (fila) {
        case 0:
            tabla[0][columna] = jugador;
            break;
        case 1:
            tabla[1][columna] = jugador;
            break;
        case 2:
            tabla[2][columna] = jugador;
            break;
        default:
            break;
    }
    console.log(tabla)
    deshabilitarBoton(fila, columna)
    jugador = (jugador == 1) ? 2 : 1
    refreshUI()

}

function guardarJugador1() {
    nombreJugador1 = document.getElementById('nombJugador1').value;
    getTurno()
}

function guardarJugador2() {
    nombreJugador2 = document.getElementById('nombJugador2').value;
}

function refreshUI() {
    // for (var i = 0; i < 3; i++) {
    //     for (var j = 0; i < 3; i++) {
    //         document.getElementById("" + row + col).innerText = ""
    //     }
    // }
    // tabla.forEach((val, index, table) => {
    //     document.getElementById("" + index).innerText = "" + val
    // });
    document.getElementById('nombJugador1').innerText = "" + this.nombreJugador1
    document.getElementById('nombJugador2').innerText = "" + this.nombreJugador2
    getTurno()
}

function getTurno() {
    if (jugador == 1) {
        document.getElementById('turnoJugador').innerText = "Juega: " + nombreJugador1
    } else {
        if (jugador == 2) {
            document.getElementById('turnoJugador').innerText = "Juega: " + nombreJugador2
        }
    }

}

function deshabilitarBoton(fila, columna) {
    var idDeshabilitar = fila + '' + columna
    console.log('deshabilitar: ', idDeshabilitar)
    document.getElementById("" + idDeshabilitar).disabled = true;
}

function tatetiLogrado() {

}