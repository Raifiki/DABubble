import { Component, EventEmitter, Output, inject } from '@angular/core';

// import services
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';

// import classes
import { User } from '../../../shared/models/user.class';


@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss',
})
export class UserprofileComponent {
  overlayCtrlService = inject(OverlaycontrolService);

  user: User = new User({
    id: '',
    name: 'Leo Weiß',
    imgPath: 'assets/img/avatar/avatar0.svg',
    email: 'leonard_weiss@web.de',
    status: 'Aktiv',
  });

  sendMessage(){
    this.overlayCtrlService.hideOverlay();
    console.log('Open send message to user wokrspace');
  }
}
