import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceDetectionService {
  readonly #platformId = inject(PLATFORM_ID);

  readonly #userAgent = signal(this.#getUserAgent());

  readonly isDesktop = computed(() => {
    const ua = this.#userAgent();
    if (!ua) return true; // Default to desktop for SSR

    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    const tabletRegex = /Tablet|iPad/i;

    return !mobileRegex.test(ua) && !tabletRegex.test(ua);
  });

  readonly isMobile = computed(() => !this.isDesktop());

  #getUserAgent(): string {
    if (isPlatformBrowser(this.#platformId)) {
      return window.navigator.userAgent;
    }
    return '';
  }
}
