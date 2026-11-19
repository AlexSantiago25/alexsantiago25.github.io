import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-project-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscape()',
    '(document:keydown.arrowleft)': 'onArrowLeft()',
    '(document:keydown.arrowright)': 'onArrowRight()',
    'role': 'dialog',
    'aria-modal': 'true',
    '[attr.aria-labelledby]': '"modal-title"'
  },
  template: `
    @if (project(); as p) {
      <div class="modal-backdrop" (click)="close()">
        <div class="modal-container glass-panel" (click)="$event.stopPropagation()">
          
          <div class="modal-header">
            <div class="header-info">
              <div class="badge-row">
                <span class="badge" [class]="p.badgeStyle">{{ p.badgeLabel }}</span>
                <span class="category-badge">{{ p.categoryLabel }}</span>
              </div>
              <h2 id="modal-title" class="modal-title">{{ p.title }}</h2>
              <p class="modal-subtitle">{{ p.subtitle }}</p>
            </div>

            <button
              type="button"
              class="close-btn"
              (click)="close()"
              aria-label="Cerrar ventana de detalles"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div class="modal-scroll-area">
            
            <section class="gallery-section" aria-label="Galería interactiva de capturas de pantalla">
              <div class="viewer-wrapper">
                @if (currentScreenshot(); as s) {
                  <div class="viewer-stage">
                    <img
                      [src]="s.url"
                      [alt]="s.title"
                      class="viewer-img"
                      width="800"
                      height="480"
                    />
                    
                    <button
                      type="button"
                      class="nav-arrow nav-prev"
                      (click)="portfolioService.prevScreenshot()"
                      aria-label="Captura anterior"
                    >
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                        <polyline points="15 18 9 12 15 6"/>
                      </svg>
                    </button>

                    <button
                      type="button"
                      class="nav-arrow nav-next"
                      (click)="portfolioService.nextScreenshot()"
                      aria-label="Siguiente captura"
                    >
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </button>

                    <div class="viewer-counter">
                      {{ portfolioService.activeScreenshotIndex() + 1 }} / {{ p.screenshots.length }}
                    </div>
                  </div>

                  <div class="viewer-caption">
                    <strong class="caption-title">{{ s.title }}</strong>
                    <p class="caption-desc">{{ s.description }}</p>
                  </div>
                }
              </div>

              <div class="thumbnails-track" role="tablist" aria-label="Seleccionar captura">
                @for (thumb of p.screenshots; track thumb.url; let idx = $index) {
                  <button
                    type="button"
                    role="tab"
                    class="thumb-btn"
                    [class.active]="portfolioService.activeScreenshotIndex() === idx"
                    [attr.aria-selected]="portfolioService.activeScreenshotIndex() === idx"
                    [attr.aria-label]="'Ver ' + thumb.title"
                    (click)="portfolioService.setActiveScreenshot(idx)"
                  >
                    <img
                      [src]="thumb.url"
                      [alt]="thumb.title"
                      class="thumb-img"
                      loading="lazy"
                      width="90"
                      height="56"
                    />
                  </button>
                }
              </div>
            </section>

            <div class="tabs-bar" role="tablist" aria-label="Secciones de detalle">
              <button
                type="button"
                role="tab"
                class="tab-btn"
                [class.active]="activeTab() === 'overview'"
                [attr.aria-selected]="activeTab() === 'overview'"
                (click)="activeTab.set('overview')"
              >
                Arquitectura & Retos
              </button>
              <button
                type="button"
                role="tab"
                class="tab-btn"
                [class.active]="activeTab() === 'features'"
                [attr.aria-selected]="activeTab() === 'features'"
                (click)="activeTab.set('features')"
              >
                Módulos & Features ({{ p.features.length }})
              </button>
              <button
                type="button"
                role="tab"
                class="tab-btn"
                [class.active]="activeTab() === 'tech'"
                [attr.aria-selected]="activeTab() === 'tech'"
                (click)="activeTab.set('tech')"
              >
                Stack Técnico ({{ p.technologies.length }})
              </button>
            </div>

            @if (activeTab() === 'overview') {
              <div class="tab-panel animate-fade-in" role="tabpanel">
                <div class="panel-section">
                  <h3 class="section-heading">Descripción del Proyecto</h3>
                  <p class="body-text">{{ p.fullOverview }}</p>
                  @if (p.inspiration) {
                    <div class="inspiration-box">
                      <span class="inspiration-icon" aria-hidden="true">💡</span>
                      <p class="inspiration-text">{{ p.inspiration }}</p>
                    </div>
                  }
                </div>

                <div class="panel-section">
                  <h3 class="section-heading">Puntos Clave de Ingeniería & Rendimiento</h3>
                  <div class="highlights-grid">
                    @for (hl of p.highlights; track hl) {
                      <div class="highlight-card">
                        <div class="highlight-bullet" aria-hidden="true">⚡</div>
                        <p class="highlight-text">{{ hl }}</p>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }

            @if (activeTab() === 'features') {
              <div class="tab-panel animate-fade-in" role="tabpanel">
                <div class="features-grid">
                  @for (feat of p.features; track feat.title) {
                    <div class="feature-card glass-panel">
                      <h4 class="feature-title">{{ feat.title }}</h4>
                      <p class="feature-desc">{{ feat.description }}</p>
                    </div>
                  }
                </div>
              </div>
            }

            @if (activeTab() === 'tech') {
              <div class="tab-panel animate-fade-in" role="tabpanel">
                <div class="tech-grid">
                  @for (tech of p.technologies; track tech.name) {
                    <div class="tech-item glass-panel">
                      <span class="tech-name mono">{{ tech.name }}</span>
                      <span class="tech-cat">{{ tech.category }}</span>
                    </div>
                  }
                </div>
              </div>
            }

          </div>

          <div class="modal-footer">
            <div class="footer-note">
              Repositorio público disponible en GitHub
            </div>
            
            <div class="footer-actions">
              <button type="button" class="btn btn-ghost" (click)="close()">
                Cerrar
              </button>

              <a
                [href]="p.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-github-modal"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Ver Repositorio Completo
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
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.25s ease;
    }

    .modal-container {
      width: 100%;
      max-width: 960px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      border-radius: var(--radius-lg);
      background: #0d131f;
      border: 1px solid var(--border-medium);
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px -10px rgba(99, 102, 241, 0.3);
      overflow: hidden;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 1.5rem 2rem 1.2rem;
      border-bottom: 1px solid var(--border-subtle);
      background: rgba(15, 23, 42, 0.7);
    }

    .badge-row {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 0.5rem;
    }

    .category-badge {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }

    .modal-title {
      font-size: 1.65rem;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.02em;
    }

    .modal-subtitle {
      font-size: 0.95rem;
      color: var(--accent-cyan);
      font-weight: 500;
      margin-top: 0.2rem;
    }

    .close-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
      flex-shrink: 0;
    }

    .close-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
      border-color: var(--border-medium);
    }

    .modal-scroll-area {
      overflow-y: auto;
      padding: 1.5rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    .viewer-stage {
      position: relative;
      width: 100%;
      height: 420px;
      border-radius: var(--radius-md);
      overflow: hidden;
      background: #05080e;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-subtle);
    }

    .viewer-img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      user-select: none;
    }

    .nav-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(8, 11, 17, 0.75);
      backdrop-filter: blur(8px);
      border: 1px solid var(--border-subtle);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
      z-index: 5;
    }

    .nav-arrow:hover {
      background: var(--accent-indigo);
      border-color: var(--accent-indigo);
      transform: translateY(-50%) scale(1.08);
    }

    .nav-prev { left: 1rem; }
    .nav-next { right: 1rem; }

    .viewer-counter {
      position: absolute;
      bottom: 0.85rem;
      right: 0.85rem;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(6px);
      padding: 0.3rem 0.7rem;
      border-radius: var(--radius-full);
      font-size: 0.78rem;
      color: #f1f5f9;
      font-family: var(--font-mono);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .viewer-caption {
      margin-top: 0.85rem;
      padding: 0.75rem 1rem;
      background: rgba(255, 255, 255, 0.02);
      border-left: 3px solid var(--accent-cyan);
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    }

    .caption-title {
      font-size: 0.95rem;
      color: var(--text-primary);
      display: block;
      margin-bottom: 0.2rem;
    }

    .caption-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .thumbnails-track {
      display: flex;
      gap: 0.6rem;
      overflow-x: auto;
      padding: 0.75rem 0 0.25rem;
    }

    .thumb-btn {
      width: 90px;
      height: 56px;
      border-radius: var(--radius-sm);
      overflow: hidden;
      border: 2px solid transparent;
      padding: 0;
      background: #090d16;
      cursor: pointer;
      flex-shrink: 0;
      opacity: 0.6;
      transition: all var(--transition-fast);
    }

    .thumb-btn.active {
      opacity: 1;
      border-color: var(--accent-cyan);
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }

    .thumb-btn:hover {
      opacity: 0.9;
    }

    .thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .tabs-bar {
      display: flex;
      gap: 0.5rem;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 0.5rem;
    }

    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      font-size: 0.92rem;
      font-weight: 600;
      padding: 0.6rem 1rem;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .tab-btn:hover {
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.03);
    }

    .tab-btn.active {
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
      box-shadow: inset 0 -2px 0 #38bdf8;
    }

    .section-heading {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }

    .body-text {
      color: var(--text-secondary);
      line-height: 1.7;
      font-size: 0.95rem;
    }

    .inspiration-box {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.85rem 1.1rem;
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.2);
      border-radius: var(--radius-sm);
    }

    .inspiration-icon {
      font-size: 1.2rem;
    }

    .inspiration-text {
      font-size: 0.88rem;
      color: #fcd34d;
      margin: 0;
    }

    .highlights-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.85rem;
      margin-top: 0.75rem;
    }

    .highlight-card {
      display: flex;
      gap: 0.75rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 0.85rem;
    }

    .highlight-bullet {
      color: #818cf8;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .highlight-text {
      font-size: 0.86rem;
      color: var(--text-secondary);
      line-height: 1.45;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .feature-card {
      padding: 1.1rem;
    }

    .feature-title {
      font-size: 0.98rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.4rem;
    }

    .feature-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
    }

    .tech-item {
      padding: 0.75rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .tech-name {
      font-size: 0.88rem;
      color: var(--text-primary);
    }

    .tech-cat {
      font-size: 0.72rem;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    .modal-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.2rem 2rem;
      border-top: 1px solid var(--border-subtle);
      background: rgba(15, 23, 42, 0.7);
    }

    .footer-note {
      font-size: 0.82rem;
      color: var(--text-muted);
    }

    .footer-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.65rem 1.2rem;
      border-radius: var(--radius-sm);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: all var(--transition-fast);
      border: 1px solid transparent;
    }

    .btn-ghost {
      color: var(--text-secondary);
      background: transparent;
    }

    .btn-ghost:hover {
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.05);
    }

    .btn-github-modal {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.65rem 1.2rem;
      border-radius: var(--radius-sm);
      font-size: 0.9rem;
      font-weight: 600;
      background: var(--gradient-brand);
      color: #ffffff;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
      transition: all var(--transition-fast);
    }

    .btn-github-modal:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(99, 102, 241, 0.6);
    }

    @media (max-width: 768px) {
      .modal-container {
        max-height: 96vh;
      }
      .viewer-stage {
        height: 280px;
      }
      .highlights-grid, .features-grid, .tech-grid {
        grid-template-columns: 1fr;
      }
      .modal-header, .modal-scroll-area, .modal-footer {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
      }
      .footer-note {
        display: none;
      }
    }
  `]
})
export class ProjectModalComponent {
  readonly portfolioService = inject(PortfolioService);
  readonly project = this.portfolioService.selectedProject;
  readonly currentScreenshot = this.portfolioService.currentScreenshot;

  readonly activeTab = signal<'overview' | 'features' | 'tech'>('overview');

  close(): void {
    this.portfolioService.closeProjectModal();
  }

  onEscape(): void {
    this.close();
  }

  onArrowLeft(): void {
    this.portfolioService.prevScreenshot();
  }

  onArrowRight(): void {
    this.portfolioService.nextScreenshot();
  }
}
