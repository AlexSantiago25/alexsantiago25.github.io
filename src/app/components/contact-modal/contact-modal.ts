import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-contact-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'close()',
    'role': 'dialog',
    'aria-modal': 'true',
    '[attr.aria-labelledby]': '"contact-modal-title"'
  },
  template: `
    @if (portfolioService.isContactModalOpen()) {
      <div class="modal-backdrop" (click)="close()">
        <div class="modal-card glass-panel" (click)="$event.stopPropagation()">
          
          <div class="modal-header">
            <div>
              <span class="badge badge-cyan">Contacto Directo & Redes</span>
              <h2 id="contact-modal-title" class="modal-title">Hablemos de tu Proyecto</h2>
            </div>
            
            <button
              type="button"
              class="close-btn"
              (click)="close()"
              aria-label="Cerrar modal de contacto"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <p class="modal-intro">
              ¿Tienes una vacante de desarrollador Full Stack o Mobile, o buscas colaborar en una aplicación con Flutter, Firebase y 3D? Puedes contactarme directamente por LinkedIn o correo.
            </p>

            <div class="contact-channels">
              <!-- LinkedIn Card -->
              <div class="channel-card glass-panel channel-linkedin">
                <div class="channel-icon icon-linkedin">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <div class="channel-info">
                  <span class="channel-label">LinkedIn Profesional</span>
                  <span class="channel-value">{{ profile().name }}</span>
                </div>
                <a
                  [href]="profile().linkedinUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-connect-linkedin"
                >
                  Conectar
                </a>
              </div>

              <!-- Email Card -->
              <div class="channel-card glass-panel">
                <div class="channel-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div class="channel-info">
                  <span class="channel-label">Correo Electrónico</span>
                  <span class="channel-value mono">{{ profile().email }}</span>
                </div>
                <button
                  type="button"
                  class="btn btn-copy"
                  (click)="copyEmail()"
                >
                  {{ copied() ? 'Copiado' : 'Copiar' }}
                </button>
              </div>

              <!-- GitHub Card -->
              <div class="channel-card glass-panel">
                <div class="channel-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <div class="channel-info">
                  <span class="channel-label">GitHub</span>
                  <span class="channel-value mono">&#64;{{ profile().githubUser }}</span>
                </div>
                <a
                  [href]="profile().githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-copy"
                >
                  Abrir
                </a>
              </div>
            </div>

            <div class="direct-mail-cta">
              <a [href]="'mailto:' + profile().email + '?subject=Contacto%20desde%20Portafolio%20Web'" class="btn btn-send-email">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Abrir en Cliente de Correo
              </a>
            </div>
          </div>

        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(4, 7, 13, 0.82);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.2s ease;
    }

    .modal-card {
      width: 100%;
      max-width: 560px;
      background: #0f172a;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: 2.2rem;
      box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.7);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.25rem;
    }

    .modal-title {
      font-size: 1.45rem;
      font-weight: 800;
      color: var(--text-primary);
      margin-top: 0.4rem;
    }

    .close-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .close-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
    }

    .modal-intro {
      font-size: 0.92rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .contact-channels {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .channel-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.2rem;
      border-radius: var(--radius-md);
    }

    .channel-linkedin {
      border: 1px solid rgba(0, 119, 181, 0.35);
      background: rgba(0, 119, 181, 0.08);
    }

    .icon-linkedin {
      background: #0077b5 !important;
      color: #ffffff !important;
    }

    .channel-icon {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-sm);
      background: rgba(56, 189, 248, 0.1);
      color: #38bdf8;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .channel-info {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .channel-label {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
    }

    .channel-value {
      font-size: 0.92rem;
      color: var(--text-primary);
      font-weight: 600;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border-radius: var(--radius-sm);
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: all var(--transition-fast);
      border: 1px solid transparent;
    }

    .btn-connect-linkedin {
      padding: 0.5rem 1rem;
      background: #0077b5;
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 119, 181, 0.35);
    }

    .btn-connect-linkedin:hover {
      background: #008cd6;
      transform: translateY(-1px);
    }

    .btn-copy {
      padding: 0.45rem 0.85rem;
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-secondary);
      border-color: var(--border-subtle);
    }

    .btn-copy:hover {
      background: rgba(255, 255, 255, 0.12);
      color: var(--text-primary);
    }

    .direct-mail-cta {
      display: flex;
    }

    .btn-send-email {
      width: 100%;
      padding: 0.8rem 1.4rem;
      background: var(--gradient-brand);
      color: #ffffff;
      box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);
    }

    .btn-send-email:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 22px rgba(99, 102, 241, 0.5);
    }
  `]
})
export class ContactModalComponent {
  readonly portfolioService = inject(PortfolioService);
  readonly profile = this.portfolioService.profile;
  readonly copied = signal<boolean>(false);

  close(): void {
    this.portfolioService.toggleContactModal(false);
  }

  copyEmail(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.profile().email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2200);
    }
  }
}
