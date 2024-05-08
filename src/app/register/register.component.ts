import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimationService } from '../services/animation.service';

import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { SendemailComponent } from './sendemail/sendemail.component';
import { ChooseavatarComponent } from './chooseavatar/chooseavatar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SendemailComponent,
    RouterLink,
    ChooseavatarComponent,
    LoginComponent,
    SigninComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isSignIsShowen = false;
  isResetPwIsShowen = false;
  isLoginShowen = true;
  animationService = inject(AnimationService);
  animationPlayed;
  chooseAvatar = false;

  constructor() {
    this.animationPlayed = this.checkAmount();
  }

  showPwComponent(event: boolean) {
    this.isResetPwIsShowen = event;
    this.isLoginShowen = false;
    this.isSignIsShowen = false;
  }

  showSignInComponent(event: boolean) {
    this.isSignIsShowen = event;
    this.isLoginShowen = true;
  }

  goToSignIn() {
    this.isLoginShowen = false;
    this.isSignIsShowen = true;
  }

  checkAmount() {
    const amount = sessionStorage.getItem('animationPlayed');
    if (amount === 'false') {
      return false;
    } else {
      return true;
    }
  }

  showMain(event: boolean) {
    this.isLoginShowen = true;
    this.isResetPwIsShowen = false;
    this.isSignIsShowen = false;
    this.chooseAvatar = false;
  }

  showAvatar(event: boolean) {
    this.chooseAvatar = event;
    this.isLoginShowen = false;
    this.isResetPwIsShowen = false;
    this.isSignIsShowen = false;
  }
}
