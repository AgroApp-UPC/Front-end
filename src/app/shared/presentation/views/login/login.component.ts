import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import {enviroment} from '../../../../../enviroment/enviroment.development';
import {UserService} from '../../../../plants/profile/services/profile.services';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  username = '';
  password = '';

  onSignIn() {
    if (!this.username || !this.password) {
      alert('Username and password are required.');
      return;
    }

    this.userService.getUserById(1).pipe(
      switchMap(currentUser => {
        const generatedEmail = `${this.username.toLowerCase().replace(/\s/g, '')}@gmail.com`;
        const updatedUser = {
          ...currentUser,
          user_name: this.username,
          password: this.password,
          email: generatedEmail
        };
        return this.userService.updateUser(updatedUser);
      })
    ).subscribe({
      next: () => {
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => console.error('Error updating user data:', err)
    });
  }
}
