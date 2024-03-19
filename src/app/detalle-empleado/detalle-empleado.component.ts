import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Empleado } from '../empleado';
import { getDownloadURL } from '@angular/fire/storage';
import { Storage, ref } from '@angular/fire/storage';
import { DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrl: './detalle-empleado.component.css'
})

export class DetalleEmpleadoComponent {
  documentos: any[] = [];
  archivos: string[];
  empleado: Empleado = {
    id: undefined,
    EmpleadoID: 0,
    Nombre: '',
    Apellido: '',
    Edad: 0,
    correoElectronico: '',
    Telefono: '',
    Puesto: '',
    Departamento: '',
    FechaIngreso: ''
  };
  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute, private storage: Storage, private sanitizer: DomSanitizer) {
    this.archivos = [];
  }

  
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.apiService.obtenerEmpleadoPorId(id).subscribe(empleado => {
        this.empleado = empleado;
      });
    });
    this.getDocumentosPorEmpleado();
  }

  getDocumentosPorEmpleado() {
    const id = this.route.snapshot.params['id'];
    this.apiService.getDocumentosPorEmpleado(id).subscribe({
      next: async (response) => {
        this.documentos = response;
        console.log(this.documentos);
        this.archivos = [];
        for (const documento of this.documentos) {
          const filePath = documento.RutaDocumento;
          const fileRef = ref(this.storage, filePath);
  
          try {
            const url = await getDownloadURL(fileRef);
            console.log(url);
            this.archivos.push(url);
          } catch (error) {
            console.error('Error al obtener la URL de descarga:', error);
          }
        }
      },
      error: (error) => {
        console.error('Error al obtener los documentos:', error);
      }
    });
  }
  


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleDateString();
  }



}
