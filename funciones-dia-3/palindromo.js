/**
 * Devuelve true si el texto es palíndromo (ignora mayúsculas, espacios, signos y acentos)
 */
function esPalindromo(texto) {
    texto = String(texto || '');
    const limpio = texto
        .normalize('NFD')                   // separa caracteres y diacríticos
        .replace(/[\u0300-\u036f]/g, '')    // elimina acentos
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');         // mantiene solo letras y números latinos
    const invertido = limpio.split('').reverse().join('');
    return limpio === invertido;
}

module.exports = { esPalindromo };
