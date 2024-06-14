import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpregadoService } from '../../service/empregado.service';
import { Jwt } from '../../models/jwt.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [EmpregadoService],
})
export class LoginComponent {
  Jwt: Jwt = {
    token: '',
  };
  loginObj: any = {
    username: '',
    password: '',
    userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    customClaims: {
      admin: 'true',
    },
  };

  constructor(
    private router: Router,
    private empregadoService: EmpregadoService
  ) {}

  onLogin() {
    this.empregadoService.getToken(this.loginObj).subscribe({
      next: (jwt) => {
        this.Jwt = jwt;
        localStorage.setItem('loginToken', jwt.token);
        this.router.navigateByUrl('/employees');
      },
      error: (error) => {
        console.error('Error fetching jwt token:', error);
        alert('Login Error');
      },
      complete: () => {
        console.log('Employee fetching completed');
      },
    });
  }
}
