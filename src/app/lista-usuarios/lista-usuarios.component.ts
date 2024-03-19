import { OnInit, OnDestroy, AfterViewInit, Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Empleado } from '../empleado';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit, OnDestroy, AfterViewInit {

  empleados: Empleado[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild('tabla', { static: false }) tabla!: ElementRef | undefined;
  empleado: any;

  empleadoAEliminarId: number | null = null;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json',
      },
    };
  }

  ngAfterViewInit(): void {
    this.LoadEmpleados();
  }

  LoadEmpleados() {
    this.apiService.leerEmpleados().subscribe((data: Empleado[]) => {
      this.empleados = data;
      this.dtTrigger.next(null);
      this.cdr.detectChanges();

      if (this.tabla && !$.fn.DataTable.isDataTable(this.tabla.nativeElement)) {
        $(this.tabla.nativeElement).DataTable(this.dtOptions);
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  editarEmpleado(id: number) {
    this.router.navigate(['/editar-empleado', id]);
  }

  subirDocumento(id: number){
    this.router.navigate(['/subir-documento', id]);
  }

  verDetalle(id: number) {
    this.router.navigate(['/detalle-empleado', id]);
  }
  

  openModal(id: number) {
    this.empleadoAEliminarId = id;
    const ModalDiv = document.getElementById('ModalEliminar');
    if (ModalDiv != null) {
      ModalDiv.style.display = 'block';
      ModalDiv.style.overflow = 'hidden';
      ModalDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }
  }

  closeModal() {
    this.empleadoAEliminarId = null;
    const ModalDiv = document.getElementById('ModalEliminar');
    if (ModalDiv != null) {
      ModalDiv.style.display = 'none';
    }
  }

  borrarEmpleado(): void {
    if (this.empleadoAEliminarId) {
      this.apiService.borrarEmpleado(this.empleadoAEliminarId).subscribe({
        next: (response: any) => {
          console.log(response.mensaje);
          console.log('Borrando empleado con ID:', this.empleadoAEliminarId);
          this.router.navigateByUrl('/', {replaceUrl: true}).then(() =>
          this.router.navigate(['/lista-usuarios']));
        },
        error: (error: any) => {
          console.error('Error al eliminar el empleado:', error);
        }
      });
    }
  }
}


