import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { ExperienceComponent } from './components/experience/experience';
import { ProjectListComponent } from './components/project-list/project-list';
import { SkillsComponent } from './components/skills/skills';
import { FooterComponent } from './components/footer/footer';
import { ProjectModalComponent } from './components/project-modal/project-modal';
import { ContactModalComponent } from './components/contact-modal/contact-modal';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    HeroComponent,
    ExperienceComponent,
    ProjectListComponent,
    SkillsComponent,
    FooterComponent,
    ProjectModalComponent,
    ContactModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
