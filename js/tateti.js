var tabla = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];

var jugador = 1;

function marcar(cuadradito) {
    console.log('se hace clic en el boton ', cuadradito);

    console.log('jugador es: ' + jugador)

    if (this.tabla[cuadradito] != 0) {
        deshabilitarBoton(cuadradito);
    } else {
        tabla[cuadradito] = jugador;
    }
    console.log('turno jugador: ', jugador)

    jugador = (jugador == 1) ? 2 : 1

    console.log('la tabla es: ', tabla)
    refreshUI()
}

function refreshUI() {
    tabla.forEach((val, index, table) => {
        document.getElementById("" + index).innerText = "" + val
    });
}

function deshabilitarBoton(idBoton) {
    document.getElementById('idBoton').disabled = true;
}

function tatetiLogrado() {

}