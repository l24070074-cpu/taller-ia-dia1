// 🖱️ Ejercicio: DOM (Document Object Model)

// 1. Seleccionar elementos
//// Selecciona el botón con id 'btnCambiarColor' y lo guarda en la variable
var btnCambiarColor = document.getElementById('btnCambiarColor');

// Selecciona el elemento con id 'miCaja' y lo guarda en la variable
var miCaja = document.getElementById('miCaja');

// Comprobamos que existen (getElementById devuelve el elemento o null si no existe)
if (!btnCambiarColor) {
  console.warn('No se encontró el botón con id \"btnCambiarColor\"');
}
if (!miCaja) {
  console.warn('No se encontró el elemento con id \"miCaja\"');
}


// 2. Escuchar eventos (Clicks)
// Pídele a la IA: "¿Cómo hago que pase algo cuando hago click en un botón?"

// Seleccionamos también el botón que cambia el texto dentro de la caja
var btnCambiarTexto = document.getElementById('btnCambiarTexto');
if (!btnCambiarTexto) {
  console.warn('No se encontró el botón con id "btnCambiarTexto"');
}

// Ejemplo: añadir un listener al botón de cambiar color.
// addEventListener recibe el nombre del evento ('click') y una función
// que se ejecuta cuando ocurre ese evento.
if (btnCambiarColor && miCaja) {
  btnCambiarColor.addEventListener('click', function () {
    // Cambiamos el color de fondo de la caja a rojo.
    // Nota: en JavaScript la propiedad CSS 'background-color' se escribe 'backgroundColor'.
    miCaja.style.backgroundColor = 'red';
  });
}

// Ejemplo: añadir un listener al botón que cambia el texto de la caja.
if (btnCambiarTexto && miCaja) {
  btnCambiarTexto.addEventListener('click', function () {
    // textContent modifica solo el texto dentro del elemento (sin interpretar HTML)
    miCaja.textContent = '¡Hola DOM!';
  });
}


// 3. Modificar elementos
// Cuando den click en 'Cambiar Color', cambia el color de fondo de la caja a rojo.
// Pídele a la IA: "¿Cómo cambio el estilo background-color de un elemento con JS?"


// Reto:
// Haz que el botón 'Cambiar Texto' cambie lo que dice dentro de la caja por "¡Hola DOM!".
// 