import { Component } from '@angular/core';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  template: `
    <div class="page-container">
      <h1>My Tasks</h1>
      <p>Manage your tasks here</p>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
    }
  `]
})
export class MyTasksComponent {}
