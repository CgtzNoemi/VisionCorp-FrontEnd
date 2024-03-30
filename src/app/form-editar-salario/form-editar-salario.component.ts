import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Salario } from '../salarios';

@Component({
  selector: 'app-form-editar-salario',
  templateUrl: './form-editar-salario.component.html',
  styleUrl: './form-editar-salario.component.css'
})
export class FormEditarSalarioComponent {

  id = this.route.snapshot.params['id'];
  formulario: FormGroup;
  currentDate: Date = new Date();
  salario!: Salario;


  constructor(private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.formulario = this.fb.group({
      salarioBase: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{2})?$/)]],
      bonificaciones: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{2})?$/)]],
      comisiones: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{2})?$/)]],
      estadoPago: ['', Validators.required],
      fechaIngreso: [this.obtenerFechaActual(), Validators.required]
    });


  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.apiService.obtenerSalarioPorId(id).subscribe(salario => {
        this.salario = salario;
        this.formulario.patchValue({
          salarioBase: salario.salarioBase,
          bonificaciones: salario.bonificaciones,
          comisiones: salario.comisiones,
          estadoPago: salario.estadoPago,
        });
      });

    });
  }

  editarSalario() {
    if (this.formulario.valid) {
      const id = this.route.snapshot.params['ids'];
      const idEmpleado = this.route.snapshot.params['id']
      console.log(id);


      const salarioBase = parseFloat(this.formulario.value.salarioBase);
      const bonificaciones = parseFloat(this.formulario.value.bonificaciones);
      const comisiones = parseFloat(this.formulario.value.comisiones);

      const salarioEditado = {
        id: id,
        EmpleadoID: idEmpleado,
        fechaIngreso: this.formulario.value.fechaIngreso,
        salarioBase: salarioBase,
        bonificaciones: bonificaciones,
        comisiones: comisiones,
        estadoPago: this.formulario.value.estadoPago,
      };



      this.apiService.editarSalario(id, salarioEditado).subscribe({
        next: (response: any) => {
          console.log(response.mensaje);
          this.router.navigate(['/salarios']);
        },
        error: (error) => {
          console.error('Error al editar el empleado:', error);
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
