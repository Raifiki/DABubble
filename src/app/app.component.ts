import { Component, inject } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AnimationService } from './services/animation.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
     RouterOutlet,
     RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'DABubble';


  constructor() {}
}




