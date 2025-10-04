import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="page-container">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
    }
  `]
})
export class DashboardComponent {}
