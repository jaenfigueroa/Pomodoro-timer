const aviso = document.getElementById('aviso')
const contenedorTemporizador = document.getElementById('contenedor-temporizador')

const iconoCheck = document.getElementById('icono-check')
const inputNumeros = document.getElementById('input-numeros')

const botonStart = document.getElementById('boton-start')
const botonStop = document.getElementById('boton-stop')
const botonSettings = document.getElementById('boton-settings')
///////////////////////////////////
let minutos = 00
let segundos = 00

let totalInicial
let totalActual

let porcentajeFaltante = 0
///////////////////////////////////
function controlarPantalla() {
  if (segundos == 0) {
    minutos--
    segundos = 60
  }
  segundos--

  actualizarPantalla(minutos, segundos)
  controlarBarra(minutos, segundos)
}

function controlarBarra(minutos, segundos) {
  totalActual = minutos * 60 + segundos
  porcentajeFaltante = (totalActual / totalInicial) * 100

  if (minutos <= 0 && segundos <= 0) {
    stop()
    actualizarBarra(100)
    iconoCheck.style.display = 'inherit'
    inputNumeros.classList.add('oculto')
  } else {
    actualizarBarra(porcentajeFaltante)
  }
}

///////////////////////////////////////////////////////////////////////////////
function obtenerYActualizarDatos() {
  // -si el largo es 5
  // - si tiene dos puntos
  // - si no incluye letras

  let texto = inputNumeros.value

  let largo = texto.length
  let dosPuntos = texto.slice(2, 3)
  let primerValor = +texto.slice(0, 2)
  let segundoValor = +texto.slice(3, 5)

  if (
    largo === 5 &&
    dosPuntos === ':' &&
    typeof primerValor === 'number' &&
    typeof segundoValor === 'number'
  ) {
    minutos = primerValor
    segundos = segundoValor

    return true
  } else {
    moverInput()

    aviso.style.display = 'flex'
    return false
  }
}

function actualizarPantalla(x, y) {
  inputNumeros.value = `${('0' + x).slice(-2)}:${('0' + y).slice(-2)}`
}

function actualizarBarra(numero) {
  contenedorTemporizador.style.background = `conic-gradient(from 180deg, var(--color-1) ${numero}%, black ${numero}%)`
}

function cambiarTema(color) {
  contenedorTemporizador.className = `contenedor-temporizador tema-${color}`
}

///////////////////////////////////////////////////////////////////////////////
let intervalo

function start() {
  //ocultar el icono de check, mostrar el input desativado, ocultar el aviso
  iconoCheck.style.display = 'none'
  inputNumeros.classList.remove('oculto')
  aviso.style.display = 'none'

  //obtener los valores del input, actualizar y verificar los valores del js
  let verificacion = obtenerYActualizarDatos()

  //si el temporiador tiene un valor mayor de 0 segundos
  if (verificacion && minutos * 60 + segundos > 0) {
    //desabilitar la edicion
    inputNumeros.disabled = 1
    //ocultar el boton de settings
    botonSettings.disabled = 1

    //generar un nuevo total inicial
    totalInicial = minutos * 60 + segundos

    //cambiar a tema rojo
    cambiarTema('rojo')
    //actualizar la pantalla
    actualizarPantalla(minutos, segundos)

    //ocultar el boton start y mostrar el boton stop
    botonStart.classList.remove('visible')
    botonStop.classList.add('visible')

    // //disminuir los segundos y minutos, cada segundo que pase
    intervalo = setInterval(controlarPantalla, 1000)
  } else {
    moverInput()
  }
}

function moverInput() {
  inputNumeros.classList.add('girar')

  setTimeout(() => {
    inputNumeros.classList.remove('girar')
  }, 400)
}

///////////////////////////////////////////////////////////////////////////////
function stop() {
  //mostrar el boton de configuracion
  botonSettings.disabled = 0

  //cambiar a tema verde
  cambiarTema('verde')

  //ocultar el boton stop y mostrar el boton start
  botonStop.classList.remove('visible')
  botonStart.classList.add('visible')
  //parar el proceso de disminuir el contador
  clearInterval(intervalo)
}

///////////////////////////////////////////////////////////////////////////////
function abrirConfiguracion() {
  //ocultar el icono de check
  iconoCheck.style.display = 'none'
  //mostrar y habilitar edicion de los numeros
  inputNumeros.classList.remove('oculto')
  inputNumeros.disabled = 0
  //ocultar el boton de settings
  botonSettings.disabled = 1
}
