import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import classes
import { Message } from '../../models/message.class';
import { User } from '../../models/user.class';

// import services
import { ThreadsService } from '../../../services/threads.service';
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';
import { UserService } from '../../../services/user.service';
import { Datestamp } from '../../models/datestamp.class';
import { MessageService } from '../../../services/message.service';
import { ChannelService } from '../../../services/channel.service';
import { DirectMessageService } from '../../../services/direct-message.service';



@Component({
  selector: 'app-message-container',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-container.component.html',
  styleUrl: './message-container.component.scss',
  providers: [Datestamp],
})

export class MessageContainerComponent {
  threadService = inject(ThreadsService);
  overlayCtrlService = inject(OverlaycontrolService);
  userService = inject(UserService);
  timeStamp!: Date;
  messageService = inject(MessageService);
  channelService = inject(ChannelService);
  directMessageService = inject(DirectMessageService);

  @Input() message: Message = new Message();
  @Input({required: true}) msgType: 'channel' | 'directMsg' | 'thread' = 'channel';

  private textarea!: ElementRef;
  @ViewChild('textarea') set content(content: ElementRef) {if(content)this.textarea = content;}

  nrThreadMsg: Number = 2;
  lastThreadMsgTime: Date = new Date();

  newMsgContent!: string;
  editMsg:boolean = false;
  showMsgMenu:boolean = false;

  constructor() {
  }

  toggleThreads() {
    this.threadService.isShowingSig.set(true)
  }


  toggleMsgMenu(event: Event){
    event.stopPropagation();
    this.showMsgMenu = !this.showMsgMenu;
  }

  hideMsgMenu(){
    this.showMsgMenu = false;
  }
  
  selectUser(user:User){
    this.overlayCtrlService.selectUser(user);
    (user.id == this.userService.activeUser$.value.id)?
      this.overlayCtrlService.showOverlay('registeredUserProfile')
      : this.overlayCtrlService.showOverlay('userProfile');
  }

  isMessageFromActiveUser(){
    return this.userService.activeUser$.value.id == this.message.creator.id;
  }

  openEditMsgField(event:Event){
    event.stopPropagation();
    this.newMsgContent = this.message.content;
    this.editMsg = true;
  }


  deleteMessage(event:Event){
    event.stopPropagation();
    this.messageService.deleteMessage(this.getCollectionID(),this.getDocId(),this.message.id);
  }

  updateMessage(){
    this.message.content = this.newMsgContent;
    this.messageService.updateMessage(this.getCollectionID(),this.getDocId(),this.message.id,this.message);
    this.editMsg = false;
  }

  getCollectionID(){
    return (this.msgType == 'channel')? 'Channels': 'directMessages';
  }

  getDocId(){
    return (this.msgType == 'channel')?
      this.channelService.activeChannel$.value.id:
      this.directMessageService.activeDirectMessage$.value.id;
  }

  resizeTextarea(){
    console.log('resize');
    
    this.textarea.nativeElement.style.height = '0';
    this.textarea.nativeElement.style.height = this.textarea.nativeElement.scrollHeight + 'px';
  }

}
