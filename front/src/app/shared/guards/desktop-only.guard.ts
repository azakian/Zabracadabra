import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DeviceDetectionService } from '../services/device-detection.service';

export const desktopOnlyGuard: CanActivateFn = () => {
  const deviceService = inject(DeviceDetectionService);
  const router = inject(Router);

  if (deviceService.isDesktop()) {
    return true;
  }

  return router.createUrlTree(['/desktop-required']);
};
