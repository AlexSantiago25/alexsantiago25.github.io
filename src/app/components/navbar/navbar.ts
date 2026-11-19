import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="navbar" role="banner">
      <div class="container nav-container">
        <a href="#" class="brand-link" aria-label="Inicio del portafolio de Alejandro Santiago Mata">
          <div class="brand-avatar-box">
            <img
              [src]="profile().photoUrl"
              [alt]="profile().name"
              class="brand-avatar"
              width="40"
              height="40"
            />
            <span class="avatar-status-dot" aria-hidden="true"></span>
          </div>
          <div class="brand-text">
            <span class="brand-name">{{ profile().name }}</span>
            <span class="brand-role">Full Stack & Mobile Engineer</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="nav-links" aria-label="Navegación principal">
          <a href="#experiencia" class="nav-link">Experiencia & Estudios</a>
          <a href="#proyectos" class="nav-link">Proyectos</a>
          <a href="#skills" class="nav-link">Habilidades</a>
          <a href="#contacto" class="nav-link">Contacto</a>
        </nav>

        <!-- Right actions: LinkedIn + GitHub + Contact -->
        <div class="nav-actions">
          <a
            [href]="profile().linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-linkedin-nav"
            aria-label="Perfil de LinkedIn de Alejandro Santiago Mata"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span class="btn-text">LinkedIn</span>
          </a>

          <a
            [href]="profile().githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-ghost"
            aria-label="Ver perfil de GitHub de Alex Santiago"
          >
            <svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span class="btn-text">GitHub</span>
          </a>

          <button
            type="button"
            class="btn btn-primary"
            (click)="portfolioService.toggleContactModal(true)"
            aria-label="Abrir modal de contacto"
          >
            Hablemos
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(8, 11, 17, 0.85);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--border-subtle);
      transition: all 0.25s ease;
    }

    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 72px;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      text-decoration: none;
      color: var(--text-primary);
    }

    .brand-avatar-box {
      position: relative;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      padding: 2px;
      background: linear-gradient(135deg, #38bdf8 0%, #6366f1 100%);
      box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
      flex-shrink: 0;
    }

    .brand-avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      object-position: center 20%;
      display: block;
    }

    .avatar-status-dot {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: #10b981;
      border: 2px solid #080b11;
      box-shadow: 0 0 8px #10b981;
    }

    .brand-text {
      display: flex;
      flex-direction: column;
    }

    .brand-name {
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: -0.02em;
    }

    .brand-role {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.75rem;
    }

    @media (max-width: 900px) {
      .nav-links {
        display: none;
      }
    }

    .nav-link {
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 0.92rem;
      font-weight: 500;
      transition: color var(--transition-fast);
      position: relative;
    }

    .nav-link:hover {
      color: var(--text-primary);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      padding: 0.52rem 0.95rem;
      border-radius: var(--radius-sm);
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: all var(--transition-fast);
      border: 1px solid transparent;
    }

    .btn-linkedin-nav {
      color: #ffffff;
      background: #0077b5;
      box-shadow: 0 2px 8px rgba(0, 119, 181, 0.3);
    }

    .btn-linkedin-nav:hover {
      background: #008cd6;
      transform: translateY(-1px);
    }

    .btn-ghost {
      color: var(--text-secondary);
      background: rgba(255, 255, 255, 0.04);
      border-color: var(--border-subtle);
    }

    .btn-ghost:hover {
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--border-medium);
    }

    .btn-primary {
      background: var(--gradient-brand);
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
    }

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
    }

    @media (max-width: 540px) {
      .btn-text {
        display: none;
      }
      .brand-role {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  readonly portfolioService = inject(PortfolioService);
  readonly profile = this.portfolioService.profile;
}
