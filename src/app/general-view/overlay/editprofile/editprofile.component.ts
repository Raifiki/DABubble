import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

//import interfaces
import { User } from '../../../shared/interfaces/interfaces';

// import services
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';


@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.scss'
})
export class EditprofileComponent {
  user: User = {
    id: '',
    name: 'Leo Weiß',
    avatarImgPath: 'assets/img/avatar/avatar0.svg',
    email: 'leonard_weiss@web.de',
    status: 'Aktiv',
    password: ''
  };

  overlayCtrlService = inject(OverlaycontrolService);

  avatarImgPathList: string[] = [
    'assets/img/avatar/avatar0.svg',
    'assets/img/avatar/avatar1.svg',
    'assets/img/avatar/avatar2.svg',
    'assets/img/avatar/avatar3.svg',
    'assets/img/avatar/avatar4.svg',
    'assets/img/avatar/avatar5.svg',
  ];

  onSubmit(form:NgForm){
    this.overlayCtrlService.showOverlay('registeredUserProfile');
    console.log('Save edited user data - data not saved, need to implemented');
    
  }
}
