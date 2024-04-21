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
  userService = inject(UserService)

  user!: User

  constructor() {
    this.user = new User(this.userService.loadingUserFromStorage())
  }



  
}
