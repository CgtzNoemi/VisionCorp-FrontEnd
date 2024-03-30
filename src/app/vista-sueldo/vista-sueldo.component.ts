import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../empleado';
import { Salario } from '../salarios';

@Component({
  selector: 'app-vista-sueldo',
  templateUrl: './vista-sueldo.component.html',
  styleUrls: ['./vista-sueldo.component.css']
})
export class VistaSueldoComponent implements OnInit {

  empleado!: Empleado;
  salario!: Salario;
  historial: Salario[] = [];
  id!: number;
  salarioNeto: number = 0;
  salarioNetoFormatted!: string;



  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.LoadData();
  }

  LoadData(): void {
    this.apiService.obtenerEmpleadoPorId(this.id).subscribe({
      next: (empleado: Empleado) => {
        this.empleado = empleado;
      },
      error: (error) => {
        console.error('Error al cargar datos del empleado:', error);
      }
    });

    this.apiService.obtenerHistorialPorId(this.id).subscribe({
      next: (historial: Salario | Salario[]) => { 
        if (Array.isArray(historial)) {
          this.historial = historial; 
        } else {
          this.historial = [historial]; 
        }
        console.log(this.historial);
      },
      error: (error) => {
        console.error('Error al cargar historial de cambios:', error);
      }
    });

    this.apiService.obtenerSalarioPorId(this.id).subscribe({
      next: (salario: Salario) => {
        this.salario = salario;
        this.calcularSalarioNeto(this.salario);
      },
      error: (error) => {
        console.error('Error al cargar datos del salario:', error);
      }
    });
  }

calcularSalarioNeto(salario: Salario): void {
    const salarioBruto = salario.salarioBase + salario.bonificaciones;
    const impuestos = salarioBruto * 0.03;
    let salarioDespuesDeducciones = salarioBruto - impuestos - salario.comisiones;

    this.salarioNeto = salarioDespuesDeducciones;
    console.log(this.salarioNeto)
    this.salarioNetoFormatted = this.salarioNeto.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}


}

