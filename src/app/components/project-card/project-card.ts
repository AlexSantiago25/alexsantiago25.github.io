import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Project } from '../../models/project.model';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="project-card glass-panel" [attr.aria-labelledby]="'project-title-' + project().id">
      <span class="tape-strip tape-top-left" aria-hidden="true"></span>
      <div class="card-media">
        <img
          [src]="project().coverImage"
          [alt]="'Captura de pantalla de ' + project().title"
          class="card-img"
          loading="lazy"
          width="600"
          height="340"
        />
        <div class="media-overlay" aria-hidden="true"></div>

        <div class="media-badges">
          <span class="badge" [class]="project().badgeStyle">
            {{ project().badgeLabel }}
          </span>
          <span class="screenshot-count">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            {{ project().screenshots.length }} capturas
          </span>
        </div>

        <button
          type="button"
          class="quick-view-btn"
          (click)="portfolioService.openProjectModal(project())"
          [attr.aria-label]="'Abrir galería y ficha técnica de ' + project().title"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="14"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
          Explorar Galería & Arquitectura
        </button>
      </div>

      <div class="card-body">
        <div class="card-header">
          <div class="title-row">
            <h3 [id]="'project-title-' + project().id" class="project-name">
              {{ project().title }}
            </h3>
            <span class="category-tag">{{ project().categoryLabel }}</span>
          </div>
          <p class="project-tagline">{{ project().tagline }}</p>
        </div>

        <p class="project-summary">
          {{ project().summary }}
        </p>

        <div class="highlights-box">
          <span class="highlights-label">Desafíos de Ingeniería:</span>
          <ul class="highlights-list">
            @for (item of project().highlights.slice(0, 2); track item) {
              <li class="highlight-item">
                <svg class="check-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>{{ item }}</span>
              </li>
            }
          </ul>
        </div>

        <div class="tech-tags" aria-label="Tecnologías utilizadas">
          @for (tech of project().technologies.slice(0, 5); track tech.name) {
            <span class="tech-pill mono">{{ tech.name }}</span>
          }
          @if (project().technologies.length > 5) {
            <span class="tech-pill-more mono">+{{ project().technologies.length - 5 }} más</span>
          }
        </div>

        <div class="card-actions">
          <button
            type="button"
            class="btn btn-primary"
            (click)="portfolioService.openProjectModal(project())"
            [attr.aria-label]="'Ver detalles técnicos completos de ' + project().title"
          >
            Ficha Técnica & Fotos
          </button>

          <a
            [href]="project().githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-github"
            [attr.aria-label]="'Ver código fuente de ' + project().title + ' en GitHub'"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Código
          </a>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .project-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: transform var(--transition-smooth), border-color var(--transition-smooth), box-shadow var(--transition-smooth);
      position: relative;
    }

    .project-card:hover {
      transform: translateY(-5px);
      border-color: rgba(99, 102, 241, 0.4);
      box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.6), 0 0 24px -6px rgba(99, 102, 241, 0.25);
    }

    .card-media {
      position: relative;
      width: 100%;
      height: 240px;
      overflow: hidden;
      background: var(--bg-secondary);
    }

    .card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      transition: transform 0.5s ease;
    }

    .project-card:hover .card-img {
      transform: scale(1.05);
    }

    .media-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(8, 11, 17, 0.2) 0%, rgba(8, 11, 17, 0.85) 100%);
    }

    .media-badges {
      position: absolute;
      top: 1rem;
      left: 1rem;
      right: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 2;
    }

    .screenshot-count {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      color: #f1f5f9;
      font-size: 0.75rem;
      padding: 0.25rem 0.65rem;
      border-radius: var(--radius-full);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .quick-view-btn {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      opacity: 0;
      pointer-events: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(8, 11, 17, 0.9);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border-medium);
      color: #ffffff;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-full);
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
      z-index: 3;
    }

    .project-card:hover .quick-view-btn {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }

    .quick-view-btn:hover {
      background: var(--accent-indigo);
      border-color: var(--accent-indigo);
    }

    .card-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 1.1rem;
    }

    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 0.75rem;
    }

    .project-name {
      font-size: 1.35rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--text-primary);
    }

    .category-tag {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .project-tagline {
      font-size: 0.88rem;
      color: var(--accent-cyan);
      font-weight: 500;
      margin-top: 0.2rem;
    }

    .project-summary {
      font-size: 0.92rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .highlights-box {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 0.85rem 1rem;
    }

    .highlights-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 0.4rem;
    }

    .highlights-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .highlight-item {
      display: flex;
      align-items: flex-start;
      gap: 0.45rem;
      font-size: 0.82rem;
      color: var(--text-secondary);
      line-height: 1.45;
    }

    .check-icon {
      flex-shrink: 0;
      margin-top: 0.15rem;
      color: var(--accent-cyan);
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: auto;
    }

    .tech-pill {
      font-size: 0.72rem;
      padding: 0.25rem 0.6rem;
      border-radius: var(--radius-sm);
      background: rgba(255, 255, 255, 0.04);
      color: var(--text-secondary);
      border: 1px solid var(--border-subtle);
    }

    .tech-pill-more {
      font-size: 0.72rem;
      padding: 0.25rem 0.5rem;
      color: var(--text-muted);
    }

    .card-actions {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.75rem;
      padding-top: 0.5rem;
      border-top: 1px solid var(--border-subtle);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      padding: 0.65rem 1rem;
      border-radius: var(--radius-sm);
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: all var(--transition-fast);
      border: 1px solid transparent;
    }

    .btn-primary {
      background: rgba(99, 102, 241, 0.15);
      color: #818cf8;
      border-color: rgba(99, 102, 241, 0.3);
    }

    .btn-primary:hover {
      background: #6366f1;
      color: #ffffff;
      border-color: #6366f1;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
    }

    .btn-github {
      background: rgba(255, 255, 255, 0.04);
      color: var(--text-secondary);
      border-color: var(--border-subtle);
    }

    .btn-github:hover {
      background: rgba(255, 255, 255, 0.09);
      color: var(--text-primary);
      border-color: var(--border-medium);
    }
  `]
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  readonly portfolioService = inject(PortfolioService);
}
