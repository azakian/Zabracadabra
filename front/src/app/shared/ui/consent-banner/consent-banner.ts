import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-consent-banner',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="consent-banner">
      <div class="consent-content">
        <div class="consent-icon">🍪</div>
        <div class="consent-text">
          <h3>Bienvenue sur Zabracadabra !</h3>
          <p>
            Nous utilisons uniquement le stockage local pour retenir ton prénom. Aucune donnée n'est
            partagée avec des tiers. En vrai c'est juste pour traquer vos propositions hihi signé le
            Zak.
          </p>
        </div>
        <form class="consent-form" (ngSubmit)="saveAndClose()">
          <div class="input-group">
            <input
              type="text"
              [(ngModel)]="username"
              name="username"
              placeholder="Ton prénom"
              class="consent-input"
              required
              #nameInput="ngModel"
            />
            <button type="submit" class="consent-button" [disabled]="!username().trim()">
              C'est parti !
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: `
    .consent-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem;
      box-shadow: 0 -4px 20px rgb(0 0 0 / 20%);
      z-index: 1000;
      animation: slideUp 0.4s ease-out;
    }

    @keyframes slideUp {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .consent-content {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    .consent-icon {
      font-size: 2.5rem;
      flex-shrink: 0;
    }

    .consent-text {
      flex: 1;
      min-width: 200px;

      h3 {
        margin: 0 0 0.5rem;
        font-size: 1.25rem;
        font-weight: 600;
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        opacity: 0.9;
        line-height: 1.4;
      }
    }

    .consent-form {
      flex-shrink: 0;
    }

    .input-group {
      display: flex;
      gap: 0.5rem;
    }

    .consent-input {
      padding: 0.75rem 1rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.15);
      color: white;
      font-size: 1rem;
      width: 180px;
      transition: all 0.2s;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }

      &:focus {
        outline: none;
        border-color: white;
        background: rgba(255, 255, 255, 0.25);
      }
    }

    .consent-button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      background: white;
      color: #667eea;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgb(0 0 0 / 20%);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    @media (max-width: 600px) {
      .consent-content {
        flex-direction: column;
        text-align: center;
      }

      .input-group {
        flex-direction: column;
        width: 100%;
      }

      .consent-input {
        width: 100%;
      }

      .consent-button {
        width: 100%;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsentBanner {
  readonly #localStorage = inject(LocalStorageService);

  readonly username = signal('');
  readonly accepted = output<string>();

  saveAndClose(): void {
    const name = this.username().trim();
    if (name) {
      this.#localStorage.setUsername(name);
      this.accepted.emit(name);
    }
  }
}
