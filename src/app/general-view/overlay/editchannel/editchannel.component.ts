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

  unsubscripeChannel: Subscription

  channel!: Channel;
  newName: string;
  editName: boolean = false;
  editDetails  : boolean = false;

  @ViewChild('textarea') private textarea!: ElementRef<HTMLElement>;

  constructor(){
    this.unsubscripeChannel = this.channelService.openedChannel$.subscribe(channel => this.channel = channel);
    this.newName = this.channel.name;
  }
  
  ngAfterViewInit(){
    this.resizeTextarea();
  }

  ngOnDestroay(){
    this.unsubscripeChannel.unsubscribe();
  }

  resizeTextarea(){
    this.textarea.nativeElement.style.height = '0';
    this.textarea.nativeElement.style.height = this.textarea.nativeElement.scrollHeight + 'px';
  }

  updateChannelName(){
    this.channel.name = this.newName;
  }

}
