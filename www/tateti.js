var tabla = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

var jugador = 1;
var nombreJugador1;
var nombreJugador2;
var ganador

function juegoNuevo() {
    tabla = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    jugador = 1
    nombreJugador1 = ""
    nombreJugador2 = ""
    ganador = undefined

    document.getElementById('nombJugador1').value = nombreJugador1
    document.getElementById('nombJugador2').value = nombreJugador2
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            document.getElementById('' + i + j).classList.remove('player1', 'player2')
        }
    }
    document.getElementById('turnoJugador').innerText = ''
    document.getElementById('ganador').innerText = ''
}

function marcar(fila, columna) {
    if (tatetiLogrado()) {
        return
    }

    if (tabla[fila][columna] != 0) {
        return
    }

    tabla[fila][columna] = jugador;

    if (tatetiLogrado()) {
        refreshUI()
        crearJSON()
        return
    } else {
        jugador = (jugador == 1) ? 2 : 1
        refreshUI()
    }

}

function guardarJugador1() {
    nombreJugador1 = document.getElementById('nombJugador1').value;
    getTurno()
}

function guardarJugador2() {
    nombreJugador2 = document.getElementById('nombJugador2').value;
}

function refreshUI() {
    document.getElementById('nombJugador1').innerText = "" + this.nombreJugador1
    document.getElementById('nombJugador2').innerText = "" + this.nombreJugador2

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var valor = tabla[i][j]
            if (value = 1) {
                document.getElementById('' + i + j).classList.add('player' + valor)
            } else {
                document.getElementById('' + i + j).classList.add('player' + valor)
            }
        }
    }

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

function tatetiLogrado() {
    for (i = 0; i < 3; i++) {
        if (tabla[i][0] === jugador && tabla[i][1] === jugador && tabla[i][2] === jugador) {
            ganador = (jugador == 1) ? nombreJugador1 : nombreJugador2;
            document.getElementById('ganador').innerText = 'El ganador es: ' + ganador
            return true
        }
        if (tabla[0][i] === jugador && tabla[1][i] === jugador && tabla[2][i] === jugador) {
            ganador = (jugador == 1) ? nombreJugador1 : nombreJugador2;
            document.getElementById('ganador').innerText = 'El ganador es: ' + ganador
            return true
        }
    }

    if (tabla[0][0] == jugador && tabla[1][1] == jugador && tabla[2][2] == jugador) {
        ganador = (jugador == 1) ? nombreJugador1 : nombreJugador2;
        document.getElementById('ganador').innerText = 'El ganador es: ' + ganador
        return true
    }

    if (tabla[0][2] == jugador && tabla[1][1] == jugador && tabla[2][0] == jugador) {
        ganador = (jugador == 1) ? nombreJugador1 : nombreJugador2;
        document.getElementById('ganador').innerText = 'El ganador es: ' + ganador
        return true
    }

    return false
}

var contador = 1;

function crearJSON() {

    var partida = new Object();
    partida.numero = contador++;
    partida.fecha = new Date().toLocaleDateString();
    partida.jugador1 = nombreJugador1;
    partida.jugador2 = nombreJugador2;
    partida.resultado = tabla.toString();
    partida.ganador = ganador;

    var jugada = JSON.stringify(partida);

    guardarPartida(jugada);
}

function guardarPartida(jugada) {
    $.ajax({
        url: '/guardarTateti',
        type: 'POST',
        data: jugada,
        dataType: 'json',
    })
}

function navegarVerHistorial() {

    return new Promise(resolve => {
        $(document).ready(function() {

            $.ajax({
                url: '/verHistorial',
                type: 'GET',
                error: function(error) {
                    console.log(`Error ${error}`)
                }
            }).then(function(verHistorialHtml) {
                resolve(verHistorialHtml)
            });
        });
    });
}

async function navegarVerHistorialAsync() {
    await navegarVerHistorial()
    window.open('/verHistorial')
}

function traerHistorialServer() {
    return new Promise(resolve => {
        $(document).ready(function() {

            $.ajax({
                url: '/traerHistorial',
                type: 'GET',
                error: function(error) {
                    console.log(`Error ${error}`)
                }
            }).then(function(historialServer) {
                resolve(historialServer)
            });
        });
    });
}

var historialJson = []

async function traerHistorialServerAsync() {
    var historial = await traerHistorialServer();
    // historial = JSON.parse(historial)

    // console.log('historial es arreglo?: ', historial)


    historialJson.push(historial)
    historialJson = JSON.parse(historialJson)
    historialJson.join(',')
    console.log('historialjson: ', historialJson)
    armarUI()
    return historialJson
}

function armarUI() {

    var largo = historialJson.length
    console.log('largo = ', largo)

    for (var i = 0; i < largo; i++) {
        document.getElementById('h_partidaNumero' + i).innerText = 'Partida Numero: ' + historialJson[i].numero
        document.getElementById('h_nombreJugador1').innerText = 'Jugador 1: ' + historialJson[i].jugador1
        document.getElementById('h_nombreJugador2').innerText = 'Jugador 2: ' + historialJson[i].jugador2
        document.getElementById('h_ganador').innerText = 'Ganador: ' + historialJson[i].ganador
        document.getElementById('h_resultado').innerText = 'Resultado: ' + historialJson[i].resultado
        document.getElementById('h_fecha').innerText = 'Fecha: ' + historialJson[i].fecha
    }


}