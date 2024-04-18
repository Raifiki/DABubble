import { Component, inject } from '@angular/core';

// import services
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';

// import classes
import { User } from '../../../shared/models/user.class';

@Component({
  selector: 'app-registereduserprofile',
  standalone: true,
  imports: [],
  templateUrl: './registereduserprofile.component.html',
  styleUrl: './registereduserprofile.component.scss'
})
export class RegistereduserprofileComponent {
  overlayCtrlService = inject(OverlaycontrolService);

  user: User = new User({
    id: '',
    name: 'Leo Weiß',
    imgPath: 'assets/img/avatar/avatar0.svg',
    email: 'leonard_weiss@web.de',
    status: 'Aktiv',
  });
}
