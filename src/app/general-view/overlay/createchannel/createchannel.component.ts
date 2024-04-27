import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// import customer component
import { UserlistitemComponent } from '../../../shared/components/userlistitem/userlistitem.component';
import { UserSelectComponent } from '../../../shared/components/user-select/user-select.component';

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
  imports: [
    FormsModule,
    UserlistitemComponent,
    UserSelectComponent],
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

  constructor(){
    this.users = this.userService.usersList;
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

  addMembers2Channel(members:User[]){
    this.channel.members = [];
    members.forEach(member => {
      this.channel.members.push(member);
    });
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
