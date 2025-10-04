import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

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
  private platformId = inject(PLATFORM_ID);

  username = '';
  password = '';

  onSignIn() {
    if (isPlatformBrowser(this.platformId)) {
      // Set isLoggedIn to true in localStorage
      localStorage.setItem('isLoggedIn', 'true');

      // Navigate to dashboard
      this.router.navigate(['/dashboard']);
    }
  }
}
