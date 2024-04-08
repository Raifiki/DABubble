import { Component, EventEmitter, Output } from '@angular/core';

//import interfaces
import { User } from '../shared/interfaces/interfaces';


@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss',
})
export class UserprofileComponent {
  user: User = {
    name: 'Leo Weiß',
    avatarImgPath: 'assets/img/avatar/avatar0.svg',
    email: 'leonard_weiss@web.de',
    status: 'Aktiv',
    password: '',
  };

  @Output() menu = new EventEmitter()

closingMenu() {
  this.menu.emit(false)
}
}
