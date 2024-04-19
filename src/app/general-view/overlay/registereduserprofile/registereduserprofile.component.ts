import { Component, inject } from '@angular/core';

// import services
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';

// import classes
import { User } from '../../../shared/models/user.class';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-registereduserprofile',
  standalone: true,
  imports: [],
  templateUrl: './registereduserprofile.component.html',
  styleUrl: './registereduserprofile.component.scss'
})
export class RegistereduserprofileComponent {
  overlayCtrlService = inject(OverlaycontrolService);

  user!: User

  constructor(private userService: UserService) {
    this.user = new User(this.loadingUserFromStorage())
  }

  loadingUserFromStorage() {
    let currentUser = localStorage.getItem('user')
    if (currentUser) {
      return (JSON.parse(currentUser))
    } else {
      return null
    }
  }
    
  
}
