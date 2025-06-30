import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.userService.login(this.username, this.password).subscribe({
      next: (res) => {
        const token = res.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (payload.role === 'USER') {
          this.router.navigate(['/user']);
        } else {
          this.error = 'Unknown role';
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed';
      }
    });
  }
}
