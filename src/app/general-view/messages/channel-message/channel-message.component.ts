import { Component, Input, OnInit, inject } from '@angular/core';
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';
import { CommonModule } from '@angular/common';
import { ChannelService } from '../../../services/channel.service';
// import classes
import { Channel } from '../../../shared/models/channel.class';
import { User } from '../../../shared/models/user.class';
import { UserService } from '../../../services/user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-channel-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './channel-message.component.html',
  styleUrl: './channel-message.component.scss',
})
export class ChannelMessageComponent implements OnInit {
  overlayCtrlService = inject(OverlaycontrolService);
  channelService = inject(ChannelService);
  userService = inject(UserService);
  user!: User;
  @Input() channel: Channel = {} as Channel;

  userUnsub: Subscription;

  constructor() {
    this.userUnsub = this.userService.activeUser$.subscribe((userData) => {
      this.user = userData;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.userUnsub.unsubscribe();
  }
}
