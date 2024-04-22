import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  lgnDisabled: boolean = true;
  @Output() isPwForgotten = new EventEmitter();
  @Output() isShowen = new EventEmitter();

  constructor(private router: Router, private userService: UserService) {}

  onSubmit(f: NgForm) {
    this.userService.logUserIn(f.value.userEmail, f.value.password)
  }

  logInTestUser() {
      this.userService.logInTestUser();
  }

  forgotPw() {
    this.isPwForgotten.emit(true);
  }
}
