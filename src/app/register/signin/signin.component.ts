import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationService } from '../../services/animation.service';
import { UserprofileComponent } from '../../general-view/overlay/userprofile/userprofile.component';
import { User } from '../../shared/interfaces/interfaces';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ChooseavatarComponent } from '../../chooseavatar/chooseavatar.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ChooseavatarComponent,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  checkboxChecked = false;
  @Output() isShowen = new EventEmitter();
  user: BehaviorSubject<User> = new BehaviorSubject<User>({
    name: '',
    avatarImgPath: '',
    email: '',
    password: '',
    status: 'Aktiv',
  });
  user$ = this.user.asObservable();
  @Output() chooseAvatar = new EventEmitter();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private animationService: AnimationService,
    private userService: UserService
  ) {}

  goBack() {
    this.isShowen.emit(false);
  }

  onSubmit(form: NgForm) {
    const user: User = {
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
