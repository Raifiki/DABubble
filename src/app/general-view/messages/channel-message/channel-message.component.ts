import { Component, Input, OnInit, inject } from '@angular/core';
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';
import { CommonModule } from '@angular/common';
import { ChannelService } from '../../../services/channel.service';
import { UserService } from '../../../services/user.service';
import { MessageService } from '../../../services/message.service';
import { Subscription } from 'rxjs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// import classes
import { Channel } from '../../../shared/models/channel.class';
import { User } from '../../../shared/models/user.class';
import { Message } from '../../../shared/models/message.class';
import { MessageContainerComponent } from '../../../shared/components/message-container/message-container.component';

@Component({
  selector: 'app-channel-message',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageContainerComponent],
  templateUrl: './channel-message.component.html',
  styleUrl: './channel-message.component.scss',
})
export class ChannelMessageComponent implements OnInit {
  overlayCtrlService = inject(OverlaycontrolService);
  channelService = inject(ChannelService);
  userService = inject(UserService);
  messageService = inject(MessageService);

  user!: User;
  userUnsub: Subscription;

  activeUser: User = new User();
  unsubscribeActiveUser;

  @Input() channel: Channel = {} as Channel;
  unsubChannels: Subscription;
  channels: Channel[] = [];

  messages: Message[] = [];
  unsubMessages: Subscription;

  newMessage: Message = new Message();

  constructor() {
    this.userUnsub = this.userService.activeUser$.subscribe((userData) => {
      this.user = userData;
    });

    this.unsubChannels = this.channelService.channels$.subscribe(
      (channelList) => (this.channels = channelList)
    );

    setTimeout(() => {
      this.messageService.subMessages('Channels', this.channel.id);
    }, 1000);
    this.unsubscribeActiveUser = this.userService.activeUser$.subscribe(
      (user) => {
        this.activeUser = user;
      }
    );

    this.unsubMessages = this.messageService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  sendNewMessage() {
    this.newMessage.creator = this.activeUser;
    this.newMessage.date = new Date();
    this.messageService.addMessageToCollection(
      'Channels',
      this.channel.id,
      this.newMessage
    );
    this.newMessage = new Message();
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.userUnsub.unsubscribe();
    this.unsubMessages.unsubscribe();
    this.unsubscribeActiveUser.unsubscribe();
  }
}
