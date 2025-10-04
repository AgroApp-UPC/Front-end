import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../../infrastructure/services/sidebar.service';
import { LanguageSwitcher } from '../language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIcon, MatIconButton, RouterLink, LanguageSwitcher, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private sidebarService = inject(SidebarService);

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
