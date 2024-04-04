import { Component } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [SigninComponent, LoginComponent, RouterLink, RouterLinkActive],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {

}
