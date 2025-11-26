// escribe un saludo en la consola
console.log("hola usario");
//¿Qué es un commit y por qué es importante?"

// Definimos una función llamada 'sumar' que recibe dos parámetros: a y b
function sumar(a, b) {
  // Convertimos el primer parámetro a número (por si viene como texto)
  var numA = Number(a);
  // Convertimos el segundo parámetro a número
  var numB = Number(b);
  // Si cualquiera de las conversiones no produce un número válido, devolvemos NaN
  if (isNaN(numA) || isNaN(numB)) {
    // Devolvemos NaN para indicar que la operación no es válida con esos valores
    return NaN;
  }
  // Realizamos la suma y guardamos el resultado en una variable
  var resultado = numA + numB;
  // Devolvemos el resultado al quien llamó la función
  return resultado;
}

// Ejemplo de uso:
// Llamamos a la función con dos números y guardamos el resultado
var res1 = sumar(2, 3)