import { OnInit, OnDestroy, AfterViewInit, Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Empleado } from '../empleado';
import { Subject, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { Salario } from '../salarios';


@Component({
  selector: 'app-salarios',
  templateUrl: './salarios.component.html',
  styleUrl: './salarios.component.css'
})
export class SalariosComponent {
  empleados: Empleado[] = [];
  salarios: Salario[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild('tabla', { static: false }) tabla!: ElementRef | undefined;
  empleado: any;
  salarioNetoPorEmpleado: { [key: number]: number } = {};


  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ elementos",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      },
    };
  }

  ngAfterViewInit(): void {
    this.LoadData();
  }

  LoadData() {
    forkJoin([
      this.apiService.leerEmpleados(),
      this.apiService.leerSalarios()
    ]).subscribe({
      next: ([empleados, salarios]: [Empleado[], Salario[]]) => {
        this.empleados = empleados;
        this.salarios = salarios;
        console.log(this.empleados);
        console.log(this.salarios);
        this.dtTrigger.next(null);
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error al cargar datos:', error);
      }
    });
  }

  calcularSalarioNeto(id: number): number | undefined {
    if (this.salarioNetoPorEmpleado[id] !== undefined) {
      return this.salarioNetoPorEmpleado[id];
    }
    const salario = this.encontrarSalario(id);
    if (salario && typeof salario.salarioBase === 'string' && typeof salario.bonificaciones === 'string' && typeof salario.comisiones === 'string') {
      const salarioBase = parseFloat(salario.salarioBase);
      const bonificaciones = parseFloat(salario.bonificaciones);
      const comisiones = parseFloat(salario.comisiones);
      if (!isNaN(salarioBase) && !isNaN(bonificaciones) && !isNaN(comisiones)) {
        const salarioBruto = salarioBase + bonificaciones;
        let salarioNeto = salarioBruto - comisiones;
        const impuestos = salarioBruto * 0.03; // Impuestos sobre el salario bruto
        salarioNeto -= impuestos; // Restar impuestos al salario neto
        console.log(salarioNeto);
        this.salarioNetoPorEmpleado[id] = salarioNeto;
        return salarioNeto;
      }
    }
    return undefined;
  }
  
  


  encontrarSalario(empleadoId: number): Salario | undefined {
    return this.salarios.find(salario => salario.EmpleadoID === empleadoId);
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  editarOCrearSalario(id: number) {
    this.apiService.obtenerSalarioPorId(id).subscribe({
      next: (response: any) => {
        if (response === "Salario no encontrado") {
          this.router.navigate(['/crear-salario', id]);
        } else {
          this.router.navigate(['/editar-salario', id, this.encontrarSalario(id)?.id]);
        }
      },
      error: (error) => {
        console.error('Error al obtener el salario:', error);
      }
    });
  }

  verDetalle(id: number) {
    this.router.navigate(['/detalle-sueldo', id]);
  }

}



