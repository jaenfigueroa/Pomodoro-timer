const contenedorTemporizador = document.getElementById(
  'contenedor-temporizador'
)

const pantalla = document.getElementById('pantalla')
const botonStart = document.getElementById('boton-start')
const botonStop = document.getElementById('boton-stop')
const botonSettings = document.getElementById('boton-settings')

const inputNumeros = document.getElementById('input-numeros')
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
  } else {
    actualizarBarra(porcentajeFaltante)
  }
}

/////////////////////////////////////////////
/////////////////////////////////////////////
function obtenerYActualizarDatos() {
  let string = inputNumeros.value
  let primerValor = Number(string.slice(0, 2)) || minutos
  let segundoValor = Number(string.slice(3, 5)) || segundos

  minutos = primerValor
  segundos = segundoValor
}

function actualizarPantalla(x, y) {
  pantalla.textContent = `${('0' + x).slice(-2)}:${('0' + y).slice(-2)}`
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

function start() {
  //obtener los valores del input y actualizar valores del js
  obtenerYActualizarDatos()

  //si el temporiador tiene un valor mayor de 0 segundos
  if (minutos * 60 + segundos > 0) {
    //copiar el valor del input a la pantalla
    igualarValores(false)

    //ocultar el boton de configuracion
    botonSettings.disabled = 1

    //generar un nuevo total inicial
    totalInicial = minutos * 60 + segundos

    //cambiar a tema rojo
    cambiarTema('rojo')
    //actualizar la pantalla
    actualizarPantalla(minutos, segundos)

    //ocultar el input y mostrar la pantalla
    inputNumeros.classList.remove('visible')
    pantalla.classList.remove('oculto')

    //ocultar el boton start y mostrar el boton stop
    botonStart.classList.remove('visible')
    botonStop.classList.add('visible')

    //disminuir los segundos y minutos, cada segundo que pase
    intervalo = setInterval(controlarPantalla, 1000)
  } else {
    pantalla.classList.add('girar')

    setTimeout(() => {
      pantalla.classList.remove('girar')
    }, 1000)
  }
}

function stop() {
  igualarValores(true)

  //mostrar el boton de configuracion
  botonSettings.disabled = 0

  //cambiar a tema verde
  cambiarTema('verde')
  //copiar el contenido de pantalla al input editable
  inputNumeros.textContent = pantalla.textContent
  //ocultar el boton stop y mostrar el boton start
  botonStop.classList.remove('visible')
  botonStart.classList.add('visible')
  //parar el proceso de disminuir el contador
  clearInterval(intervalo)
}

//////////////////////////////////
let direccion = true //true significa PANTALLA A INPUT (INPUT OCULTO)

function abrirConfiguracion() {
  //ocultar el boton de settings
  botonSettings.disabled = 1

  //copiar el valor de la pantalla al input
  igualarValores(true)

  //alternar entre -> la pantalla y el input
  pantalla.classList.toggle('oculto')
  inputNumeros.classList.toggle('visible')
}

function igualarValores(direccion) {
  console.log('-------------------------------')
  console.log('pantalla antes', pantalla.textContent)
  console.log('inputNumeros antes', inputNumeros.value)

  if (direccion) {
    //copiar el valor de pantalla al input
    inputNumeros.value = pantalla.textContent

    console.log('se ejecuto:', direccion)
    direccion = true
  } else {
    //copiar el valor del input a pantalla
    pantalla.textContent = inputNumeros.value

    console.log('se ejecuto:', direccion)
    direccion = false
  }

  console.log('pantalla despues', pantalla.textContent)
  console.log('inputNumeros despues', inputNumeros.value)
}
