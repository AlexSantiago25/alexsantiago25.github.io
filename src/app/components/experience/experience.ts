import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experiencia" class="experience-section" aria-labelledby="experience-title">
      <div class="container">
        
        <!-- Section Header -->
        <div class="section-header">
          <span class="badge badge-purple">Trayectoria Profesional & Formación</span>
          <h2 id="experience-title" class="section-title">
            Experiencia Laboral & <span class="gradient-text">Educación</span>
          </h2>
          <p class="section-desc">
            Desarrollo de software de nivel industrial, aplicaciones móviles de alto impacto y sólida formación en Ingeniería en Sistemas Computacionales.
          </p>
        </div>

        <div class="experience-layout">
          <!-- Main Work Experience Column -->
          <div class="work-column">
            <h3 class="column-heading">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              Experiencia Laboral
            </h3>

            @for (job of workExperience(); track job.company) {
              <article class="job-card glass-panel" [attr.aria-labelledby]="'job-' + job.company">
                <span class="pushpin pushpin-top-right pushpin-cyan" aria-hidden="true"></span>
                
                <div class="job-header">
                  <div>
                    <div class="role-badge-row">
                      <span class="company-badge">{{ job.company }}</span>
                      <span class="job-period mono">{{ job.period }}</span>
                    </div>
                    <h4 [id]="'job-' + job.company" class="job-role">{{ job.role }}</h4>
                  </div>
                  <span class="job-type-pill">{{ job.type }}</span>
                </div>

                <p class="job-summary">{{ job.summary }}</p>

                <!-- Key Achievements from CV -->
                <div class="achievements-list">
                  @for (item of job.achievements; track item.title) {
                    <div class="achievement-item">
                      <div class="achievement-bullet" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div class="achievement-content">
                        <strong class="achievement-title">{{ item.title }}:</strong>
                        <span class="achievement-desc"> {{ item.description }}</span>
                      </div>
                    </div>
                  }
                </div>

                <!-- Technologies Used in Job -->
                <div class="job-tech-stack" aria-label="Tecnologías aplicadas en RC Lighting">
                  @for (tech of job.technologies; track tech) {
                    <span class="job-tech-tag mono">{{ tech }}</span>
                  }
                </div>

              </article>
            }
          </div>

          <!-- Education & LinkedIn Column -->
          <div class="side-column">
            <!-- Education Box -->
            <div class="side-block">
              <h3 class="column-heading">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
                Formación Académica
              </h3>

              @for (edu of education(); track edu.institution) {
                <div class="edu-card glass-panel">
                  <span class="pushpin pushpin-top-right pushpin-gold" aria-hidden="true"></span>
                  <div class="edu-badge-row">
                    <span class="badge badge-cyan">{{ edu.status }}</span>
                    <span class="edu-period mono">{{ edu.period }}</span>
                  </div>

                  <h4 class="edu-degree">{{ edu.degree }}</h4>

                  <a
                    [href]="edu.institutionUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="edu-institution-link"
                    aria-label="Sitio web oficial del Tecnológico de Estudios Superiores de Huixquilucan"
                  >
                    <span>{{ edu.institution }}</span>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>

                  <p class="edu-location">{{ edu.location }}</p>

                  <ul class="edu-highlights">
                    @for (hl of edu.highlights; track hl) {
                      <li class="edu-hl-item">{{ hl }}</li>
                    }
                  </ul>
                </div>
              }
            </div>

            <!-- Professional Profile & LinkedIn Callout -->
            <div class="linkedin-banner glass-panel">
              <span class="tape-strip tape-top-right tape-amber" aria-hidden="true"></span>
              <div class="linkedin-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>

              <div class="linkedin-info">
                <span class="linkedin-tag">Red Profesional</span>
                <h4 class="linkedin-title">Conectemos en LinkedIn</h4>
                <p class="linkedin-desc">
                  Revisa mis recomendaciones, experiencia laboral completa y red de contactos profesionales.
                </p>

                <a
                  [href]="profile().linkedinUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-linkedin-callout"
                  aria-label="Abrir perfil de LinkedIn de Alejandro Santiago Mata"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Alejandro Santiago Mata (LinkedIn)</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- NEW: Enterprise Demos in Video Section -->
        <div class="enterprise-videos-section">
          <div class="demos-header">
            <div class="demos-header-left">
              <span class="badge badge-cyan">Demostraciones en Video • Software de Producción</span>
              <h3 class="demos-title">
                Aplicaciones Desarrolladas en <span class="gradient-text">RC Lighting / XRC</span>
              </h3>
              <p class="demos-desc">
                RC Lighting es una empresa de <strong>iluminación inteligente</strong> para eventos, antros y hogares — con un catálogo integral que abarca desde cabezas móviles robóticas y pistas de baile LED interactivas, hasta candiles, tiras LED y sistemas de automatización escénica. A continuación puedes explorar las aplicaciones que desarrollé para su ecosistema con sus respectivas demostraciones en video.
              </p>
            </div>
          </div>

          <div class="demos-grid">
            @for (demo of enterpriseDemos(); track demo.id; let cardIdx = $index) {
              @let activeIdx = getActiveVideoIndex(demo.id);
              @let currentVideo = demo.videos[activeIdx] || demo.videos[0];

              <article 
                class="demo-card polaroid-card glass-panel" 
                [class.polaroid-tilt-left]="cardIdx % 2 === 0"
                [class.polaroid-tilt-right]="cardIdx % 2 === 1"
                [attr.aria-labelledby]="'demo-title-' + demo.id"
              >
                <!-- Washi Tape / Diurex pegando la tarjeta Polaroid -->
                <span 
                  class="tape-strip tape-top-center" 
                  [class.tape-cyan]="cardIdx % 2 === 0"
                  [class.tape-amber]="cardIdx % 2 === 1"
                  aria-hidden="true"
                ></span>
                
                <!-- Polaroid Frame & Video Player Container -->
                <div class="polaroid-frame-box">
                  <div class="demo-video-wrapper">
                    <video
                      [src]="currentVideo.url"
                      controls
                      playsinline
                      preload="metadata"
                      class="demo-video-player"
                      [attr.aria-label]="'Video demostrativo de ' + demo.title + ' - ' + currentVideo.title"
                    >
                      Tu navegador no soporta el elemento de video.
                    </video>
                    <div class="video-badge-overlay">
                      <span class="badge badge-purple">{{ demo.badge }}</span>
                    </div>
                  </div>
                </div>

                <!-- Video Selector Bar if multiple clips exist -->
                @if (demo.videos.length > 1) {
                  <div class="video-selector-bar" role="tablist" [attr.aria-label]="'Videos disponibles de ' + demo.title">
                    <span class="video-selector-label mono">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <polygon points="23 7 16 12 23 17 23 7"/>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                      </svg>
                      Clips:
                    </span>
                    <div class="video-chips-group">
                      @for (vid of demo.videos; track vid.url; let i = $index) {
                        <button
                          type="button"
                          class="video-chip-btn"
                          [class.active]="i === activeIdx"
                          (click)="selectVideo(demo.id, i)"
                          [attr.aria-selected]="i === activeIdx"
                          role="tab"
                          [title]="vid.title"
                        >
                          <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" aria-hidden="true">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                          </svg>
                          <span>Clip {{ i + 1 }}</span>
                        </button>
                      }
                    </div>
                  </div>
                }

                <!-- Demo Content & Explanation -->
                <div class="demo-body">
                  <div class="demo-meta">
                    <span class="demo-source mono">{{ demo.sourceContext }}</span>
                    <h4 [id]="'demo-title-' + demo.id" class="demo-card-title">{{ demo.title }}</h4>
                    <p class="demo-card-subtitle">{{ demo.subtitle }}</p>
                  </div>

                  <p class="demo-summary">{{ demo.summary }}</p>

                  <!-- Technical Highlights -->
                  <div class="demo-highlights">
                    <span class="highlights-heading">Retos de Ingeniería Implementados:</span>
                    <ul class="demo-highlights-list">
                      @for (hl of demo.technicalHighlights; track hl) {
                        <li class="demo-hl-item">
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" class="hl-check" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <span>{{ hl }}</span>
                        </li>
                      }
                    </ul>
                  </div>

                  <!-- Tech Tags -->
                  <div class="demo-tech-tags" aria-label="Tecnologías de la aplicación">
                    @for (tech of demo.technologies; track tech) {
                      <span class="demo-tech-pill mono">{{ tech }}</span>
                    }
                  </div>
                </div>

              </article>
            }
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .experience-section {
      padding: 4.5rem 0;
      position: relative;
    }

    .section-header {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 3.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
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

    .experience-layout {
      display: grid;
      grid-template-columns: 1.35fr 1fr;
      gap: 2rem;
      align-items: start;
      margin-bottom: 3.5rem;
    }

    .column-heading {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.5rem;
    }

    .column-heading svg {
      color: var(--accent-cyan);
    }

    /* Job Card */
    .job-card {
      position: relative;
      padding: 2rem;
      border-radius: var(--radius-lg);
      border: 1px solid rgba(99, 102, 241, 0.25);
      background: linear-gradient(145deg, rgba(15, 23, 42, 0.8) 0%, rgba(10, 16, 28, 0.9) 100%);
      box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .role-badge-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.4rem;
      flex-wrap: wrap;
    }

    .company-badge {
      font-size: 1.1rem;
      font-weight: 800;
      color: #38bdf8;
      letter-spacing: -0.01em;
    }

    .job-period {
      font-size: 0.82rem;
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.04);
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
    }

    .job-role {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--text-primary);
    }

    .job-type-pill {
      font-size: 0.75rem;
      font-weight: 600;
      color: #34d399;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.25);
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      white-space: nowrap;
    }

    .job-summary {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .achievements-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .achievement-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 0.9rem 1.1rem;
      transition: border-color var(--transition-fast);
    }

    .achievement-item:hover {
      border-color: rgba(56, 189, 248, 0.3);
    }

    .achievement-bullet {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #38bdf8;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 0.15rem;
    }

    .achievement-content {
      font-size: 0.88rem;
      line-height: 1.55;
    }

    .achievement-title {
      color: var(--text-primary);
      font-weight: 700;
    }

    .achievement-desc {
      color: var(--text-secondary);
    }

    .job-tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
      margin-top: 0.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-subtle);
    }

    .job-tech-tag {
      font-size: 0.75rem;
      padding: 0.25rem 0.65rem;
      border-radius: var(--radius-sm);
      background: rgba(99, 102, 241, 0.1);
      color: #a5b4fc;
      border: 1px solid rgba(99, 102, 241, 0.2);
    }

    /* Side Column */
    .side-column {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .edu-card {
      position: relative;
      padding: 1.75rem;
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .edu-badge-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .edu-period {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .edu-degree {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1.25;
    }

    .edu-institution-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: #38bdf8;
      font-size: 0.92rem;
      font-weight: 600;
      text-decoration: none;
      transition: color var(--transition-fast);
    }

    .edu-institution-link:hover {
      color: #7dd3fc;
      text-decoration: underline;
    }

    .edu-location {
      font-size: 0.82rem;
      color: var(--text-muted);
    }

    .edu-highlights {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 0.5rem;
      padding-top: 0.75rem;
      border-top: 1px solid var(--border-subtle);
    }

    .edu-hl-item {
      font-size: 0.84rem;
      color: var(--text-secondary);
      line-height: 1.45;
      position: relative;
      padding-left: 1.1rem;
    }

    .edu-hl-item::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--accent-cyan);
      font-weight: bold;
    }

    /* LinkedIn Banner */
    .linkedin-banner {
      position: relative;
      padding: 1.75rem;
      border-radius: var(--radius-lg);
      border: 1px solid rgba(14, 118, 168, 0.35);
      background: linear-gradient(145deg, rgba(14, 118, 168, 0.12) 0%, rgba(10, 16, 28, 0.8) 100%);
      display: flex;
      gap: 1.25rem;
      align-items: flex-start;
    }

    .linkedin-icon-box {
      width: 52px;
      height: 52px;
      border-radius: var(--radius-md);
      background: #0077b5;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 14px rgba(0, 119, 181, 0.4);
    }

    .linkedin-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex-grow: 1;
    }

    .linkedin-tag {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #38bdf8;
    }

    .linkedin-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--text-primary);
    }

    .linkedin-desc {
      font-size: 0.86rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 0.5rem;
    }

    .btn-linkedin-callout {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.75rem 1.25rem;
      background: #0077b5;
      color: #ffffff;
      border-radius: var(--radius-sm);
      font-size: 0.9rem;
      font-weight: 700;
      text-decoration: none;
      transition: all var(--transition-fast);
      box-shadow: 0 4px 14px rgba(0, 119, 181, 0.4);
      align-self: flex-start;
    }

    .btn-linkedin-callout:hover {
      background: #008cd6;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 119, 181, 0.6);
    }

    /* Enterprise Videos Section */
    .enterprise-videos-section {
      margin-top: 3.5rem;
      padding-top: 3rem;
      border-top: 1px solid var(--border-subtle);
    }

    .demos-header {
      margin-bottom: 2.25rem;
    }

    .demos-header-left {
      max-width: 820px;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .demos-title {
      font-size: clamp(1.5rem, 3vw, 2.1rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--text-primary);
    }

    .demos-desc {
      font-size: 0.98rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .demos-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem 2rem;
      padding-top: 1rem;
    }

    .demo-card {
      display: flex;
      flex-direction: column;
      border-radius: var(--radius-lg);
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: linear-gradient(150deg, rgba(17, 26, 44, 0.9) 0%, rgba(10, 16, 28, 0.98) 100%);
      box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.65), 0 3px 8px rgba(0, 0, 0, 0.35);
      transition: transform var(--transition-smooth), box-shadow var(--transition-smooth), border-color var(--transition-smooth);
    }

    /* Inclinación sutil estilo fotos pegadas en cartulina */
    .polaroid-tilt-left {
      transform: rotate(-0.8deg);
    }

    .polaroid-tilt-right {
      transform: rotate(0.8deg);
    }

    .demo-card:hover {
      transform: translateY(-6px) rotate(0deg);
      border-color: rgba(56, 189, 248, 0.5);
      box-shadow: 0 24px 48px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(56, 189, 248, 0.2);
      z-index: 5;
    }

    /* Marco fotográfico estilo Polaroid */
    .polaroid-frame-box {
      padding: 0.85rem 0.85rem 0 0.85rem;
      border-top-left-radius: var(--radius-lg);
      border-top-right-radius: var(--radius-lg);
      background: rgba(255, 255, 255, 0.03);
    }

    /* Portrait phone video wrapper — fixed height so card doesn't stretch */
    .demo-video-wrapper {
      position: relative;
      width: 100%;
      height: 285px;
      background: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(255, 255, 255, 0.08);
      overflow: hidden;
      box-shadow: inset 0 0 16px rgba(0, 0, 0, 0.9);
    }

    .demo-video-player {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: #000;
      outline: none;
    }

    .video-badge-overlay {
      position: absolute;
      top: 0.65rem;
      left: 0.65rem;
      z-index: 2;
      pointer-events: none;
    }

    /* Video Selector Bar */
    .video-selector-bar {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 1.25rem;
      background: rgba(10, 16, 28, 0.95);
      border-bottom: 1px solid var(--border-subtle);
      flex-wrap: wrap;
    }

    .video-selector-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }

    .video-chips-group {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      flex-wrap: wrap;
    }

    .video-chip-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.3rem 0.7rem;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: rgba(255, 255, 255, 0.04);
      color: var(--text-secondary);
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
      font-family: inherit;
    }

    .video-chip-btn:hover {
      background: rgba(56, 189, 248, 0.12);
      border-color: rgba(56, 189, 248, 0.35);
      color: #7dd3fc;
    }

    .video-chip-btn.active {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.35) 0%, rgba(56, 189, 248, 0.35) 100%);
      border-color: #38bdf8;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.3);
    }

    .demo-body {
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      flex-grow: 1;
    }

    .demo-source {
      font-size: 0.75rem;
      color: #38bdf8;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.05em;
      display: block;
      margin-bottom: 0.25rem;
    }

    .demo-card-title {
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.01em;
    }

    .demo-card-subtitle {
      font-size: 0.88rem;
      color: #c084fc;
      font-weight: 500;
      margin-top: 0.2rem;
    }

    .demo-summary {
      font-size: 0.92rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .demo-highlights {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 1rem 1.1rem;
    }

    .highlights-heading {
      display: block;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 0.65rem;
    }

    .demo-highlights-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
    }

    .demo-hl-item {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.45;
    }

    .hl-check {
      color: var(--accent-cyan);
      flex-shrink: 0;
      margin-top: 0.15rem;
    }

    .demo-tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: auto;
      padding-top: 0.5rem;
    }

    .demo-tech-pill {
      font-size: 0.72rem;
      padding: 0.25rem 0.6rem;
      border-radius: var(--radius-sm);
      background: rgba(56, 189, 248, 0.08);
      color: #7dd3fc;
      border: 1px solid rgba(56, 189, 248, 0.2);
    }

    @media (max-width: 1100px) {
      .demos-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 700px) {
      .demos-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 980px) {
      .experience-layout {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 600px) {
      .job-header {
        flex-direction: column;
      }
      .linkedin-banner {
        flex-direction: column;
      }
      .btn-linkedin-callout {
        width: 100%;
        justify-content: center;
      }
      .demo-body {
        padding: 1.25rem;
      }
    }
  `]
})
export class ExperienceComponent {
  readonly portfolioService = inject(PortfolioService);
  readonly workExperience = this.portfolioService.workExperience;
  readonly education = this.portfolioService.education;
  readonly profile = this.portfolioService.profile;
  readonly enterpriseDemos = this.portfolioService.enterpriseDemos;

  readonly activeVideoIndices = signal<Record<string, number>>({});

  getActiveVideoIndex(demoId: string): number {
    return this.activeVideoIndices()[demoId] ?? 0;
  }

  selectVideo(demoId: string, index: number): void {
    this.activeVideoIndices.update(map => ({
      ...map,
      [demoId]: index
    }));
  }
}
