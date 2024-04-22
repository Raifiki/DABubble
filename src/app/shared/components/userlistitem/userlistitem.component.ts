import { Component, Input, inject } from '@angular/core';

// import services
import { UserService } from '../../../services/user.service';

// import classes
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userlistitem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userlistitem.component.html',
  styleUrl: './userlistitem.component.scss',
})
export class UserlistitemComponent {
  userService = inject(UserService);

  @Input({ required: true }) user!: User;
  @Input({ required: true }) checked!: boolean;

  signedInUser!: User;

  constructor() {
    this.userService.user$.subscribe((user) => (this.signedInUser = user));
  }
}
