import { Component, EventEmitter, Output, inject } from '@angular/core';

// import services
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';

// import classes
import { User } from '../../../shared/models/user.class';
import { DirectMessageService } from '../../../services/direct-message.service';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { DirektMessage } from '../../../shared/models/direct-message.class';
import { MessageComponent } from '../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss',
})
export class UserprofileComponent {
  overlayCtrlService = inject(OverlaycontrolService);
  directMessageService = inject(DirectMessageService);
  userService = inject(UserService);

  unsubActiveUser: Subscription;
  activeUser!: User;

  user!: User;

  directMessage: DirektMessage = new DirektMessage();

  constructor() {
    this.unsubActiveUser = this.userService.activeUser$.subscribe((user) => {
      this.activeUser = user;
    });

    this.user = this.overlayCtrlService.selectedUser || new User();
  }

  sendMessage() {
    // noch nicht fertig !!!!!!!!!!!!!!!!!!!
    console.log('test ', this.existDirectMessage());
    let directMsg = this.existDirectMessage();
    if (directMsg) {
      this.overlayCtrlService.showMessageComponent(
        'directMessage',
        directMsg.id
      );
    } else {
    }
    // ist DM vorhanden?
    //--> sub DirectMessage and open
    // else
    // new DM erstteln --> ID --> open

    this.overlayCtrlService.hideOverlay();
    this.overlayCtrlService.showMessageComponent('directMessage', this.user.id);
  }

  existDirectMessage(): DirektMessage | undefined {
    let directMsg;
    this.directMessageService.directMessages$.value.forEach((directMessage) => {
      if (directMessage.users.includes(this.user)) directMsg = directMessage;
    });
    return directMsg;
  }
}
