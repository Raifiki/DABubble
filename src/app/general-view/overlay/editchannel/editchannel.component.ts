import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

// import services
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';
import { ChannelService } from '../../../services/channel.service';

// import Classes
import { Channel } from '../../../shared/models/channel.class';

@Component({
  selector: 'app-editchannel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editchannel.component.html',
  styleUrl: './editchannel.component.scss'
})
export class EditchannelComponent {
  overlayCtrlService = inject(OverlaycontrolService);
  channelService = inject(ChannelService);

  channel!: Channel;

  newName: string;
  editName: boolean = false;
  editDetails  : boolean = false;

  @ViewChild('textarea') private textarea!: ElementRef<HTMLElement>;

  constructor(){

    this.channel = this.channelService.activeChannel$.value;
    this.newName = this.channel.name;
  }
  
  ngAfterViewInit(){
    this.resizeTextarea();
  }

  ngOnDestroy(){
  }

  resizeTextarea(){
    this.textarea.nativeElement.style.height = '0';
    this.textarea.nativeElement.style.height = this.textarea.nativeElement.scrollHeight + 'px';
  }

  async updateChannelName(){
    this.channel.name = this.newName;
    await this.updateChannelOnServer();
  }
  
  async updateChannelDescription(){
    await this.updateChannelOnServer();
  }
  
  
  async removeUserFromChannel(){
    // remove signedIn user from chennel memberlist and channel from user channel list needs to be done
    await this.updateChannelOnServer();
  }

  async updateChannelOnServer(){
    await this.channelService.updateChannel(this.channel);
  }

}
