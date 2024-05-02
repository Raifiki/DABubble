import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

// import services
import { UserService } from '../services/user.service';
import { OverlaycontrolService } from '../services/overlaycontrol.service';
import { ChannelService } from '../services/channel.service';
import { RegisterService } from '../services/register.service';

// import customer components
import { OverlayComponent } from './overlay/overlay.component';
import { LeftSideComponent } from './left-side/left-side.component';
import { NewMessageComponent } from './messages/new-message/new-message.component';
import { DirectMessageComponent } from './messages/direct-message/direct-message.component';
import { ChannelMessageComponent } from './messages/channel-message/channel-message.component';
import { ThreadComponent } from './thread/thread.component';

// import classes
import { User } from '../shared/models/user.class';

// import types
import { Channel } from '../shared/models/channel.class';
import { Message } from '../shared/models/message.class';
import { MessageService } from '../services/message.service';
import { WorkspaceMenuComponent } from './overlay/workspace-menu/workspace-menu.component';


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
    WorkspaceMenuComponent,
  ],
  templateUrl: './general-view.component.html',
  styleUrl: './general-view.component.scss',
})
export class GeneralViewComponent {
  activeUser!: User;
  search!: string;

  activeChannelId: string = '';
  channels?: Channel[];
  activeChannel!: Channel;
  unsubChannel: Subscription;

  messages: Message[] = [];
  unsubMessages: Subscription;

  overlayCtrlService = inject(OverlaycontrolService);
  channelService = inject(ChannelService);
  messageService = inject(MessageService);
  registerService = inject(RegisterService)

  subscription: Subscription;

  constructor(private userService: UserService) {
    this.subscription = this.userService.activeUser$.subscribe((userData) => {
      this.activeUser = userData;
    });

    this.channelService.subChannel(this.activeUser.channelIDs[0]);
    this.unsubChannel = this.channelService.activeChannel$.subscribe(
      (channel) => {
        if (channel) {
          this.activeChannel = channel;
        }
      }
    );

    this.unsubMessages = this.messageService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }
  @HostListener('window:beforeunload', ['$event'])
  async beforeUnload(event: Event) {
    this.activeUser.status = 'Abwesend';
    this.userService.activeUser$.next(this.activeUser);
    await this.userService.saveUser(this.userService.activeUser$.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
