import { Injectable, inject } from '@angular/core';

// import interfaces
import { MessageComponent, OverlayType } from '../shared/interfaces/interfaces';

// import services
import { DirectMessageService } from './direct-message.service';
import { ChannelService } from './channel.service';
import { UserService } from './user.service';

// import classes
import { User } from '../shared/models/user.class';

@Injectable({
  providedIn: 'root',
})
export class OverlaycontrolService {
  overlayType: OverlayType = 'hide';

  messageComponentType: MessageComponent = 'channel';

  directMessageService = inject(DirectMessageService);
  channelService = inject(ChannelService);
  userService = inject(UserService);

  selectedUser: User | undefined;

  constructor() {}

  hideOverlay() {
    this.overlayType = 'hide';
  }

  showOverlay(ovlyName: OverlayType, event?: Event) {
    if (event) event.stopPropagation();
    this.overlayType = ovlyName;
  }

  showMessageComponent(componentType: MessageComponent, id?: string) {
    this.messageComponentType = componentType;
    if (id) this.subscripeMessageComponentContent(componentType, id);
  }

  subscripeMessageComponentContent(
    componentType: MessageComponent,
    id: string
  ) {
    if (componentType == 'directMessage') {
      this.directMessageService.subDirectMessage(id);
    } else {
      this.channelService.subChannel(id);
    }
  }

  selectUser(user: User) {
    // rewrite function after userService is reworked
    this.userService.usersList.forEach((userListElement) => {
      if (userListElement.id == user.id) this.selectedUser = userListElement;
    });
  }
}
