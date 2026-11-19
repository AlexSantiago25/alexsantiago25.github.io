import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="skills-section" aria-labelledby="skills-title">
      <div class="container">
        
        <div class="section-header">
          <span class="badge badge-cyan">Capacidades Técnicas</span>
          <h2 id="skills-title" class="section-title">
            Especialización en <span class="gradient-text">Ingeniería & Arquitectura</span>
          </h2>
          <p class="section-desc">
            Enfoque en código estructurado, rendimiento nativo a 60/120 FPS y sistemas desacoplados de alta mantenibilidad.
          </p>
        </div>

        <div class="skills-grid">
          @for (group of profile().skills; track group.category) {
            <div class="skill-group glass-panel">
              <div class="group-header">
                <div class="header-indicator" aria-hidden="true"></div>
                <h3 class="group-title">{{ group.category }}</h3>
              </div>

              <div class="skills-list">
                @for (skill of group.items; track skill) {
                  <div class="skill-item">
                    <svg class="check-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span class="skill-name">{{ skill }}</span>
                  </div>
                }
              </div>
            </div>
          }
        </div>

        <div class="principles-banner glass-panel">
          <div class="principle">
            <span class="principle-icon" aria-hidden="true">🛡️</span>
            <div>
              <h4 class="principle-title">Offline-First & Privacidad</h4>
              <p class="principle-desc">Persistencia local con SQLite y JSON para funcionamiento continuo sin depender de conexión.</p>
            </div>
          </div>

          <div class="principle">
            <span class="principle-icon" aria-hidden="true">⚡</span>
            <div>
              <h4 class="principle-title">Reactividad & Rendimiento</h4>
              <p class="principle-desc">Arquitecturas reactivas con Riverpod, Provider y Signals para un flujo de datos unidireccional y predecible.</p>
            </div>
          </div>

          <div class="principle">
            <span class="principle-icon" aria-hidden="true">🎨</span>
            <div>
              <h4 class="principle-title">Lienzos & Gráficos 2D/3D</h4>
              <p class="principle-desc">Experiencia en Three.js, CustomPainter, detección de colisiones 2D y manipulación de vectores en tiempo real.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-section {
      padding: 5rem 0;
      position: relative;
    }

    .section-header {
      text-align: center;
      max-width: 700px;
      margin: 0 auto 3.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .section-title {
      font-size: clamp(1.8rem, 3.5vw, 2.6rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--text-primary);
    }

    .section-desc {
      font-size: 1rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
      margin-bottom: 3rem;
    }

    .skill-group {
      padding: 1.5rem;
      border-radius: var(--radius-md);
      transition: transform var(--transition-smooth), border-color var(--transition-smooth);
    }

    .skill-group:hover {
      transform: translateY(-4px);
      border-color: rgba(99, 102, 241, 0.4);
    }

    .group-header {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 1.25rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--border-subtle);
    }

    .header-indicator {
      width: 10px;
      height: 10px;
      border-radius: 2px;
      background: var(--gradient-brand);
    }

    .group-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .skills-list {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .skill-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .check-icon {
      color: #38bdf8;
      flex-shrink: 0;
    }

    .skill-name {
      font-size: 0.9rem;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .principles-banner {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      padding: 2rem;
      border-radius: var(--radius-lg);
      background: rgba(15, 23, 42, 0.5);
    }

    .principle {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .principle-icon {
      font-size: 1.8rem;
      flex-shrink: 0;
      line-height: 1;
    }

    .principle-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .principle-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    @media (max-width: 1024px) {
      .skills-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .principles-banner {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 600px) {
      .skills-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SkillsComponent {
  readonly portfolioService = inject(PortfolioService);
  readonly profile = this.portfolioService.profile;
}
