import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DirektMessage } from '../../../shared/models/direct-message.class';
import { DirectMessageService } from '../../../services/direct-message.service';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../../shared/models/user.class';
import { Channel } from '../../../shared/models/channel.class';
import { Message } from '../../../shared/models/message.class';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.scss',
})
export class NewMessageComponent {
  directMessageService = inject(DirectMessageService);
  userService = inject(UserService);

  activeUser!: User;
  unsubActiveUser: Subscription;

  sendTo!: Channel | User | undefined;

  content: string = '';

  constructor() {
    this.unsubActiveUser = this.userService.activeUser$.subscribe(
      (activeUser) => {
        this.activeUser = activeUser;
      }
    );
    this.sendTo = this.userService.getUser('Icv6CcMnu6PVBq6f2X5TE7ssF4G2');
  }

  submitMessage() {
    if (this.sendTo instanceof User) {
      // add condition if directMessage already exist
      let users: User[] = [this.activeUser, this.sendTo];
      this.createNewDirectMessage(users);
      // open Point: add new DirectMessageId to users
    } else {
      // channel needs to implemented
    }
  }

  async createNewDirectMessage(users: User[]) {
    let id = '';
    let messages = [this.getMessageObj()];
    let obj = { users, messages };
    let directMessage = new DirektMessage(obj, id);
    await this.directMessageService.createNewDirectMessage(directMessage);
  }

  getMessageObj() {
    let message = new Message();
    message.creator = this.activeUser;
    message.content = this.content;
    message.date = new Date();
    message.files = []; // add files if function is available
    message.reactions = []; // add files if function is available
    return message;
  }

  ngOnDestroy() {
    this.unsubActiveUser.unsubscribe();
  }
}
