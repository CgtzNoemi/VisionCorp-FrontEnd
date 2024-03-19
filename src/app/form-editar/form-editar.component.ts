import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Empleado } from '../empleado';

@Component({
  selector: 'app-form-editar',
  templateUrl: './form-editar.component.html',
  styleUrl: './form-editar.component.css'
})
export class FormEditarComponent {
  formulario!: FormGroup;
  empleado!: Empleado;
  constructor(private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.formulario = this.fb.group({
      Nombre: ['', [Validators.required, Validators.minLength(3)]],
      Apellido: ['', [Validators.required, Validators.minLength(3)]],
      Edad: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      Telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      Puesto: ['', [Validators.required]],
      Departamento: ['', [Validators.required]],
      FechaIngreso: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.apiService.obtenerEmpleadoPorId(id).subscribe(empleado => {
        this.empleado = empleado;
        this.formulario.patchValue({
          Nombre: empleado.Nombre,
          Apellido: empleado.Apellido,
          Edad: empleado.Edad,
          correoElectronico: empleado.correoElectronico,
          Telefono: empleado.Telefono,
          Departamento: empleado.Departamento,
          Puesto: empleado.Puesto,
          FechaIngreso: empleado.FechaIngreso,
        });
      });

    });
  }
  editarEmpleado() {
    if (this.formulario.valid) {
      const id = this.route.snapshot.params['id'];
      console.log(id)
      this.apiService.editarEmpleado(id, this.formulario.value).subscribe({
        next: (response: any) => {
          console.log(response.mensaje);
          this.router.navigate(['/lista-usuarios']);
        },
        error: (error) => {
          console.error('Error al editar el empleado:', error);
        }
      });
    }
  }
}
