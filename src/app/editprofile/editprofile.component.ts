import { Component } from '@angular/core';
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
    status: 'Aktiv'
  };

  onSubmit(form:NgForm){
    // save new data
  }

}
