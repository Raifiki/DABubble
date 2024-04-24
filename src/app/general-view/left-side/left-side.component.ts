import { CommonModule } from '@angular/common';
import { Component, inject, Output, EventEmitter, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// customer components
import { UserlistitemComponent } from '../../shared/components/userlistitem/userlistitem.component';

//services
import { MessageService } from '../../services/message.service';
import { OverlaycontrolService } from '../../services/overlaycontrol.service';
import { StorageService } from '../../services/storage.service';
import { ChannelService } from '../../services/channel.service';
import { UserService } from '../../services/user.service';

// import classes
import { User } from '../../shared/models/user.class';

// impoort types
import { MassageComponent } from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-left-side',
  standalone: true,
  imports: [CommonModule, UserlistitemComponent],
  templateUrl: './left-side.component.html',
  styleUrl: './left-side.component.scss',
})
export class LeftSideComponent {
  activeUser!: User;
  subscription: Subscription;

  @Output() toggleMessageComponent = new EventEmitter<MassageComponent>();

  dropdownCollapsed: { channels: boolean; directMessages: boolean } = {
    channels: false,
    directMessages: false,
  };

  activeUserchannels: any[] = [];

  overlayCtrlService = inject(OverlaycontrolService);
  messageService = inject(MessageService);
  channelService = inject(ChannelService);
  storageService = inject(StorageService);

  constructor(private userService: UserService) {
    this.subscription = this.userService.activeUser$.subscribe((userData) => {
      this.activeUser = userData;
      this.getChannelNames(userData.channelIDs);
      console.log(userData.channelIDs);
    });
  }

  toggleDropdown(dropdownType: 'channels' | 'directMessages') {
    this.dropdownCollapsed[dropdownType] =
      !this.dropdownCollapsed[dropdownType];
  }

  openMessageComponent(component: MassageComponent, id?: string) {
    this.toggleMessageComponent.emit(component);
    if(id){
      switch (component) {
        case 'directMessage':
          this.messageService.subDirectMessage(id);
          break;
        case ('channel'):{
          // sub single channel
          break;
        }
      }
    }
  }



  loadingUserFromStorage() {
    const currentUserString = localStorage.getItem('user');
    if (currentUserString) {
      return JSON.parse(currentUserString);
    } else {
      return null;
    }
  }

  getChannelNames(channelIds: any) {
    let channelNames: any = [];

    this.activeUser.channelIDs?.forEach((id) => {
      let channel = this.channelService.getSingleChannel(id);
      channelNames.push(channel);
    });
    this.activeUserchannels = channelNames;
  } 

  getUser(users:User[]):User{
    return users.find(user => user.id!=this.activeUser.id) || new User();
  }
}
