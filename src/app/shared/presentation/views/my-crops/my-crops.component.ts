import { Component } from '@angular/core';

@Component({
  selector: 'app-my-crops',
  standalone: true,
  template: `
    <div class="page-container">
      <h1>My Crops</h1>
      <p>Manage your crops here</p>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
    }
  `]
})
export class MyCropsComponent {}
