import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

// import services
import { DirectMessageService } from '../../../services/direct-message.service';
import { UserService } from '../../../services/user.service';
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';
import { MessageService } from '../../../services/message.service';
import { ChannelService } from '../../../services/channel.service';

// import classes
import { DirektMessage } from '../../../shared/models/direct-message.class';
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
  overlayCtrlService = inject(OverlaycontrolService);
  messageService = inject(MessageService);
  channelService = inject(ChannelService);

  activeUser!: User;
  unsubActiveUser: Subscription;
  unsubUsersList: Subscription //
  sendTo!: Channel | User | undefined;
  searchPrompt: string = '';
  users!: User[];//
  filteredUsers: User[] = [];
  unsubChannels: Subscription;
  channels: Channel[] = [];
  filteredChannels: Channel[] = [];

  messageContent: string = '';

  constructor() {
    this.unsubActiveUser = this.userService.activeUser$.subscribe(
      (activeUser) => {
        this.activeUser = activeUser;
      }
    );
    this.unsubUsersList = this.userService.usersList$.subscribe(data =>{ //
      this.users = data 
    })

    this.unsubChannels = this.channelService.channels$.subscribe(channels => this.channels = channels);
  }

  filterUsersAndChannels(){
    this.sendTo = undefined;
    this.filteredUsers = [];
    this.filteredChannels = [];
    let firstCharacter = this.searchPrompt[0];
    if(firstCharacter){
      let prompt = this.searchPrompt.substring(1).toLowerCase();
      switch (firstCharacter) {
        case '@':
          this.filteredUsers = this.filterUsers(prompt);
          break;
        case '#':
          this.filteredChannels = this.filterChannels(prompt);
          break;
        default:
          this.filteredUsers = this.filterUsers(prompt);
          this.filteredChannels = this.filterChannels(prompt);
          break;
      }
    }
  }

  filterChannels(prompt:string): Channel[]{
    return this.channels.filter(channel => channel.name.toLowerCase().includes(prompt))
  }

  filterUsers(prompt:string): User[]{
  return this.users.filter(user => user.name.toLowerCase().includes(prompt));
  }

  setSendTo(item:'channel' | 'user', idx:number){
    if (item == 'user') {
      this.sendTo = this.filteredUsers[idx];
      this.searchPrompt = '@' + this.filteredUsers[idx].name;
    } else {
      this.sendTo = this.filteredChannels[idx];
      this.searchPrompt = '# ' + this.filteredChannels[idx].name;
    }

  }

  async submitMessage() {
    if (this.sendTo instanceof User) {
      let directMsg = this.existDirectMessage(this.sendTo);
      let idDM = (directMsg)? 
        await this.addNewMessageToDirectMessage(directMsg) 
        : await  this.createNewDirectMessage([this.activeUser, this.sendTo]);
      this.overlayCtrlService.showMessageComponent('directMessage',idDM);
      if(idDM) this.addDmToUsers([this.activeUser, this.sendTo],idDM);
    } else if(this.sendTo instanceof Channel){
      let channelID = this.sendTo?.id;
      if (channelID) {
        await this.messageService.addMessageToCollection('Channels',channelID,this.getMessageObj());
        this.overlayCtrlService.showMessageComponent('channel',channelID);
      }
    }
  }

  addDmToUsers(users: User[], idDM: string){
    users.forEach(user => {
      if (!user.directMessagesIDs.includes(idDM)) {
        user.directMessagesIDs.push(idDM);
        this.userService.saveUser(user);
      }
    });
  }

  existDirectMessage(user:User): DirektMessage | undefined {
    let directMsg:DirektMessage|undefined;    
    if(user.id == this.activeUser.id){
      this.directMessageService.directMessages$.value.forEach(directMessage => {
        if(directMessage.users.length == 1 && directMessage.users[0].id == user.id) directMsg = directMessage;
      });
    } else {
      this.directMessageService.directMessages$.value.forEach((directMessage) => {
        console.log('debug Leo: ',directMsg);
        console.log('debug Leo: ',directMessage.users.includes(user));
        if (directMessage.users.some(aryUser => user.id == aryUser.id )) directMsg = directMessage;
        
      });
    }
    return directMsg;
  }

  async createNewDirectMessage(users: User[]) {
    let id = '';
    let messages = [this.getMessageObj()];
    let obj = { users, messages };
    let directMessage = new DirektMessage(obj, id);
    return await this.directMessageService.createNewDirectMessage(directMessage);
  }

  async addNewMessageToDirectMessage(directMessage: DirektMessage){
    await this.messageService.addMessageToCollection('directMessages',directMessage.id,this.getMessageObj());
    return directMessage.id;
  }

  getMessageObj() {
    let message = new Message();
    message.creator = this.activeUser;
    message.content = this.messageContent;
    message.date = new Date();
    message.files = []; // add files if function is available
    message.reactions = []; // add files if function is available
    return message;
  }

  ngOnDestroy() {
    this.unsubActiveUser.unsubscribe();
    this.unsubChannels.unsubscribe();
    this.unsubUsersList.unsubscribe();
  }
}
