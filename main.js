const contenedorTemporizador = document.getElementById('contenedor-temporizador')

const tiempo = document.getElementById('tiempo')
const botonStart = document.getElementById('boton-start')
const botonStop = document.getElementById('boton-stop')
const botonSettings = document.getElementById('boton-settings')

const inputNumeros = document.getElementById('input-numeros')
///////////////////////////////////
const seg = 60

let minutos = 00
let segundos = 10

let totalInicial = (minutos * seg) + segundos
let totalActual

let pocentajeFaltante = 0
///////////////////////////////////
function disminuir() {

  ///////////////////////////
  if (segundos == 0) {
    minutos--
    segundos = 60
  }
  segundos--

  //controlar los numeros
  let numeros = `${("0" + minutos).slice(-2)}:${("0" + segundos).slice(-2)}`
  tiempo.textContent = numeros

  cambiarTamanoBorde(minutos, segundos, pocentajeFaltante)
}

//controlar tamaño borde rojo/////////////////
function cambiarTamanoBorde(minutos, segundos, porcentaje) {
  //controlar el borde rojo
  totalActual = (minutos * 60) + segundos
  pocentajeFaltante = (totalActual / totalInicial) * 100

  if (minutos <= 0 && segundos <= 0) {
    stop()
    cambiarBarra(100)
  } else {
    cambiarBarra(pocentajeFaltante)
  }
}

function cambiarBarra(numero) {
  contenedorTemporizador.style.background = `
  conic-gradient(from 180deg, 
  var(--color-1) ${numero}%, black ${numero}%)
  `
}
///modificar valores////////////////////
function actualizarDatos() {
  let string = inputNumeros.value
  let primerNumero = Number(string.slice(0, 2)) || minutos
  let segundoNumero = Number(string.slice(3, 5)) || segundos

  minutos = primerNumero
  segundos = segundoNumero


  return {
    minutos, segundos
  }
}

function cambiarNumeros(x, y) {
  tiempo.textContent = `${("0" + x).slice(-2)}:${("0" + y).slice(-2)}`
}
/////////////////////////////////////
let intervalo


function start() {

  cambiarBarra(100)
  let { minutos, segundos } = actualizarDatos()
  cambiarNumeros(minutos, segundos)


  contenedorTemporizador.className = 'contenedor-temporizador tema-rojo'

  botonStop.classList.add('visible')
  botonStart.classList.remove('visible')

  inputNumeros.classList.remove('editable')
  tiempo.classList.remove('oculto')



  intervalo = setInterval(disminuir, 1000);
}

function stop() {
  contenedorTemporizador.className = 'contenedor-temporizador tema-verde'

  botonStop.classList.remove('visible')
  botonStart.classList.add('visible')

  inputNumeros.textContent = `${("0" + minutos).slice(-2)}:${("0" + segundos).slice(-2)}`

  clearInterval(intervalo)
}


botonSettings.addEventListener('click', () => {
  inputNumeros.classList.toggle('editable')
  tiempo.classList.toggle('oculto')

  inputNumeros.value = tiempo.textContent
})