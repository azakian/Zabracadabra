import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-desktop-required',
  template: `
    <div class="desktop-required-container">
      <div class="content">
        <div class="icon" aria-hidden="true">🖥️</div>
        <h1>Oups ! Cette application nécessite un ordinateur</h1>
        <p>
          Pour profiter pleinement de <strong>Zabracadabra</strong>, veuillez accéder à ce site
          depuis un ordinateur de bureau ou un ordinateur portable.
        </p>
        <p>
          En vrai vas-y j'ai eu la flemme et pas le temps pour adapter sur portable, sortez les pc
          les amis !
        </p>
        <div class="devices" aria-hidden="true">
          <span class="device not-supported">📱</span>
          <span class="arrow">→</span>
          <span class="device supported">💻</span>
        </div>
        <p class="hint">
          Les fonctionnalités de jeux de société sont optimisées pour les écrans larges et
          nécessitent une souris pour une meilleure expérience.
        </p>
      </div>
    </div>
  `,
  styles: `
    .desktop-required-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
    }

    .content {
      max-width: 500px;
    }

    .icon {
      font-size: 5rem;
      margin-bottom: 1.5rem;
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 1rem;
      line-height: 1.3;
    }

    p {
      font-size: 1.1rem;
      line-height: 1.6;
      margin: 0 0 1.5rem;
      opacity: 0.95;
    }

    .devices {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin: 2rem 0;
    }

    .device {
      font-size: 3rem;
      padding: 1rem;
      border-radius: 1rem;
      background: rgb(255 255 255 / 10%);
    }

    .not-supported {
      opacity: 0.5;
      text-decoration: line-through;
    }

    .supported {
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }

    .arrow {
      font-size: 2rem;
      opacity: 0.7;
    }

    .hint {
      font-size: 0.95rem;
      opacity: 0.85;
      background: rgb(255 255 255 / 10%);
      padding: 1rem;
      border-radius: 0.5rem;
    }

    strong {
      font-weight: 600;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopRequired {}
