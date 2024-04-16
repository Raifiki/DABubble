import { Component, Input, inject } from '@angular/core';

// import interfaces
import { User } from '../../interfaces/interfaces';

// import services
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-userlistitem',
  standalone: true,
  imports: [],
  templateUrl: './userlistitem.component.html',
  styleUrl: './userlistitem.component.scss'
})

export class UserlistitemComponent {

  userService = inject(UserService);

  @Input({ required: true }) user!:User;
  @Input({ required: true }) checked!:boolean;

  signedInUser!:User;
  
  constructor(){
    this.userService.user.subscribe(user => this.signedInUser = user);
  }
}
