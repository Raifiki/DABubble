import { Component, inject } from '@angular/core';

// import classes
import { User } from '../../../shared/models/user.class';
import { Message } from '../../../shared/models/message.class';

// import services
import { UserService } from '../../../services/user.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-direct-message',
  standalone: true,
  imports: [],
  templateUrl: './direct-message.component.html',
  styleUrl: './direct-message.component.scss'
})

export class DirectMessageComponent {
  activeUser: User = new User();
  messages: Message[] = [];
  secondUser: User = new User();;

  userService = inject(UserService);
  messageService = inject(MessageService);

  unsubDirectMessage;

  constructor(){
    this.unsubDirectMessage = this.messageService.activeDirectMessage$.subscribe(directMessage => {
      if(directMessage){
        this.messages = directMessage.messages;
        this.secondUser = directMessage.users.find(user => user.id != this.activeUser.id) || this.activeUser;
      }
    });
    this.userService.activeUser$.subscribe(user => {this.activeUser = user;});
  }

  ngOnDestroy(){
    this.unsubDirectMessage.unsubscribe();
  }
}
