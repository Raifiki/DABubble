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
import { Channel } from '../../shared/models/channel.class';

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
  @Output() toggleMessageComponent = new EventEmitter<MassageComponent>();
  
  dropdownCollapsed: { channels: boolean; directMessages: boolean } = {
    channels: false,
    directMessages: false,
  };

  overlayCtrlService = inject(OverlaycontrolService);
  messageService = inject(MessageService);
  channelService = inject(ChannelService);
  storageService = inject(StorageService);

  activeUser!: User;
  unsubActiveUser: Subscription;

  channels: Channel[] = [];
  unsubChannels: Subscription;


  constructor(private userService: UserService) {
    this.unsubActiveUser = this.userService.activeUser$.subscribe(activeUser => this.activeUser = activeUser);
    this.unsubChannels = this.channelService.channels$.subscribe(channelList => this.channels = channelList);
  }

  toggleDropdown(dropdownType: 'channels' | 'directMessages') {
    this.dropdownCollapsed[dropdownType] = !this.dropdownCollapsed[dropdownType];
  }

  openMessageComponent(component: MassageComponent, id?: string) {
    this.toggleMessageComponent.emit(component);
    if(id) this.subscripeMessageComponentContent(component, id);
  }


  subscripeMessageComponentContent(component: MassageComponent, id:string){
    if (component == 'directMessage') {
      this.messageService.subDirectMessage(id);
    } else {
      this.channelService.subChannel(id);
    }
  }

  getUser(users:User[]):User{
    return users.find(user => user.id!=this.activeUser.id) || new User();
  }

  ngOnDestroay(){
    this.unsubChannels.unsubscribe();
  }
}
