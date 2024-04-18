import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user.class';



@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  checkboxChecked = false;
  @Output() isShowen = new EventEmitter();

  user: User = new User();


  @Output() chooseAvatar = new EventEmitter();

  constructor(
    private userService: UserService
  ) {}

  goBack() {
    this.isShowen.emit(false);
  }

  onSubmit(form: NgForm) {
    const user: User = new User({
      id:'',
      name: form.value.userName,
      email: form.value.userEmail,
      password: form.value.password,
      imgPath: 'assets/img/avatar/profile.svg',
      status: 'Aktiv',
    });
    this.userService.user.next(user);
    this.chooseAvatar.emit(true);
  }

  checkboxChange() {
    this.checkboxChecked = !this.checkboxChecked;
  }
}
