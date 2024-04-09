import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimationService } from '../services/animation.service';
import { ChooseavatarComponent } from '../chooseavatar/chooseavatar.component';
import { SendemailComponent } from '../sendemail/sendemail.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SendemailComponent,
    RouterLink,
    ChooseavatarComponent,
    LoginComponent,
    SigninComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isSignIsShowen = false;
  isResetPwIsShowen = false;
  isLoginShowen = true;
  animationService = inject(AnimationService);
  animationPlayed = this.animationService.amountPlayed();
  chooseAvatar = false;

  constructor() {
    this.animationPlayed = this.animationService.amountPlayed();
    console.log(this.animationPlayed);
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

  ngOnInit(): void {
    if (this.animationPlayed === 0) {
      setTimeout(() => {
        this.animationService.amountPlayed.set(1);
        this.animationPlayed = this.animationService.amountPlayed();
      }, 2000);
    }
  }

  showMain(event: boolean) {
    this.isLoginShowen = true
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
