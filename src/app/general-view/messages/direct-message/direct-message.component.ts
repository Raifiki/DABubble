import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import classes
import { User } from '../../../shared/models/user.class';
import { Message } from '../../../shared/models/message.class';

// import services
import { UserService } from '../../../services/user.service';
import { MessageService } from '../../../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-direct-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './direct-message.component.html',
  styleUrl: './direct-message.component.scss'
})

export class DirectMessageComponent {
  activeUser: User = new User();
  messages: Message[] = [];
  secondUser: User = new User();
  directMassageId: string = '';

  userService = inject(UserService);
  messageService = inject(MessageService);

  unsubDirectMessage;
  unsubscripeActiveUser;

  newMessage: Message = new Message();

  constructor(){
    this.unsubscripeActiveUser = this.userService.activeUser$.subscribe(user => {this.activeUser = user;});
    this.unsubDirectMessage = this.messageService.activeDirectMessage$.subscribe(directMessage => {
      if(directMessage){
        this.directMassageId = directMessage.id;
        this.messages = directMessage.messages;
        this.secondUser = directMessage.users.find(user => user.id != this.activeUser.id) || this.activeUser;
      }
    });    
  }

  sendNewMassage(){
    this.newMessage.creator = this.activeUser;
    this.newMessage.date = new Date();
    this.messageService.addMessageToDirectMessage(this.directMassageId,this.newMessage);
    this.newMessage = new Message();
  }

  ngOnDestroy(){
    this.unsubDirectMessage.unsubscribe();
    this.unsubscripeActiveUser.unsubscribe();
  }
}
