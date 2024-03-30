export class Salario {
    id: number;
    EmpleadoID: number;
    salarioBase: number;
    bonificaciones: number;
    comisiones: number;
    fechaIngreso: Date;
    estadoPago: string;
  
    constructor(id: number, EmpleadoID: number, salarioBase: number, bonificaciones: number, comisiones: number, fechaIngreso: Date, estadoPago: string) {
      this.id = id;
      this.EmpleadoID = EmpleadoID;
      this.salarioBase = salarioBase;
      this.bonificaciones = bonificaciones;
      this.comisiones = comisiones;
      this.fechaIngreso = fechaIngreso;
      this.estadoPago = estadoPago;
    }
  }
  