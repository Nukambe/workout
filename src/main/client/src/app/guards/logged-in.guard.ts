import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const loggedInGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    await firstValueFrom(authService.refresh());
    return true;
  } catch (error) {
    router.navigate(['/signin']);
    return false;
  }
};
