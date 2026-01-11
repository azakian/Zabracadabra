import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceDetectionService } from './shared/services/device-detection.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { ConsentBanner } from './shared/ui/consent-banner/consent-banner';
import { WelcomeModal } from './shared/ui/welcome-modal/welcome-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConsentBanner, WelcomeModal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly #localStorage = inject(LocalStorageService);
  readonly #deviceService = inject(DeviceDetectionService);

  protected readonly title = signal('Zabracadrabra - La magie des jeux de société en ligne');
  protected readonly showConsentBanner = signal(
    this.#deviceService.isDesktop() && !this.#localStorage.hasUsername(),
  );
  protected readonly showWelcomeModal = signal(
    this.#deviceService.isDesktop() &&
      this.#localStorage.hasUsername() &&
      !this.#localStorage.hasSeenIntro(),
  );

  onConsentAccepted(): void {
    this.showConsentBanner.set(false);
    this.showWelcomeModal.set(true);
  }

  onWelcomeModalClose(): void {
    this.#localStorage.setIntroSeen();
    this.showWelcomeModal.set(false);
  }
}
