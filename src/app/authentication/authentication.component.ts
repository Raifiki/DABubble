import { Component } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [SigninComponent, LoginComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {

}
