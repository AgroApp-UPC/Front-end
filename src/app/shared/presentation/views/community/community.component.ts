import { Component } from '@angular/core';

@Component({
  selector: 'app-community',
  standalone: true,
  template: `
    <div class="page-container">
      <h1>Community</h1>
      <p>Connect with the community</p>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
    }
  `]
})
export class CommunityComponent {}
