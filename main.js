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

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
function obtenerYActualizarDatos() {
  let string = inputNumeros.value
  let primerValor = Number(string.slice(0, 2)) || minutos
  let segundoValor = Number(string.slice(3, 5)) || segundos

  minutos = primerValor
  segundos = segundoValor

  console.log(primerValor)
  console.log(segundoValor)
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

/////////////////////////////////////////////
/////////////////////////////////////////////
let intervalo
//////////////////////////////////////////
//////////////////////////////////////////
function start() {
  console.log('se hizo click en start')

  //obtener los valores del input y actualizar valores del js
  obtenerYActualizarDatos()

  //ocultar el icono de check y mostrar el input desativado
  iconoCheck.style.display = 'none'
  inputNumeros.classList.remove('oculto')

  //si el temporiador tiene un valor mayor de 0 segundos
  if (minutos * 60 + segundos > 0) {
    console.log('el valor es mayor de 0 segundos')

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
    console.log('el valor es menor de 0 segundos')

    inputNumeros.classList.add('girar')

    setTimeout(() => {
      inputNumeros.classList.remove('girar')
    }, 400)
  }
}

/////////////////////////////////////////////
/////////////////////////////////////////////
function stop() {
  console.log('se hizo stop')
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
//////////////////////////////////////////
//////////////////////////////////////////
function abrirConfiguracion() {
  //ocultar el icono de check
  iconoCheck.style.display = 'none'
  //mostrar y habilitar edicion de los numeros
  inputNumeros.classList.remove('oculto')
  inputNumeros.disabled = 0
  //ocultar el boton de settings
  botonSettings.disabled = 1
}
