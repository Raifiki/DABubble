import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationService } from '../../services/animation.service';
import { UserprofileComponent } from '../../userprofile/userprofile.component';
import { User } from '../../shared/interfaces/interfaces';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule, UserprofileComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  checkboxChecked = false;
  user: BehaviorSubject<User> = new BehaviorSubject<User>({
    name: '',
    avatarImgPath: '',
    email: '',
    password: '',
    status: 'Aktiv' // Setze den Standardstatus hier oder lass ihn weg, wenn du einen leeren Status bevorzugst
  });
  user$ = this.user.asObservable();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private animationService: AnimationService,
    private userService: UserService
  ) {}

  goBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
    this.animationService.amountPlayed.set(1);
  }

  onSubmit(form: NgForm) {
    this.router.navigate(['/chooseAvatar']);
    const user: User = {
      name: form.value.userName,
      email: form.value.userEmail,
      avatarImgPath: '',
      password: form.value.password,
      status: 'Aktiv'
    };
    this.userService.user.next(user); 
  }

  checkboxChange() {
    this.checkboxChecked = !this.checkboxChecked;
  }
}
