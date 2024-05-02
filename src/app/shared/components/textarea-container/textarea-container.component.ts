import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { ChannelService } from '../../../services/channel.service';
import { Message } from '../../models/message.class';
import { Channel } from '../../models/channel.class';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmojiComponent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-textarea-container',
  standalone: true,
  imports: [FormsModule, CommonModule, PickerComponent, EmojiComponent],
  templateUrl: './textarea-container.component.html',
  styleUrl: './textarea-container.component.scss',
})
export class TextareaContainerComponent {
  messageService = inject(MessageService);
  channelService = inject(ChannelService);
  userService = inject(UserService);

  user!: User;

  activeUser: User = new User();
  unsubscribeActiveUser;

  @Input() channel: Channel = {} as Channel;
  unsubChannels: Subscription;
  channels: Channel[] = [];

  newMessage: Message = new Message();
  messages: Message[] = [];
  unsubMessages: Subscription;

  showEmojiPicker: boolean = false;

  @ViewChild('textarea') private textarea!: ElementRef<HTMLElement>;

  constructor() {
    this.unsubChannels = this.channelService.channels$.subscribe(
      (channelList) => (this.channels = channelList)
    );

    this.unsubscribeActiveUser = this.userService.activeUser$.subscribe(
      (user) => {
        this.activeUser = user;
      }
    );

    this.unsubMessages = this.messageService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  addEmoji(event: any) {
    let textareaElement = this.textarea.nativeElement as HTMLTextAreaElement;
    let [caretStart, caretEnd] = [
      textareaElement.selectionStart,
      textareaElement.selectionEnd,
    ];
    this.newMessage.content =
      this.newMessage.content.substring(0, caretStart) +
      this.getEmoji(event) +
      this.newMessage.content.substring(caretEnd);
    this.toggleEmojiPicker();
  }

  getEmoji(event: any) {
    return event['emoji'].native;
  }

  toggleEmojiPicker(event?: Event) {
    if (event) event.stopPropagation();
    this.showEmojiPicker = !this.showEmojiPicker;
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

  ngOnDestroy() {
    this.unsubMessages.unsubscribe();
    this.unsubscribeActiveUser.unsubscribe();
  }
}
