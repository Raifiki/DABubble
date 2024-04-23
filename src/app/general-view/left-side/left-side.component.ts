import { CommonModule } from '@angular/common';
import { Component, inject, Output, EventEmitter, OnInit } from '@angular/core';
import { MembersListComponent } from '../overlay/members-list/members-list.component';

//services
import { MessageService } from '../../services/message.service';
import { OverlaycontrolService } from '../../services/overlaycontrol.service';
import { StorageService } from '../../services/storage.service';
import { User } from '../../shared/models/user.class';
import { ChannelService } from '../../services/channel.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-left-side',
  standalone: true,
  imports: [CommonModule, MembersListComponent],
  templateUrl: './left-side.component.html',
  styleUrl: './left-side.component.scss',
})
export class LeftSideComponent {
  activeUser!: User;
  subscription: Subscription;

  @Output() toggleMessageComponent = new EventEmitter<string>();
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
    this.activeUser = this.userService.loadingUserFromStorage();
    this.userService.activeUser$.next(this.activeUser);
    this.subscription = this.userService.activeUser$.subscribe((userData) => {
      this.activeUser = new User(userData);
      this.getChannelNames(userData.channelIDs);
      console.log(userData.channelIDs);
    });
  }

  toggleDropdown(dropdownType: 'channels' | 'directMessages') {
    this.dropdownCollapsed[dropdownType] =
      !this.dropdownCollapsed[dropdownType];
  }

  openNewMessageComponent(component: string) {
    this.toggleMessageComponent.emit(component);
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
}
