import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      NombreUsuario: ['', [Validators.required, Validators.minLength(5)]], 
      correoElectronico: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.pattern(StrongPasswordRegx)]],
      ClaveDeRegistro: ['', Validators.required]
    });
  }

  AngularData() {
    if (this.angForm.controls['NombreUsuario'].valid &&
        this.angForm.controls['correoElectronico'].valid &&
        this.angForm.controls['Password'].valid &&
        this.angForm.controls['ClaveDeRegistro'].valid) {
  
      const { NombreUsuario, correoElectronico, Password, ClaveDeRegistro } = this.angForm.value;
  
      this.dataService.userRegistro(NombreUsuario, correoElectronico, Password, ClaveDeRegistro)
        .pipe(first())
        .subscribe({
          next: (data) => {
            if (data.message === 'success') {
              this.router.navigate(['/login']);
            } else {
              alert(data.error);
            }
          },
          error: (error) => {
            alert(error);
          }
        });
  
    } else {
      alert('Completa correctamente todos los campos.');
    }
  }
  
}
export const StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

