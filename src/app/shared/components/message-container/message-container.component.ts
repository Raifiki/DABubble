import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';

// import classes
import { Message } from '../../models/message.class';
import { User } from '../../models/user.class';

// import services
import { ThreadsService } from '../../../services/threads.service';
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';
import { UserService } from '../../../services/user.service';
import { Datestamp } from '../../models/datestamp.class';

@Component({
  selector: 'app-message-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-container.component.html',
  styleUrl: './message-container.component.scss',
  providers: [Datestamp],
})

export class MessageContainerComponent {
  threadService = inject(ThreadsService);
  overlayCtrlService = inject(OverlaycontrolService);
  userService = inject(UserService);
  timeStamp!: Date;

  @Input() message: Message = new Message();
  @Input({required: true}) msgType: 'channel' | 'directMsg' | 'thread' = 'channel';


  nrThreadMsg: Number = 2;
  lastThreadMsgTime: Date = new Date();

  constructor() {
  }

  toggleThreads() {
    this.threadService.isShowingSig.set(true)
  }

  selectUser(user:User){
    this.overlayCtrlService.selectUser(user);
    this.overlayCtrlService.showOverlay('userProfile')
  }

  isMessageFromActiveUser(){
    return this.userService.activeUser$.value.id == this.message.creator.id;
  }



}
