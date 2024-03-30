import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Empleado } from "./empleado";
import { Observable, throwError } from "rxjs";
import { Salario } from "./salarios";


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  dbUrl: string = "https://backend-visioncorp-production-f74c.up.railway.app";
  router: any;
  constructor(private httpClient: HttpClient) { }

  public userRegistro(NombreUsuario: any, correoElectronico: any, Password: any, ClaveDeRegistro: any) {
    console.log(NombreUsuario);
    return this.httpClient.post<any>(this.dbUrl + '/registro.php', {
      NombreUsuario, correoElectronico, Password, ClaveDeRegistro

    }).pipe(map(Users => {
      return Users;
    }));
  }

  public userLogin(correoElectronico: any, Password: any) {
    return this.httpClient.post<any>(this.dbUrl + '/login.php', {
      correoElectronico, Password
    }).pipe(map(Users => {
      this.setToken(Users.token);
      return Users;
    }));
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public crearEmpleado(empleado: Empleado) {
    return this.httpClient.post<any>(this.dbUrl + '/crearEmpleado.php', empleado)
      .pipe(
        catchError((error) => {
          console.error('Error al crear el empleado:', error);
          return throwError(() => error);
        })
      );
  }

  public crearSalario(id: number, salario: Salario) {
    return this.httpClient.post<any>(`${this.dbUrl}/crearSalario.php?id=${id}`, salario)
      .pipe(
        catchError((error) => {
          console.error('Error al crear el salario:', error);
          return throwError(() => error);
        })
      );
  }


  public leerEmpleados() {
    return this.httpClient.get<Empleado[]>(this.dbUrl + '/leerEmpleados.php')
      .pipe(map(empleados => empleados));
  }

  public leerSalarios() {
    return this.httpClient.get<Salario[]>(this.dbUrl + '/leerSalarios.php')
      .pipe(map(salarios => salarios));
  }

  obtenerEmpleadoPorId(id: number): Observable<Empleado> {
    return this.httpClient.get<Empleado>(`${this.dbUrl}/ObtenerEmpleadoID.php?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  obtenerSalarioPorId(id: number): Observable<Salario> {
    return this.httpClient.get<Salario>(`${this.dbUrl}/ObtenerSalarioID.php?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  obtenerHistorialPorId(id: number): Observable<Salario> {
    return this.httpClient.get<Salario>(`${this.dbUrl}/ObtenerHistorialID.php?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error al obtener los detalles del empleado:', error);
    return throwError(() => error);
  }

  public editarEmpleado(id: number, empleado: Empleado) {
    return this.httpClient.post<any>(`${this.dbUrl}/editarEmpleado.php?id=${id}`, empleado)
      .pipe(
        catchError((error) => {
          console.error('Error al editar el empleado:', error);
          return throwError(() => error);
        })
      );
  }

  public editarSalario(id: number, salario: Salario) {
    console.log(id)
    return this.httpClient.post<any>(`${this.dbUrl}/editarSalario.php?id=${id}`, salario)
      .pipe(
        catchError((error) => {
          console.error('Error al editar salario del empleado:', error);
          return throwError(() => error);
        })
      );
  }

  public borrarEmpleado(id: number) {
    return this.httpClient.post<any>(`${this.dbUrl}/borrarEmpleado.php`, { EmpleadoID: id })
      .pipe(
        catchError((error) => {
          console.error('Error al eliminar el empleado:', error);
          return throwError(() => error);
        })
      );
  }

  subirPDF(NombreDocumento: string, RutaDocumento: string, FechaCarga: string, EmpleadoID: number): Observable<any> {
    const formData = new FormData();
    formData.append('NombreDocumento', NombreDocumento);
    formData.append('RutaDocumento', RutaDocumento);
    formData.append('FechaCarga', FechaCarga);
    formData.append('EmpleadoID', EmpleadoID.toString());

    return this.httpClient.post<any>(this.dbUrl + 'upload-pdf.php', formData);
  }

  getDocumentosPorEmpleado(EmpleadoID: number): Observable<any> {
    return this.httpClient.get<any>(`${this.dbUrl}/ObtenerDocumentos.php?EmpleadoID=${EmpleadoID}`);
  }


}
