import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora-isr',
  templateUrl: './calculadora-isr.component.html',
  styleUrl: './calculadora-isr.component.css'
})
export class CalculadoraISRComponent {
  calculoRealizado = false;
  datosCalculo: any = {};

  tablaQuincenal = {
    colLimiteInferior: [0.01, 368.11, 3124.36, 5490.76, 6382.81, 7641.91, 15412.81, 24292.66, 46378.51, 61838.11, 185514.31],
    colCuotaFija: [0.00, 7.05, 183.45, 441.00, 583.65, 809.25, 2469.15, 4557.75, 11183.40, 16130.55, 58180.35],
    colTasaExcedente: [0.0192, 0.0640, 0.1088, 0.1600, 0.1792, 0.2136, 0.2352, 0.3000, 0.3200, 0.3400, 0.3500]
  }
  tablaMensual = {
    colLimiteInferior: [0.01, 746.05, 6332.06, 11128.02, 12935.83, 15487.72, 31236.50, 49233.01, 93993.91, 125325.21, 375975.62],
    colCuotaFija: [0.00, 14.32, 371.83, 893.63, 1182.88, 1640.18, 5004.12, 9236.89, 22665.17, 32691.18, 117912.32],
    colTasaExcedente: [0.0192, 0.0640, 0.1088, 0.1600, 0.1792, 0.2136, 0.2352, 0.3000, 0.3200, 0.3400, 0.3500]
  }

  calcularISR(formValue: any) {
    if (formValue.salario && formValue.periodicidad) {
      const salario = parseFloat(formValue.salario);
      let tabla;
      switch (formValue.periodicidad) {
        case 'quincenal':
          tabla = this.tablaQuincenal;
          break;
        case 'mensual':
          tabla = this.tablaMensual;
          break;
        default:
          break;
      }
      this.datosCalculo = this.calcularRetISR(salario, tabla);
      this.calculoRealizado = true;
    }
  }
  calcularRetISR(salario: number, tabla: any): any {
    const { colLimiteInferior, colCuotaFija, colTasaExcedente } = tabla;
    let limiteInferior = colLimiteInferior.filter((limite: number) => salario >= limite).pop();
    let fila = colLimiteInferior.indexOf(limiteInferior);
    let cuotaFija = colCuotaFija[fila];
    let tasaExcedente = colTasaExcedente[fila];
    let excedente = salario - limiteInferior;
    let ISRMarginal = excedente * tasaExcedente;
    let ISRCausado = ISRMarginal + cuotaFija;

    return {
      salario: '$'+(salario.toFixed(2)),
      limiteInferior: '$'+(limiteInferior.toFixed(2)),
      excedente: '$'+(excedente.toFixed(2)),
      tasaExcedente: (tasaExcedente*100).toFixed(2)+'%',
      ISRMarginal: '$'+(ISRMarginal.toFixed(2)),
      cuotaFija: '$'+(cuotaFija.toFixed(2)),
      ISRCausado: '$'+(ISRCausado.toFixed(2))
    };
  }
}
