import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// import customer component
import { UserlistitemComponent } from '../../../shared/components/userlistitem/userlistitem.component';

// import classes
import { Channel } from '../../../shared/models/channel.class';
import { User } from '../../../shared/models/user.class';

// import services
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';
import { ChannelService } from '../../../services/channel.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-createchannel',
  standalone: true,
  imports: [FormsModule,UserlistitemComponent],
  templateUrl: './createchannel.component.html',
  styleUrl: './createchannel.component.scss'
})
export class CreatechannelComponent {
  channel: Channel = new Channel();

  formState: 'channelName' | 'addMember' = 'channelName';
  memberSelection: 'all' | 'select' = 'all';

  overlayCtrlService = inject(OverlaycontrolService);
  channelService = inject(ChannelService);
  userService = inject(UserService);

  users: User[];

  filteredUsers: User[];

  constructor(){
    this.users = this.userService.usersList;
    this.filteredUsers = this.users;
  }

  onSubmitName(form:NgForm){
    if (form.valid) {
      this.formState = 'addMember';
    }
  }

  async onSubmitCreateChannel(form:NgForm){
    if(form.valid){
      if(this.memberSelection == 'all') this.addAllUsers2Channel();
      this.addCreator2Channel();
      let id = await this.channelService.createChannel(this.channel);
      if(typeof id === "string") this.addChannelId2Users(id);
      this.overlayCtrlService.hideOverlay();
      console.log('channel created event - save data not implemented', this.channel.getCleanBEJSON());
    }
  }

  removeUser(idx:number){
    this.channel.members.splice(idx,1);
  }

  addUser(idx:number){
    if (!this.channel.members.find(user => user == this.filteredUsers[idx])){
      this.channel.members.push(this.filteredUsers[idx]);
    }
  }

  getUserData(userID: string): User{
    let user: User = {} as User;
    let idx = this.users.findIndex(user => user.id == userID);
    if(idx >= 0) user = this.users[idx];
    return user;
  }

  filterUsers(prompt:string){
    this.filteredUsers = this.users.filter(user => user.name.toLowerCase().includes(prompt.toLowerCase()))
  }

  addCreator2Channel(){
    let activeUser = this.userService.activeUser$.value;
    if (!this.channel.members.find(user => user.id == activeUser.id)){
      this.channel.members.push(activeUser);
    }
    this.channel.creator = activeUser; 
  }

  addAllUsers2Channel(){
    this.channel.members = [];
    this.users.forEach( user => this.channel.members.push(user));
  }

  addChannelId2Users(channelId:string){
    this.channel.members.forEach(user => {
      user.channelIDs.push(channelId);
      this.userService.saveUser(user);
    });
  }

  channelNameExists(){
    return this.channelService.getChannelsNameList().includes(this.channel.name)
  }

}
