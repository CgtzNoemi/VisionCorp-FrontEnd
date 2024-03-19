import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormCrearComponent } from './form-crear/form-crear.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { FormEditarComponent } from './form-editar/form-editar.component';
import { DetalleEmpleadoComponent } from './detalle-empleado/detalle-empleado.component';
import { DocumentosComponent } from './documentos/documentos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: RegistroComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'crear-usuario', component: FormCrearComponent},
  { path: 'lista-usuarios', component: ListaUsuariosComponent},
  { path: 'editar-empleado/:id', component: FormEditarComponent },
  { path: 'detalle-empleado/:id', component: DetalleEmpleadoComponent},
  { path: 'subir-documento/:id', component: DocumentosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
