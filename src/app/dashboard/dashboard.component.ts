import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  auth:any;
  constructor(private router:Router){

  }

  ngOnInit(): void {
    //Poner esto en los demás componentes que se relacionen con la manipulación de datos una vez que se inicio sesión
    if (typeof localStorage !== 'undefined') {
      this.auth = localStorage.getItem('token');
      if (!this.auth) {
        this.router.navigate(['/login']);
      }
    } else {
      console.log('localStorage no esta disponible');
    }
  }
}
