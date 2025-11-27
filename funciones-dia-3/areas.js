
function areaCirculo(radio) {
    if (typeof radio !== 'number' || isNaN(radio) || radio < 0) {
        throw new TypeError('El radio debe ser un número no negativo');
    }
    return Math.PI * radio * radio;
}

module.exports = areaCirculo;

/**
 * Calcula el área de un rectángulo a partir de su base y altura.
 *
 * Esta función valida que ambos parámetros sean números finitos y no negativos
 * antes de realizar el cálculo. Si algún parámetro no cumple las condiciones,
 * lanza un TypeError con un mensaje descriptivo.
 *
 * @param {number} base - Longitud de la base del rectángulo. Debe ser un número finito >= 0.
 * @param {number} altura - Altura del rectángulo. Debe ser un número finito >= 0.
 * @returns {number} El área del rectángulo (base * altura).
 * @throws {TypeError} Si `base` o `altura` no son números válidos (incluye NaN) o si son negativos.

function areaRectangulo(base, altura) {
    if (typeof base !== 'number' || isNaN(base) || base < 0) {
        throw new TypeError('La base debe ser un número no negativo');
    }
    if (typeof altura !== 'number' || isNaN(altura) || altura < 0) {
        throw new TypeError('La altura debe ser un número no negativo');
    }
    return base * altura;
}

module.exports = { areaCirculo, areaRectangulo };
//crea una funcion para calcular una derivada de una funcipon polinomial  de la forma ax^n dada su constante a y su exponente n
/**
 * Calcula la derivada de una función polinomial de la forma a * x^n.
 *
 * Valida que `a` y `n` sean números finitos. Devuelve un objeto con el
 * coeficiente y exponente de la derivada (a*n, n-1) y un método `evaluar`
 * para obtener el valor de la derivada en un punto x.
 *
 * @param {number} a - Constante multiplicativa (coeficiente).
 * @param {number} n - Exponente.
 * @returns {{coef:number, exponente:number, evaluar:function}} Objeto con la derivada.
 * @throws {TypeError} Si `a` o `n` no son números finitos.
 */
function derivadaPolinomio(a, n) {
    if (typeof a !== 'number' || !isFinite(a) || isNaN(a)) {
        throw new TypeError('El coeficiente `a` debe ser un número finito');
    }
    if (typeof n !== 'number' || !isFinite(n) || isNaN(n)) {
        throw new TypeError('El exponente `n` debe ser un número finito');
    }

    const coef = a * n;
    const exponente = n - 1;

    return {
        coef,
        exponente,
        evaluar(x) {
            if (typeof x !== 'number' || !isFinite(x) || isNaN(x)) {
                throw new TypeError('El valor `x` debe ser un número finito');
            }
            // Si el coeficiente es 0, la derivada es la función nula
            if (coef === 0) return 0;
            return coef * Math.pow(x, exponente);
        }
    };
}

module.exports.derivadaPolinomio = derivadaPolinomio;
/**
 * Calcula la integral indefinida de una función polinomial de la forma a * x^n.
 *
 * Valida que `a` y `n` sean números finitos. Para n === -1 lanza un TypeError
 * (la integral es a * ln|x| y requiere tratamiento distinto).
 *
 * Devuelve un objeto con el coeficiente y exponente de la primitiva (a/(n+1), n+1),
 * un método `evaluar(x)` que retorna la primitiva en x (sin constante de integración)
 * y un método `definida(limInf, limSup)` que calcula la integral definida entre dos límites.
 *
 * @param {number} a - Constante multiplicativa (coeficiente).
 * @param {number} n - Exponente.
 * @returns {{coef:number, exponente:number, evaluar:function, definida:function}} Objeto con la primitiva.
 * @throws {TypeError} Si `a` o `n` no son números finitos, o si n === -1.
 */
function integralPolinomio(a, n) {
    if (typeof a !== 'number' || !isFinite(a) || isNaN(a)) {
        throw new TypeError('El coeficiente `a` debe ser un número finito');
    }
    if (typeof n !== 'number' || !isFinite(n) || isNaN(n)) {
        throw new TypeError('El exponente `n` debe ser un número finito');
    }
    if (n === -1) {
        throw new TypeError('La integral de ax^-1 es a * ln|x|; el caso n = -1 debe manejarse por separado');
    }

    const exponente = n + 1;
    const coef = a / exponente;

    return {
        coef,
        exponente,
        evaluar(x) {
            if (typeof x !== 'number' || !isFinite(x) || isNaN(x)) {
                throw new TypeError('El valor `x` debe ser un número finito');
            }
            return coef * Math.pow(x, exponente);
        },
        definida(limInf, limSup) {
            if (typeof limInf !== 'number' || !isFinite(limInf) || isNaN(limInf)) {
                throw new TypeError('El límite inferior debe ser un número finito');
            }
            if (typeof limSup !== 'number' || !isFinite(limSup) || isNaN(limSup)) {
                throw new TypeError('El límite superior debe ser un número finito');
            }
            return coef * (Math.pow(limSup, exponente) - Math.pow(limInf, exponente));
        }
    };
}


