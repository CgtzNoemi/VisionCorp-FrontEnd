/* const tablaDiaria = {
    colLimiteInferior: [],
    colCuotaFija: [],
    colTasaExcedente: []
}
const tablaSemanal = {
    colLimiteInferior: [],
    colCuotaFija: [],
    colTasaExcedente: []
}
const tablaDecenal = {
    colLimiteInferior: [],
    colCuotaFija: [],
    colTasaExcedente: []
} */
const tablaQuincenal = {
    colLimiteInferior: [0.01,368.11,3124.36,5490.76,6382.81,7641.91,15412.81,24292.66,46378.51,61838.11,185514.31],
    colCuotaFija: [0.00,7.05,183.45,441.00,583.65,809.25,2469.15,4557.75,11183.40,16130.55,58180.35],
    colTasaExcedente: [0.0192,0.0640,0.1088,0.1600,0.1792,0.2136,0.2352,0.3000,0.3200,0.3400,0.3500]
}
const tablaMensual = {
    colLimiteInferior: [0.01,746.05,6332.06,11128.02,12935.83,15487.72,31236.50,49233.01,93993.91,125325.21,375975.62],
    colCuotaFija: [0.00,14.32,371.83,893.63,1182.88,1640.18,5004.12,9236.89,22665.17,32691.18,117912.32],
    colTasaExcedente: [0.0192,0.0640,0.1088,0.1600,0.1792,0.2136,0.2352,0.3000,0.3200,0.3400,0.3500]
}


// Recibe el salario y la tabla del periodo por el que se calcula el impuesto
function calcularRetISR(salario,tabla) {
    const {colLimiteInferior,colCuotaFija,colTasaExcedente} = tabla;
    // Determina en la columna de límite inferior, el elemento menor más cercano al salario
    let limiteInferior = colLimiteInferior.filter(limite => salario >= limite ).pop();
    // Obtiene el índice del elemento encontrado dentro del arreglo, que representa a la fila de la tabla con los datos a utilizar
    let fila = colLimiteInferior.indexOf(limiteInferior);
    // Asigna el valor de la fila con los datos a utilizar
    let cuotaFija = colCuotaFija[fila];
    let tasaExcedente = colTasaExcedente[fila];

    // Cálculos...
    let excedente = salario - limiteInferior;
    let ISRMarginal = excedente * tasaExcedente;
    let ISRCausado = ISRMarginal + cuotaFija;

    // Guarda las datos del cálculo en un objeto
    const datosCalculo = {
        salario: '$'+(salario.toFixed(2)),
        limiteInferior: '$'+(limiteInferior.toFixed(2)),
        excedente: '$'+(excedente.toFixed(2)),
        tasaExcedente: (tasaExcedente*100)+'%',
        ISRMarginal: '$'+(ISRMarginal.toFixed(2)),
        cuotaFija: '$'+(cuotaFija.toFixed(2)),
        ISRCausado: '$'+(ISRCausado.toFixed(2)),
    }

    // Renorna en el objeto todos los datos del calculo para que sean impresos en pantalla
    return datosCalculo;
}

let datosCalculo = calcularRetISR(10000,tablaQuincenal);

console.log("Salario: " + datosCalculo.salario);
console.log("(-) Límite inferior: " + datosCalculo.limiteInferior);
console.log("(=) Excedente al límite inferior: " + datosCalculo.excedente);
console.log("(x) Tasa aplicable al excedente: " + datosCalculo.tasaExcedente);
console.log("(=) ISR Marginal: " + datosCalculo.ISRMarginal);
console.log("(+) Cuota Fija: " + datosCalculo.cuotaFija);
console.log("(=) ISR causado: " + datosCalculo.ISRCausado);