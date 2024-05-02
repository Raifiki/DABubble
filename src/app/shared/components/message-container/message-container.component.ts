import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import classes
import { Message } from '../../models/message.class';
import { User } from '../../models/user.class';
import { Reaction } from '../../models/reaction.class';

// import services
import { ThreadsService } from '../../../services/threads.service';
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';
import { UserService } from '../../../services/user.service';
import { MessageService } from '../../../services/message.service';
import { ChannelService } from '../../../services/channel.service';
import { DirectMessageService } from '../../../services/direct-message.service';

// imort customer components
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiComponent } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'app-message-container',
  standalone: true,
  imports: [CommonModule, FormsModule, PickerComponent, EmojiComponent ],
  templateUrl: './message-container.component.html',
  styleUrl: './message-container.component.scss',
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
  @Input({ required: true }) msgType: 'channel' | 'directMsg' | 'thread' =
    'channel';

  private textarea!: ElementRef;
  @ViewChild('textarea') set content(content: ElementRef) {
    if (content) this.textarea = content;
  }

  nrThreadMsg: Number = 2;
  lastThreadMsgTime: Date = new Date();

  newMsgContent!: string;
  editMsg: boolean = false;
  showMsgMenu: boolean = false;

  showEmojiPickerEditMsg: boolean = false;
  showEmojiPickerReaction: boolean = false;

  constructor() {}

  toggleThreads() {
    this.threadService.isShowingSig.set(true);
    this.threadService.subThread(this.message.id)
  }

  toggleMsgMenu(event: Event) {
    event.stopPropagation();
    this.showEmojiPickerReaction = false;
    this.showMsgMenu = !this.showMsgMenu;
  }

  selectUser(user: User) {
    this.overlayCtrlService.selectUser(user);
    (user.id == this.userService.activeUser$.value.id)?
      this.overlayCtrlService.showOverlay('registeredUserProfile')
      : this.overlayCtrlService.showOverlay('userProfile');
  }

  isMessageFromActiveUser() {
    return this.userService.activeUser$.value.id == this.message.creator.id;
  }

  openEditMsgField(event: Event) {
    event.stopPropagation();
    this.newMsgContent = this.message.content;
    this.editMsg = true;
  }

  deleteMessage(event: Event) {
    event.stopPropagation();
    this.messageService.deleteMessage(
      this.getCollectionID(),
      this.getDocId(),
      this.message.id
    );
  }

  updateMessage() {
    this.message.content = this.newMsgContent;
    this.messageService.updateMessage(
      this.getCollectionID(),
      this.getDocId(),
      this.message.id,
      this.message
    );
    this.editMsg = false;
  }

  getCollectionID() {
    return this.msgType == 'channel' ? 'Channels' : 'directMessages';
  }

  getDocId() {
    return this.msgType == 'channel'
      ? this.channelService.activeChannel$.value.id
      : this.directMessageService.activeDirectMessage$.value.id;
  }

  resizeTextarea() {
    console.log('resize');

    this.textarea.nativeElement.style.height = '0';
    this.textarea.nativeElement.style.height =
      this.textarea.nativeElement.scrollHeight + 'px';
  }

  addEmoji(event:any){
    let textareaElement = this.textarea.nativeElement as HTMLTextAreaElement;
    let [caretStart, caretEnd] = [textareaElement.selectionStart, textareaElement.selectionEnd];
    this.newMsgContent = this.newMsgContent.substring(0,caretStart) + this.getEmoji(event) + this.newMsgContent.substring(caretEnd);
    this.toggleEmojiPicker('editMsg');
  }

  addReaction(emoji:string){
    let user = this.userService.activeUser$.value;
    this.message.updateReactions(emoji,user);
    this.messageService.updateMessage(this.getCollectionID(),this.getDocId(),this.message.id,this.message);
  }

  selectReaction(event:any){
    let emoji = this.getEmoji(event);
    this.addReaction(emoji);
    this.toggleEmojiPicker('reaction');
  }

  getEmoji(event:any){
    return event['emoji'].native;
  }

  toggleEmojiPicker(picker: 'editMsg' | 'reaction', event?: Event){
    if(event)event.stopPropagation();
    this.showMsgMenu = false;
    if(picker == 'editMsg'){
      this.showEmojiPickerEditMsg = !this.showEmojiPickerEditMsg;
    } else {
      this.showEmojiPickerReaction = !this.showEmojiPickerReaction;
    }
  }

  hidePupUps(){
    this.showMsgMenu = false;
    this.showEmojiPickerEditMsg = false;
    this.showEmojiPickerReaction = false;
  }

  getReactionNames(emoji:string){
    let names = '';
    let users = this.message.reactions.filter(reaction => reaction.emoji == emoji)[0].users;
    if (users.length > 2){
      if(users.find(user => user.id == this.userService.activeUser$.value.id)){
        names = users.length-1 + 'Personen' + 'und Du';  
      } else {
        names = users.length-1 + 'Personen'
      }
    } else {
      users.forEach((user, idx, array) => {
        names += (idx == array.length -1)? user.name : user.name + ' und ';
      });
    }
    return names;
  }

}
