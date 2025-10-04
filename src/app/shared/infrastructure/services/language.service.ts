import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translateService = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  currentLanguage = signal<string>('en');
  availableLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  constructor() {
    // Only run in browser
    if (this.isBrowser) {
      // Check localStorage first
      const savedLang = localStorage.getItem('language');

      if (savedLang && this.availableLanguages.some(lang => lang.code === savedLang)) {
        this.setLanguage(savedLang);
      } else {
        // Get browser language or default to 'en'
        const browserLang = this.translateService.getBrowserLang();
        const defaultLang = browserLang?.match(/en|es/) ? browserLang : 'en';
        this.setLanguage(defaultLang);
      }
    } else {
      // Set default language for SSR
      this.translateService.use('en');
    }
  }

  setLanguage(lang: string) {
    this.translateService.use(lang);
    this.currentLanguage.set(lang);

    // Only use localStorage in browser
    if (this.isBrowser) {
      localStorage.setItem('language', lang);
    }
  }

  getLanguage(): string {
    return this.currentLanguage();
  }
}
