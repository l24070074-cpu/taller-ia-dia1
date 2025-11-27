// Calculadora CLI sencilla (suma, resta, multiplicación, división)
// Usa sintaxis clásica de JavaScript (sin ES6) y comentarios línea por línea

// Necesitamos una librería para pedir entrada síncrona en la terminal.
// Instalación (ejecutar antes en PowerShell):
//   npm install readline-sync
// O si creé un package.json, ejecutar: npm install
var readline = null;
try {
  // Intentamos cargar readline-sync (bloqueante, facilita el uso de while)
  readline = require('readline-sync');
} catch (e) {
  console.log('ERROR: falta la dependencia "readline-sync".');
  console.log('Instálala ejecutando: npm install readline-sync');
  // Salimos con código de error para que el usuario instale la dependencia
  process.exit(1);
}

// Función para leer un número desde la consola con validación usando bucle while
function leerNumero(mensaje) {
  // variable para almacenar el valor leído (como cadena inicialmente)
  var entrada = null;
  // variable para almacenar el número convertido
  var numero = NaN;
  // Mientras la conversión no produzca un número válido, seguimos preguntando
  while (true) {
    // Pedimos al usuario que escriba un número
    entrada = readline.question(mensaje);
    // Intentamos convertir la entrada a número (acepta decimales)
    numero = parseFloat(entrada);
    // Si la conversión produce un número válido, salimos del bucle
    if (!isNaN(numero)) {
      break;
    }
    // Si llegamos aquí, la entrada no era un número: mostramos error y repetimos
    console.log('Entrada no válida. Por favor escribe un número (ej: 3.14 o 2).');
  }
  // Devolvemos el número válido
  return numero;
}

// Bucle principal del programa: mostramos un menú y repetimos hasta que el usuario salga
while (true) {
  // Mostramos las opciones al usuario
  console.log('\n--- Calculadora ---');
  console.log('1) Sumar');
  console.log('2) Restar');
  console.log('3) Multiplicar');
  console.log('4) Dividir');
  console.log('5) Salir');

  // Leemos la opción elegida (como número) y validamos con while
  var opcion = leerNumero('Elige una opción (1-5): ');
  // Forzamos a entero para comparar
  opcion = Math.floor(opcion);

  if (opcion === 5) {
    // Si elige 5, salimos del programa
    console.log('Saliendo. ¡Hasta luego!');
    break;
  }

  // Validamos que la opción esté en el rango permitido
  if (opcion < 1 || opcion > 4) {
    console.log('Opción inválida. Elige de 1 a 5.');
    // Volvemos al inicio del while principal
    continue;
  }

  // Para las operaciones pedimos dos números (usamos la función con bucle while interno)
  var a = leerNumero('Número 1: ');
  var b = leerNumero('Número 2: ');

  // Ejecutamos la operación seleccionada y mostramos el resultado
  var resultado = null;
  if (opcion === 1) {
    // Suma
    resultado = a + b;
    console.log('Resultado: ' + a + ' + ' + b + ' = ' + resultado);
  } else if (opcion === 2) {
    // Resta
    resultado = a - b;
    console.log('Resultado: ' + a + ' - ' + b + ' = ' + resultado);
  } else if (opcion === 3) {
    // Multiplicación
    resultado = a * b;
    console.log('Resultado: ' + a + ' * ' + b + ' = ' + resultado);
  } else if (opcion === 4) {
    // División: validamos división por cero usando un bucle while
    while (b === 0) {
      console.log('Error: no se puede dividir por cero.');
      // Si el divisor es cero, pedimos otro número (se repetirá hasta que sea distinto de cero)
      b = leerNumero('Ingresa un divisor distinto de cero: ');
    }
    resultado = a / b;
    console.log('Resultado: ' + a + ' / ' + b + ' = ' + resultado);
  }

  // Después de mostrar resultado, el bucle principal se repite y se muestra el menú otra vez
}

// Fin del programa