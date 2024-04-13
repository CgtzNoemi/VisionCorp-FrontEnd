import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormCrearComponent } from './form-crear/form-crear.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { DataTablesModule } from 'angular-datatables';
import { BarraNavComponent } from './barra-nav/barra-nav.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { FormEditarComponent } from './form-editar/form-editar.component';
import { DetalleEmpleadoComponent } from './detalle-empleado/detalle-empleado.component';
import { SalariosComponent } from './salarios/salarios.component';
import { FormEditarSalarioComponent } from './form-editar-salario/form-editar-salario.component';
import { FormCrearSalarioComponent } from './form-crear-salario/form-crear-salario.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { VistaSueldoComponent } from './vista-sueldo/vista-sueldo.component';
import { CalculadoraISRComponent } from './calculadora-isr/calculadora-isr/calculadora-isr.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    RegistroComponent,
    LoginComponent,
    NavbarComponent,
    FormCrearComponent,
    ListaUsuariosComponent,
    BarraNavComponent,
    FormEditarComponent,
    DetalleEmpleadoComponent,
    DocumentosComponent,
    SalariosComponent,
    FormEditarSalarioComponent,
    FormCrearSalarioComponent,
    VistaSueldoComponent,
    CalculadoraISRComponent,
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    provideFirebaseApp(() => initializeApp({"projectId":"documentos-visioncorp","appId":"1:1021178746880:web:ae01fcd125575a48b2e0e5","storageBucket":"documentos-visioncorp.appspot.com","apiKey":"AIzaSyD8Zjl0aUM8YO8_2lnMixSnwjj4nBScC9k","authDomain":"documentos-visioncorp.firebaseapp.com","messagingSenderId":"1021178746880"})),
    provideStorage(() => getStorage()),
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
