import { Component } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';



@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrl: './documentos.component.css'
})
export class DocumentosComponent {

  EmpleadoID = this.route.snapshot.params['id'];
  URL: any;
  name: any;
  time: any;
  pdfFile: File | null = null;
  cargando: boolean = false;

  constructor(private storage: Storage, private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
}

onFileDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    this.handleFileUpload(files);
}

onFileSelected(event: any) {
    const files = event.target.files;
    this.handleFileUpload(files);
}

handleFileUpload(files: FileList) {
  if (files.length > 0) {
    const file = files[0];
    if (file.type === 'application/pdf') {
      this.pdfFile = file;
      const fileNameLabel = this.pdfFile.name;
      const alertMessage = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark-pdf mr-1" viewBox="0 0 16 16">
        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
        <path d="M4.603 14.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.7 11.7 0 0 0-1.997.406 11.3 11.3 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.245.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 7.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z"/>
      </svg>
      ${fileNameLabel}`;

      const cardBody = document.querySelector('.card-body');
      if (cardBody) {
        const existingAlert = cardBody.querySelector('.alert');
        if (existingAlert) {
          cardBody.removeChild(existingAlert);
        }
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-info mt-2 mb-0';
        alertDiv.innerHTML = alertMessage; 
        cardBody.appendChild(alertDiv);
      }
    } else {
      alert('Por favor, selecciona un archivo PDF.');
      return;
    }
  }
}


  async uploadPDF() {
    if (this.pdfFile) {
      this.cargando = true;
      const filePath = `documentos/${this.pdfFile.name}`;
      const fileRef = ref(this.storage, filePath);

      uploadBytes(fileRef, this.pdfFile)
        .then(response => {
          console.log(response);
          this.URL = response.metadata.fullPath;
          this.name = response.metadata.name;
          this.time = response.metadata.updated;

          this.apiService.subirPDF(this.name, this.URL, this.time, this.EmpleadoID).subscribe({
            next: (response) => {
              console.log("Datos subidos a la base de datos.");
              const alerta = document.getElementById('alerta');
              if (alerta) {
                alerta.style.display = 'block';
              }

              this.router.navigate(['/detalle-empleado/' + this.EmpleadoID]);
            },
            error: (error) => {
              console.error('Error al cargar los datos: ', error);
            }
          });
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.cargando = false; 
        });

    } else {
      console.error('No se ha seleccionado ningún archivo PDF.');
      alert('No se ha seleccionado ningún archivo PDF.');
      
    }
  }

}


