import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

// import services
import { UserService } from '../services/user.service';
import { OverlaycontrolService } from '../services/overlaycontrol.service';
import { ChannelService } from '../services/channel.service';
import { MessageService } from '../services/message.service';

// import customer components
import { OverlayComponent } from './overlay/overlay.component';
import { LeftSideComponent } from './left-side/left-side.component';
import { NewMessageComponent } from './messages/new-message/new-message.component';
import { DirectMessageComponent } from './messages/direct-message/direct-message.component';
import { ChannelMessageComponent } from './messages/channel-message/channel-message.component';
import { ThreadComponent } from './thread/thread.component';

// import classes
import { User } from '../shared/models/user.class';

@Component({
  selector: 'app-general-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OverlayComponent,
    LeftSideComponent,
    NewMessageComponent,
    DirectMessageComponent,
    ChannelMessageComponent,
    ThreadComponent,
  ],
  templateUrl: './general-view.component.html',
  styleUrl: './general-view.component.scss',
})
export class GeneralViewComponent {
  activeUser!: User;
  search!: string;
  overlayCtrlService = inject(OverlaycontrolService);
  channelService = inject(ChannelService);
  currentMessageComponent:
    | 'channel-message'
    | 'direct-message'
    | 'new-message' = 'channel-message';

  constructor() {
    this.activeUser = new User(this.loadingUserFromStorage());
  }

  toggleMessageComponent(
    nextComponent: 'channel-message' | 'direct-message' | 'new-message'
  ) {
    this.currentMessageComponent = nextComponent;
  }

  loadingUserFromStorage() {
    const currentUserString = localStorage.getItem('user');
    if (currentUserString) {
      return JSON.parse(currentUserString);
    } else {
      return null;
    }
  }
}
