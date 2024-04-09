import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent   {
  lgnDisabled: boolean = true;
@Output() isPwForgotten = new EventEmitter()
@Output() isShowen = new EventEmitter()

  constructor(private router: Router) { }


  onSubmit(f: NgForm) {

  }

  goTo() {
    this.router.navigate(['/generalView']);
  }

  forgotPw() {
    this.isPwForgotten.emit(true)
  }

}
