import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const loginGuard = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // If user is already logged in, redirect to dashboard
    if (isLoggedIn) {
      router.navigate(['/dashboard']);
      return false;
    }
  }

  // If not logged in, allow access to login page
  return true;
};
