import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero-section" aria-labelledby="hero-title">
      <!-- Ambient background lighting -->
      <div class="ambient-glow glow-1" aria-hidden="true"></div>
      <div class="ambient-glow glow-2" aria-hidden="true"></div>

      <div class="container">
        <div class="hero-layout">
          
          <!-- Left Column: Content & Actions -->
          <div class="hero-content">
            <!-- Status indicator badge -->
            <div class="status-pill animate-fade-in">
              <span class="status-dot" aria-hidden="true"></span>
              <span class="status-label">{{ profile().status }}</span>
            </div>

            <!-- Main Title -->
            <h1 id="hero-title" class="hero-title animate-fade-in">
              Ingeniero de Software <span class="gradient-text">Full Stack & Mobile</span>, especializado en Flutter, Tiempo Real y 3D.
            </h1>

            <!-- Subtitle -->
            <p class="hero-description animate-fade-in">
              Soy <strong>{{ profile().name }}</strong>. Ingeniero en Sistemas Computacionales (TESH) con experiencia profesional en 
              <strong>RC Lighting</strong> desarrollando streaming de baja latencia con <strong>NDI & GoPro</strong>, renderizado 3D con <strong>Three.js</strong>, 
              ecosistemas móviles con <strong>Flutter</strong> y arquitecturas cloud en <strong>Firebase</strong>.
            </p>

            <!-- CTA Buttons -->
            <div class="hero-actions animate-fade-in">
              <a
                [href]="profile().linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-linkedin"
                aria-label="Ver perfil de LinkedIn de Alejandro Santiago Mata"
              >
                <svg class="btn-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn • {{ profile().name }}</span>
              </a>

              <a href="#proyectos" class="btn btn-primary" aria-label="Explorar proyectos del portafolio">
                <svg class="btn-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                Proyectos
              </a>

              <a
                [href]="profile().githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
                aria-label="Ir al repositorio en GitHub de AlexSantiago25"
              >
                <svg class="btn-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>

              <button
                type="button"
                class="btn btn-outline"
                (click)="copyEmail()"
                aria-label="Copiar correo de contacto al portapapeles"
              >
                <svg class="btn-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                {{ emailCopied() ? '¡Copiado!' : 'Copiar Correo' }}
              </button>
            </div>
          </div>

          <!-- Right Column: Profile Photo Showcase Card -->
          <div class="hero-visual animate-fade-in">
            <div class="photo-card-wrapper">
              
              <!-- Washi Tape / Diurex pegando la foto central -->
              <span class="tape-strip tape-top-center" aria-hidden="true"></span>
              
              <!-- Subtle decorative rings & ambient glow -->
              <div class="photo-ambient-glow" aria-hidden="true"></div>
              
              <div class="photo-frame">
                <img
                  [src]="profile().photoUrl"
                  [alt]="'Fotografía profesional de ' + profile().name"
                  class="profile-img"
                  width="380"
                  height="480"
                  priority
                />
                <div class="photo-gradient-overlay" aria-hidden="true"></div>
              </div>

              <!-- Floating Interactive Badges estilo Post-it con Chinchetas -->
              <div class="floating-badge badge-top-right">
                <span class="pushpin pushpin-gold pushpin-top-left" aria-hidden="true"></span>
                <span class="badge-icon" aria-hidden="true">🚀</span>
                <div class="badge-text-box">
                  <span class="badge-title">Flutter & Dart</span>
                  <span class="badge-sub">Mobile & Web</span>
                </div>
              </div>

              <div class="floating-badge badge-bottom-left">
                <span class="pushpin pushpin-cyan pushpin-top-left" aria-hidden="true"></span>
                <span class="badge-icon" aria-hidden="true">⚡</span>
                <div class="badge-text-box">
                  <span class="badge-title">RC Lighting</span>
                  <span class="badge-sub">Full Stack</span>
                </div>
              </div>

              <div class="floating-badge badge-bottom-right">
                <span class="pushpin pushpin-top-right" aria-hidden="true"></span>
                <span class="badge-icon" aria-hidden="true">🎓</span>
                <div class="badge-text-box">
                  <span class="badge-title">TESH</span>
                  <span class="badge-sub">Ing. Sistemas</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- Metric highlights bar -->
        <div class="metrics-grid animate-fade-in">
          <div class="metric-card glass-panel">
            <span class="metric-num">RC Lighting</span>
            <span class="metric-label">Desarrollador Full Stack</span>
            <span class="metric-desc">Febrero 2024 – Agosto 2026</span>
          </div>

          <div class="metric-card glass-panel">
            <span class="metric-num">TESH</span>
            <span class="metric-label">Ing. en Sistemas Comp.</span>
            <span class="metric-desc">Septiembre 2021 – Febrero 2026</span>
          </div>

          <div class="metric-card glass-panel">
            <span class="metric-num">3 Apps</span>
            <span class="metric-label">Portafolio Especializado</span>
            <span class="metric-desc">BesMe • StoryLab • PaperPlan</span>
          </div>

          <div class="metric-card glass-panel">
            <span class="metric-num">NDI & 3D</span>
            <span class="metric-label">Streaming & Three.js</span>
            <span class="metric-desc">GoPro & Body Tracking</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      position: relative;
      padding: 4.5rem 0 3.5rem;
      overflow: hidden;
    }

    .ambient-glow {
      position: absolute;
      width: 480px;
      height: 480px;
      border-radius: 50%;
      pointer-events: none;
      filter: blur(120px);
      z-index: 0;
      opacity: 0.18;
    }

    .glow-1 {
      top: -60px;
      left: 10%;
      background: #6366f1;
    }

    .glow-2 {
      top: 100px;
      right: 10%;
      background: #38bdf8;
    }

    .hero-layout {
      display: grid;
      grid-template-columns: 1.25fr 1fr;
      gap: 3.5rem;
      align-items: center;
      margin-bottom: 3.5rem;
      position: relative;
      z-index: 1;
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.25);
      padding: 0.4rem 1.1rem;
      border-radius: var(--radius-full);
      margin-bottom: 1.75rem;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #10b981;
      box-shadow: 0 0 10px #10b981;
      animation: pulseGlow 2s infinite ease-in-out;
    }

    .status-label {
      color: #34d399;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .hero-title {
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 800;
      line-height: 1.2;
      letter-spacing: -0.03em;
      margin-bottom: 1.35rem;
      color: var(--text-primary);
    }

    .hero-description {
      font-size: clamp(0.98rem, 1.8vw, 1.12rem);
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 2.2rem;
    }

    .hero-description strong {
      color: var(--text-primary);
      font-weight: 600;
    }

    .hero-actions {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      padding: 0.8rem 1.35rem;
      border-radius: var(--radius-md);
      font-size: 0.92rem;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: all var(--transition-fast);
      border: 1px solid transparent;
    }

    .btn-linkedin {
      background: #0077b5;
      color: #ffffff;
      box-shadow: 0 4px 16px rgba(0, 119, 181, 0.4);
    }

    .btn-linkedin:hover {
      background: #008cd6;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 119, 181, 0.6);
    }

    .btn-primary {
      background: var(--gradient-brand);
      color: #ffffff;
      box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.55);
    }

    .btn-secondary {
      background: var(--bg-surface);
      color: var(--text-primary);
      border-color: var(--border-subtle);
    }

    .btn-secondary:hover {
      background: var(--bg-surface-hover);
      border-color: var(--border-medium);
      transform: translateY(-2px);
    }

    .btn-outline {
      background: transparent;
      color: var(--text-secondary);
      border-color: var(--border-subtle);
    }

    .btn-outline:hover {
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-primary);
      border-color: var(--accent-cyan);
    }

    /* Right Column: Visual Photo Card */
    .hero-visual {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .photo-card-wrapper {
      position: relative;
      width: 100%;
      max-width: 380px;
    }

    .photo-ambient-glow {
      position: absolute;
      inset: -15px;
      background: linear-gradient(135deg, rgba(56, 189, 248, 0.35) 0%, rgba(129, 140, 248, 0.4) 50%, rgba(236, 72, 153, 0.3) 100%);
      border-radius: calc(var(--radius-lg) + 12px);
      filter: blur(28px);
      opacity: 0.65;
      z-index: 0;
      animation: pulseGlow 4s infinite ease-in-out;
    }

    .photo-frame {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 460px;
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 2px solid rgba(255, 255, 255, 0.16);
      box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.7);
      background: #090e18;
    }

    .profile-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 20%;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .photo-card-wrapper:hover .profile-img {
      transform: scale(1.04);
    }

    .photo-gradient-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 60%, rgba(8, 11, 17, 0.75) 100%);
      pointer-events: none;
    }

    /* Floating Badges */
    .floating-badge {
      position: absolute;
      z-index: 3;
      display: flex;
      align-items: center;
      gap: 0.65rem;
      background: rgba(15, 23, 42, 0.88);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 0.6rem 0.95rem;
      border-radius: var(--radius-md);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 15px -3px rgba(99, 102, 241, 0.3);
      animation: floatSlow 4s ease-in-out infinite;
    }

    .badge-icon {
      font-size: 1.25rem;
    }

    .badge-text-box {
      display: flex;
      flex-direction: column;
    }

    .badge-title {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.2;
    }

    .badge-sub {
      font-size: 0.72rem;
      color: var(--accent-cyan);
      font-weight: 600;
    }

    .badge-top-right {
      top: -15px;
      right: -20px;
      transform: rotate(3deg);
      animation-delay: 0s;
    }

    .badge-bottom-left {
      bottom: 25px;
      left: -25px;
      transform: rotate(-3deg);
      animation-delay: 1.5s;
    }

    .badge-bottom-right {
      bottom: -15px;
      right: 15px;
      transform: rotate(2deg);
      animation-delay: 2.8s;
    }

    /* Metrics Grid */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
      width: 100%;
      text-align: left;
    }

    .metric-card {
      padding: 1.25rem 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      transition: transform var(--transition-smooth), border-color var(--transition-smooth);
    }

    .metric-card:hover {
      transform: translateY(-3px);
      border-color: rgba(99, 102, 241, 0.35);
    }

    .metric-num {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--text-primary);
      background: var(--gradient-brand);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .metric-label {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .metric-desc {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    @media (max-width: 1024px) {
      .hero-layout {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
      .hero-content {
        align-items: center;
        text-align: center;
      }
      .hero-actions {
        justify-content: center;
      }
      .badge-top-right {
        right: 0;
      }
      .badge-bottom-left {
        left: 0;
      }
    }

    @media (max-width: 800px) {
      .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 540px) {
      .photo-frame {
        height: 380px;
      }
      .floating-badge {
        padding: 0.45rem 0.75rem;
      }
      .metrics-grid {
        grid-template-columns: 1fr;
      }
      .hero-actions {
        flex-direction: column;
        width: 100%;
      }
      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class HeroComponent {
  readonly portfolioService = inject(PortfolioService);
  readonly profile = this.portfolioService.profile;
  readonly emailCopied = signal<boolean>(false);

  copyEmail(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.profile().email);
      this.emailCopied.set(true);
      setTimeout(() => this.emailCopied.set(false), 2500);
    }
  }
}
