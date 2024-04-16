import { Component, EventEmitter, Output, inject } from '@angular/core';

//import interfaces
import { User } from '../../../shared/interfaces/interfaces';

// import services
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';


@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss',
})
export class UserprofileComponent {
  overlayCtrlService = inject(OverlaycontrolService);

  user: User = {
    id: '',
    name: 'Leo Weiß',
    avatarImgPath: 'assets/img/avatar/avatar0.svg',
    email: 'leonard_weiss@web.de',
    status: 'Aktiv',
    password: '',
  };

  sendMessage(){
    this.overlayCtrlService.hideOverlay();
    console.log('Open send message to user wokrspace');
  }
}
