import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ProjectCardComponent } from '../project-card/project-card';

@Component({
  selector: 'app-project-list',
  imports: [ProjectCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="proyectos" class="projects-section" aria-labelledby="projects-title">
      <div class="container">
        
        <!-- Section Header -->
        <div class="section-header">
          <div class="header-left">
            <span class="badge badge-purple">Portafolio Destacado</span>
            <h2 id="projects-title" class="section-title">
              Proyectos de <span class="gradient-text">Ingeniería & Software</span>
            </h2>
            <p class="section-desc">
              Cada proyecto aborda problemas técnicos específicos: desde optimización de memoria en sincronización vectorial hasta motores de inventario espacial en 2D.
            </p>
          </div>

          <!-- Controls: Category filter pills & live search -->
          <div class="header-controls">
            <!-- Search bar -->
            <div class="search-box">
              <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                class="search-input"
                placeholder="Buscar por tecnología (ej: Riverpod, SQLite, Canvas)..."
                [value]="portfolioService.searchQuery()"
                (input)="onSearchInput($event)"
                aria-label="Filtrar proyectos por palabra clave o tecnología"
              />
              @if (portfolioService.searchQuery()) {
                <button
                  type="button"
                  class="clear-search-btn"
                  (click)="portfolioService.setSearchQuery('')"
                  aria-label="Borrar búsqueda"
                >
                  ✕
                </button>
              }
            </div>

            <!-- Categories -->
            <div class="category-tabs" role="tablist" aria-label="Filtrar por categoría">
              <button
                type="button"
                role="tab"
                class="cat-btn"
                [class.active]="portfolioService.activeCategory() === 'all'"
                [attr.aria-selected]="portfolioService.activeCategory() === 'all'"
                (click)="portfolioService.setCategory('all')"
              >
                Todos (3)
              </button>
              <button
                type="button"
                role="tab"
                class="cat-btn"
                [class.active]="portfolioService.activeCategory() === 'mobile'"
                [attr.aria-selected]="portfolioService.activeCategory() === 'mobile'"
                (click)="portfolioService.setCategory('mobile')"
              >
                Móvil & Firebase
              </button>
              <button
                type="button"
                role="tab"
                class="cat-btn"
                [class.active]="portfolioService.activeCategory() === 'creative'"
                [attr.aria-selected]="portfolioService.activeCategory() === 'creative'"
                (click)="portfolioService.setCategory('creative')"
              >
                Creative Suite
              </button>
              <button
                type="button"
                role="tab"
                class="cat-btn"
                [class.active]="portfolioService.activeCategory() === 'gamification'"
                [attr.aria-selected]="portfolioService.activeCategory() === 'gamification'"
                (click)="portfolioService.setCategory('gamification')"
              >
                Gamificación 2D
              </button>
            </div>
          </div>
        </div>

        <!-- Projects Grid -->
        @if (filteredProjects().length > 0) {
          <div class="projects-grid">
            @for (project of filteredProjects(); track project.id) {
              <div class="grid-col">
                <app-project-card [project]="project" />
              </div>
            }
          </div>
        } @else {
          <!-- Empty State -->
          <div class="empty-state glass-panel">
            <div class="empty-icon" aria-hidden="true">🔍</div>
            <h3 class="empty-title">No se encontraron proyectos</h3>
            <p class="empty-desc">
              No hay coincidencias para "{{ portfolioService.searchQuery() }}". Intenta con otro término o restablece los filtros.
            </p>
            <button
              type="button"
              class="btn-reset"
              (click)="resetFilters()"
            >
              Restablecer Filtros
            </button>
          </div>
        }

      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      padding: 4.5rem 0;
      position: relative;
    }

    .section-header {
      margin-bottom: 3rem;
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    .header-left {
      max-width: 750px;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .section-title {
      font-size: clamp(1.8rem, 3.5vw, 2.5rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--text-primary);
    }

    .section-desc {
      font-size: 1rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .header-controls {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .search-box {
      position: relative;
      width: 100%;
      max-width: 480px;
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 2.5rem 0.75rem 2.8rem;
      border-radius: var(--radius-sm);
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);
      font-size: 0.9rem;
      font-family: inherit;
      transition: all var(--transition-fast);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--accent-cyan);
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
    }

    .clear-search-btn {
      position: absolute;
      right: 0.85rem;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 0.85rem;
    }

    .clear-search-btn:hover {
      color: var(--text-primary);
    }

    .category-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .cat-btn {
      padding: 0.5rem 1rem;
      border-radius: var(--radius-full);
      font-size: 0.85rem;
      font-weight: 600;
      border: 1px solid var(--border-subtle);
      background: rgba(255, 255, 255, 0.03);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .cat-btn:hover {
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.07);
      border-color: var(--border-medium);
    }

    .cat-btn.active {
      color: #ffffff;
      background: var(--gradient-brand);
      border-color: transparent;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.75rem;
    }

    .grid-col {
      display: flex;
    }

    .empty-state {
      padding: 4rem 2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      border-radius: var(--radius-lg);
    }

    .empty-icon {
      font-size: 3rem;
    }

    .empty-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .empty-desc {
      color: var(--text-secondary);
      max-width: 440px;
      font-size: 0.95rem;
    }

    .btn-reset {
      margin-top: 0.5rem;
      padding: 0.65rem 1.4rem;
      border-radius: var(--radius-sm);
      background: var(--bg-surface-hover);
      border: 1px solid var(--border-medium);
      color: var(--text-primary);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .btn-reset:hover {
      border-color: var(--accent-cyan);
    }

    @media (max-width: 1100px) {
      .projects-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 700px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
      .search-box {
        max-width: 100%;
      }
    }
  `]
})
export class ProjectListComponent {
  readonly portfolioService = inject(PortfolioService);
  readonly filteredProjects = this.portfolioService.filteredProjects;

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.portfolioService.setSearchQuery(value);
  }

  resetFilters(): void {
    this.portfolioService.setSearchQuery('');
    this.portfolioService.setCategory('all');
  }
}
