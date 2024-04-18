import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../shared/interfaces/interfaces';
import { UserService } from '../../services/user.service';


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

  user: User = {
    id: '',
    name: '',
    avatarImgPath: '',
    email: '',
    password: '',
    status: 'Aktiv',
  };


  @Output() chooseAvatar = new EventEmitter();

  constructor(
    private userService: UserService
  ) {}

  goBack() {
    this.isShowen.emit(false);
  }

  onSubmit(form: NgForm) {
    const user: User = {
      id:'',
      name: form.value.userName,
      email: form.value.userEmail,
      avatarImgPath: '',
      password: form.value.password,
      status: 'Aktiv',
    };
    this.userService.user.next(user);
    this.chooseAvatar.emit(true);
  }

  checkboxChange() {
    this.checkboxChecked = !this.checkboxChecked;
  }
}
