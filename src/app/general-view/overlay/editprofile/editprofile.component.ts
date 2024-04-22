import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

// import services
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';
import { UserService } from '../../../services/user.service';

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
  user!: User;

  overlayCtrlService = inject(OverlaycontrolService);
  userService = inject (UserService);

  unsubscripeUser: Subscription;

  avatarImgPathList: string[] = [
    'assets/img/avatar/avatar0.svg',
    'assets/img/avatar/avatar1.svg',
    'assets/img/avatar/avatar2.svg',
    'assets/img/avatar/avatar3.svg',
    'assets/img/avatar/avatar4.svg',
    'assets/img/avatar/avatar5.svg',
  ];

  constructor(){
    this.unsubscripeUser = this.userService.activeUser$.subscribe((userData) => {
      this.user = new User(userData);
    });
  }

  onSubmit(form:NgForm){
    this.overlayCtrlService.showOverlay('registeredUserProfile');
    console.log('Save edited user data - data not saved, need to implemented');
  }

  ngOnDestroy() {
    this.unsubscripeUser.unsubscribe();
  }

}
