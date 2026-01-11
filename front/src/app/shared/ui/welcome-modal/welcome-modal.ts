import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-welcome-modal',
  template: `
    <div
      class="modal-backdrop"
      role="button"
      tabindex="0"
      (click)="dismiss.emit()"
      (keydown.escape)="dismiss.emit()"
      (keydown.enter)="dismiss.emit()"
      aria-label="Fermer la modale"
    >
      <div
        class="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        (click)="$event.stopPropagation()"
        (keydown)="$event.stopPropagation()"
      >
        <header class="modal-header">
          <div class="magic-icon" aria-hidden="true">🎩✨</div>
          <h1 id="welcome-title">Bienvenue sur Zabracadabra !</h1>
        </header>

        <div class="modal-body">
          <p class="intro">
            Tu es sur le point de vivre une aventure magique dans l'univers des jeux de société...
          </p>

          <div class="mission-card">
            <h2>🎯 Ta mission</h2>
            <p>
              Pour débloquer ta récompense, tu dois <strong>effectuer un paiement</strong> dans le
              panier.
            </p>
          </div>

          <div class="hint-card">
            <h2>🔍 Mais attention tête de linotte...</h2>
            <p>
              Il faudra que tu retrouves ton <strong>numéro de carte bancaire</strong>
              <br />
              <strong>Des indices sont cachés</strong> un peu partout sur le site pour t'aider à le
              découvrir.
            </p>
          </div>

          <div class="steps">
            <h2>📋 Les étapes</h2>
            <ol>
              <li>Explore les jeux de société</li>
              <li>Trouve les indices cachés</li>
              <li>Reconstitue le bon numéro de carte</li>
              <li>Valide ton paiement</li>
              <li>Découvre ta récompense ! 🎁</li>
            </ol>
          </div>
        </div>

        <footer class="modal-footer">
          <button type="button" class="start-btn" (click)="dismiss.emit()">C'est parti ! 🚀</button>
        </footer>
      </div>
    </div>
  `,
  styles: `
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgb(0 0 0 / 70%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1001;
      padding: 1rem;
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .modal-content {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border-radius: 1.5rem;
      max-width: 500px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      color: white;
      box-shadow: 0 20px 60px rgb(0 0 0 / 50%);
      animation: slideUp 0.4s ease-out;
    }

    @keyframes slideUp {
      from {
        transform: translateY(30px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .modal-header {
      text-align: center;
      padding: 2rem 2rem 1rem;
    }

    .magic-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-8px);
      }
    }

    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .modal-body {
      padding: 0 2rem;
    }

    .intro {
      text-align: center;
      font-size: 1.1rem;
      opacity: 0.9;
      margin-bottom: 1.5rem;
    }

    .mission-card,
    .hint-card {
      background: rgb(255 255 255 / 5%);
      border-radius: 1rem;
      padding: 1rem 1.25rem;
      margin-bottom: 1rem;
      border-left: 4px solid;
    }

    .mission-card {
      border-color: #667eea;
    }

    .hint-card {
      border-color: #f093fb;
    }

    .mission-card h2,
    .hint-card h2,
    .steps h2 {
      font-size: 1.1rem;
      margin: 0 0 0.5rem;
    }

    .mission-card p,
    .hint-card p {
      margin: 0;
      line-height: 1.5;
      opacity: 0.9;
    }

    .steps {
      margin-top: 1.5rem;
    }

    .steps h2 {
      margin-bottom: 0.75rem;
    }

    .steps ol {
      margin: 0;
      padding-left: 1.5rem;
    }

    .steps li {
      margin-bottom: 0.5rem;
      opacity: 0.9;
    }

    strong {
      color: #f093fb;
      font-weight: 600;
    }

    .modal-footer {
      padding: 1.5rem 2rem 2rem;
      text-align: center;
    }

    .start-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      color: white;
      padding: 1rem 2.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 2rem;
      cursor: pointer;
      transition: all 0.3s;
    }

    .start-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgb(102 126 234 / 40%);
    }

    .start-btn:active {
      transform: translateY(-1px);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeModal {
  readonly dismiss = output<void>();
}
