import { Component, inject } from '@angular/core';

//import interfaces
import { User } from '../../../shared/interfaces/interfaces';

// import services
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';

@Component({
  selector: 'app-registereduserprofile',
  standalone: true,
  imports: [],
  templateUrl: './registereduserprofile.component.html',
  styleUrl: './registereduserprofile.component.scss'
})
export class RegistereduserprofileComponent {
  overlayCtrlService = inject(OverlaycontrolService);

  user: User = {
    name: 'Leo Weiß',
    avatarImgPath: 'assets/img/avatar/avatar0.svg',
    email: 'leonard_weiss@web.de',
    status: 'Aktiv',
    password: ''
  };
}
