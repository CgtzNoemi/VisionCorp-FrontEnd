import { Component } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  angForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private dataService: ApiService, 
    private router:Router
    ){
      this.angForm = this.fb.group({
        correoElectronico: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.pattern(StrongPasswordRegx)]],
      });
    }

    AngularData(angForm:any){
      if(this.angForm.valid){
        this.dataService.userLogin(
          angForm.value.correoElectronico,
          angForm.value.Password,
        )
        .pipe(first()).subscribe({
          next: (data) => {
            if (data.message === 'success') {
              console.log(data);
              // redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/dashboard';
              this.router.navigate(['/dashboard']);
            } else if (data.message === 'failed' && data.error === 'La contraseña no es válida') {
              alert("La contraseña es incorrecta");
            } else if (data.message === 'failed' && data.error === 'Usuario no encontrado') {
              alert("No se encontró el usuario");
            }
          },
          error: (error) => {
            alert("El correo y/o la contraseña son incorrectas");
          }
        });
      }else{
        alert("Todos los campos son obligatorios");
      }

      
    }
}
export const StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  

