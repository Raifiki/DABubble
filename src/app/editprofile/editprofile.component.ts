import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

//import interfaces
import { User } from '../shared/interfaces/interfaces';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.scss'
})
export class EditprofileComponent {
  user: User = {
    name: 'Leo Weiß',
    avatarImgPath: 'assets/img/avatar/avatar0.svg',
    email: 'leonard_weiss@web.de',
    status: 'Aktiv',
    password: ''
  };

  avatarImgPathList: string[] = [
    'assets/img/avatar/avatar0.svg',
    'assets/img/avatar/avatar1.svg',
    'assets/img/avatar/avatar2.svg',
    'assets/img/avatar/avatar3.svg',
    'assets/img/avatar/avatar4.svg',
    'assets/img/avatar/avatar5.svg',
  ];

  onSubmit(form:NgForm){
    // save new data
  }

  @Output() menu = new EventEmitter()

  closingMenu() {
    this.menu.emit(false)
  }

}
