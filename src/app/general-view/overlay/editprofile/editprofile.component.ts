import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// import services
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';

// import classes
import { User } from '../../../shared/models/user.class';


@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.scss'
})
export class EditprofileComponent {
  user: User = new User ({
    id: '',
    name: 'Leo Weiß',
    imgPath: 'assets/img/avatar/avatar0.svg',
    email: 'leonard_weiss@web.de',
    status: 'Aktiv',
    password: ''
  });

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
