import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-crear-salario',
  templateUrl: './form-crear-salario.component.html',
  styleUrl: './form-crear-salario.component.css'
})
export class FormCrearSalarioComponent {

  formulario: FormGroup;
  currentDate: Date = new Date();
  id = this.route.snapshot.params['id'];


  constructor(private fb: FormBuilder, private apiService: ApiService,private route: ActivatedRoute, private router: Router) {
    this.formulario = this.fb.group({
        salarioBase: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{2})?$/)]],
        bonificaciones: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{2})?$/)]],
        comisiones: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{2})?$/)]],
        estadoPago: ['', Validators.required],
        fechaIngreso: [this.obtenerFechaActual(), Validators.required]
    });

    
  }

  crearSalario(){
    if (this.formulario.valid) {
      
      const salarioBase = parseFloat(this.formulario.value.salarioBase);
      const bonificaciones = parseFloat(this.formulario.value.bonificaciones);
      const comisiones = parseFloat(this.formulario.value.comisiones);

      if (!isNaN(salarioBase) && !isNaN(bonificaciones) && !isNaN(comisiones)) {
        this.formulario.patchValue({
          salarioBase: salarioBase,
          bonificaciones: bonificaciones,
          comisiones: comisiones
        });
      }

      this.apiService.crearSalario(this.id, this.formulario.value).subscribe({
        next: (response: any) => {
          console.log(response.mensaje);
          this.router.navigate(['/salarios']); 
        },
        error: (error: any) => {
          console.error('Error al crear el salario del empleado:', error);
        }
      });
    }
  }

  obtenerFechaActual(): string {
    const fechaActual = new Date();
    const mes = fechaActual.getMonth() + 1 < 10 ? '0' + (fechaActual.getMonth() + 1) : fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate() < 10 ? '0' + fechaActual.getDate() : fechaActual.getDate();
    return `${fechaActual.getFullYear()}-${mes}-${dia}`;
  }
}
