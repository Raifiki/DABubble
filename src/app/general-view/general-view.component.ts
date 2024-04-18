import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

// import services
import { UserService } from '../services/user.service';
import { OverlaycontrolService } from '../services/overlaycontrol.service';
import { ChannelService } from '../services/channel.service';

// import customer components
import { OverlayComponent } from './overlay/overlay.component';
import { LeftSideComponent } from './overlay/left-side/left-side.component';
import { NewMessageComponent } from './overlay/new-message/new-message.component';
import { DirectMessageComponent } from './overlay/direct-message/direct-message.component';
import { ChannelMessageComponent } from './overlay/channel-message/channel-message.component';
import { ThreadComponent } from './overlay/thread/thread.component';

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
    ThreadComponent
  ],
  templateUrl: './general-view.component.html',
  styleUrl: './general-view.component.scss',
})
export class GeneralViewComponent {
  constructor(private userService: UserService) {
    this.unsubscribe = this.userService.user.subscribe(
      (user) => (this.activeUser = user)
    );
  }

  activeUser!: User;
  search!: string;
  private unsubscribe!: Subscription;

  overlayCtrlService = inject(OverlaycontrolService);
  channelService = inject(ChannelService);

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
