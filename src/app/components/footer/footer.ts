import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer id="contacto" class="footer" role="contentinfo">
      <div class="container footer-container">
        
        <!-- Top Footer -->
        <div class="footer-top">
          <div class="footer-brand">
            <div class="brand-row">
              <div class="brand-badge">AS</div>
              <span class="brand-name">{{ profile().name }}</span>
            </div>
            <p class="brand-bio">
              Ingeniero de Software Full Stack & Mobile con experiencia en RC Lighting. Especializado en Flutter, renderizado 3D (Three.js), streaming de video en tiempo real (NDI/GoPro) y arquitecturas Cloud Firestore.
            </p>
            <div class="social-links">
              <!-- LinkedIn with name -->
              <a
                [href]="profile().linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link linkedin-link"
                [attr.aria-label]="'Perfil de LinkedIn de ' + profile().name"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span class="social-text">LinkedIn</span>
              </a>

              <!-- GitHub -->
              <a
                [href]="profile().githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                aria-label="GitHub de AlexSantiago25"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span class="social-text">GitHub</span>
              </a>
            </div>
          </div>

          <div class="footer-nav">
            <h4 class="nav-title">Navegación</h4>
            <a href="#experiencia" class="footer-link">Experiencia & Estudios</a>
            <a href="#proyectos" class="footer-link">Proyectos</a>
            <a href="#skills" class="footer-link">Stack Técnico</a>
          </div>

          <div class="footer-apps">
            <h4 class="nav-title">Apps en Portafolio</h4>
            <a [href]="profile().githubUrl + '/anteros'" target="_blank" rel="noopener noreferrer" class="footer-link">BesMe (Anteros)</a>
            <a [href]="profile().githubUrl + '/storylab'" target="_blank" rel="noopener noreferrer" class="footer-link">StoryLab</a>
            <a [href]="profile().githubUrl + '/loot_room'" target="_blank" rel="noopener noreferrer" class="footer-link">PaperPlan (Loot Room)</a>
          </div>

          <div class="footer-contact">
            <h4 class="nav-title">Contacto & Contratación</h4>
            <p class="contact-text">¿Te gustaría revisar mi CV o agendar una llamada técnica?</p>
            <button
              type="button"
              class="btn btn-contact"
              (click)="portfolioService.toggleContactModal(true)"
            >
              Contactar a Alejandro
            </button>
          </div>
        </div>

        <!-- Bottom Footer -->
        <div class="footer-bottom">
          <p class="copyright">
            © 2026 {{ profile().name }} (&#64;{{ profile().githubUser }}). Desarrollado con Angular 21, TypeScript & Signals.
          </p>

          <a href="#" class="back-to-top" aria-label="Volver arriba">
            <span>Volver arriba</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="18 15 12 9 6 15"/>
            </svg>
          </a>
        </div>

      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #05070c;
      border-top: 1px solid var(--border-subtle);
      padding: 4.5rem 0 2rem;
      position: relative;
    }

    .footer-container {
      display: flex;
      flex-direction: column;
      gap: 3.5rem;
    }

    .footer-top {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
      gap: 3rem;
    }

    .brand-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .brand-badge {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
      background: var(--gradient-brand);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.9rem;
    }

    .brand-name {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .brand-bio {
      font-size: 0.88rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }

    .social-links {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .social-link {
      height: 38px;
      padding: 0 0.9rem;
      border-radius: var(--radius-sm);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      font-weight: 600;
      transition: all var(--transition-fast);
      text-decoration: none;
    }

    .linkedin-link {
      background: rgba(0, 119, 181, 0.15);
      border-color: rgba(0, 119, 181, 0.35);
      color: #7dd3fc;
    }

    .linkedin-link:hover {
      background: #0077b5;
      color: #ffffff;
      border-color: #0077b5;
    }

    .social-link:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
      border-color: var(--border-medium);
      transform: translateY(-2px);
    }

    .nav-title {
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--text-primary);
      margin-bottom: 1.1rem;
    }

    .footer-nav, .footer-apps, .footer-contact {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .footer-link {
      font-size: 0.88rem;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color var(--transition-fast);
    }

    .footer-link:hover {
      color: var(--text-primary);
    }

    .contact-text {
      font-size: 0.88rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 0.5rem;
    }

    .btn-contact {
      padding: 0.65rem 1.2rem;
      border-radius: var(--radius-sm);
      font-size: 0.88rem;
      font-weight: 600;
      background: var(--bg-surface);
      color: var(--text-primary);
      border: 1px solid var(--border-medium);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .btn-contact:hover {
      background: var(--bg-surface-hover);
      border-color: var(--accent-cyan);
      transform: translateY(-1px);
    }

    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 2rem;
      border-top: 1px solid var(--border-subtle);
      font-size: 0.84rem;
      color: var(--text-muted);
    }

    .back-to-top {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color var(--transition-fast);
    }

    .back-to-top:hover {
      color: var(--text-primary);
    }

    @media (max-width: 900px) {
      .footer-top {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }
    }

    @media (max-width: 550px) {
      .footer-top {
        grid-template-columns: 1fr;
      }
      .footer-bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  readonly portfolioService = inject(PortfolioService);
  readonly profile = this.portfolioService.profile;
}
