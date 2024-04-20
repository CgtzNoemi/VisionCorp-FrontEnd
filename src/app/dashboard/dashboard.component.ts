import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Empleado } from '../empleado';
import { Salario } from '../salarios';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  auth:any;
  empleados: Empleado[] = [];
  salarios!: Salario[];
  totalEmpleados!: number;
  promEdad!: number;
  promSalario!: number;
  promBonificaciones!: number;
  mostrarDetalles: boolean = false;
  conteoEmpleados!: { [Departamento: string]: number; };
  conteoPago!: { [estadoPago: string]: number; };
  single!: any[];
  single2!: any[];
  view: [number, number] = [450, 300];

  // opciones gráficos
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Estado de pago';
  showYAxisLabel = true;
  yAxisLabel = 'Número de empleados';
  

  constructor(private router:Router, private apiService: ApiService){

  }

  

  ngOnInit(): void {
    //Poner esto en los demás componentes que se relacionen con la manipulación de datos una vez que se inicio sesión
    if (typeof localStorage !== 'undefined') {
      this.auth = localStorage.getItem('token');
      this.LoadData();
      if (!this.auth) {
        this.router.navigate(['/login']);
      }
    } else {
      console.log('localStorage no esta disponible');
    }
  }

  LoadData() {
    forkJoin([
      this.apiService.leerEmpleados(),
      this.apiService.leerSalarios()
    ]).subscribe({
      next: ([empleados, salarios]: [Empleado[], Salario[]]) => {
        this.empleados = empleados;
        this.salarios = salarios;
        this.totalEmpleados = this.empleados.length;
        this.promEdad = this.calcularPromedioEdad(this.empleados);
        this.promSalario = this.calcularPromedioSalario(this.salarios);
        this.promBonificaciones = this.calcularPromedioBonificaciones(this.salarios);
        this.conteoEmpleados = this.calcularEmpleadosPorDepartamento(this.empleados);
        this.conteoPago = this.contabilizarEstadoPago(this.salarios);
        this.single = [
          {
            "name": "Finanzas",
            "value": this.conteoEmpleados['Finanzas'] ?? 0
          },
          {
            "name": "Marketing",
            "value": this.conteoEmpleados['Marketing'] ?? 0
          },
          {
            "name": "Legal",
            "value": this.conteoEmpleados['Legal'] ?? 0
          },
        ];
        this.single2 = [
          {
            "name": "Pagado",
            "value": this.conteoPago['Pagado'] ?? 0
          },
          {
            "name": "Pendiente",
            "value": this.conteoPago['Pendiente'] ?? 0
          },
          {
            "name": "En proceso",
            "value": this.conteoPago['En proceso'] ?? 0
          },
          {
            "name": "Rechazado",
            "value": this.conteoPago['Rechazado'] ?? 0
          },
          {
            "name": "Cancelado",
            "value": this.conteoPago['Cancelado'] ?? 0
          },
        ];
        console.log(this.conteoEmpleados)
        console.log(this.empleados);
        console.log(this.salarios);
      },
      error: (error: any) => {
        console.error('Error al cargar datos:', error);
      }
    });
  }


  calcularPromedioEdad(empleados: Empleado[]): number {
    if (empleados.length === 0) {
        return 0; 
    }
    var sumaEdades = 0;
    for (var i = 0; i < empleados.length; i++) {
      sumaEdades += +empleados[i].Edad;
    }
    console.log(sumaEdades)
    var promedioEdad = sumaEdades / empleados.length;
    return Math.round(promedioEdad);
  }

  calcularPromedioSalario(salarios: Salario[]): number {
    if (salarios.length === 0) {
        return 0; 
    }
    var sumaSalarios = 0;
    for (var i = 0; i < salarios.length; i++) {
      sumaSalarios += +salarios[i].salarioBase;
    }
    console.log(sumaSalarios)
    var promedioSalario = sumaSalarios / salarios.length;
    promedioSalario = parseFloat(promedioSalario.toFixed(2));
    return promedioSalario;
  }

  calcularPromedioBonificaciones(salarios: Salario[]): number {
    if (salarios.length === 0) {
        return 0; 
    }
    var sumaBonificaciones = 0;
    for (var i = 0; i < salarios.length; i++) {
      sumaBonificaciones += +salarios[i].bonificaciones;
    }
    console.log(sumaBonificaciones)
    var promedioBonificaciones = sumaBonificaciones / salarios.length;
    promedioBonificaciones = parseFloat(promedioBonificaciones.toFixed(2));
    return promedioBonificaciones;
  }


  calcularEmpleadosPorDepartamento(empleados: Empleado[]): { [Departamento: string]: number } {
    const conteoEmpleadosPorDepartamento: { [departamento: string]: number } = {};
  
    empleados.forEach(empleado => {
      if (!conteoEmpleadosPorDepartamento[empleado.Departamento]) {
        conteoEmpleadosPorDepartamento[empleado.Departamento] = 1;
      } else {
        conteoEmpleadosPorDepartamento[empleado.Departamento]++;
      }
    });
  
    return conteoEmpleadosPorDepartamento;
  }

  contabilizarEstadoPago(salario: Salario[]): { [estadoPago: string]: number } {
    const conteoEstadoPago: { [estadoPago: string]: number } = {};
  
    salario.forEach(salario => {
      if (!conteoEstadoPago[salario.estadoPago]) {
        conteoEstadoPago[salario.estadoPago] = 1;
      } else {
        conteoEstadoPago[salario.estadoPago]++;
      }
    });
  
    return conteoEstadoPago;
  }
  

  //Gráfico
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  
  
  
}
