import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { ChannelService } from '../../../services/channel.service';
import { Message } from '../../models/message.class';
import { Channel } from '../../models/channel.class';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmojiComponent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { UserlistitemComponent } from '../userlistitem/userlistitem.component';
import { StorageService } from '../../../services/storage.service';
import { StorageReference } from 'firebase/storage';
import { DirektMessage } from '../../models/direct-message.class';
import { DirectMessageService } from '../../../services/direct-message.service';
import { ThreadsService } from '../../../services/ThreadsService';

@Component({
  selector: 'app-textarea-container',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PickerComponent,
    EmojiComponent,
    UserlistitemComponent,
  ],
  templateUrl: './textarea-container.component.html',
  styleUrls: ['./textarea-container.component.scss'],
})
export class TextareaContainerComponent {
  messageService = inject(MessageService);
  channelService = inject(ChannelService);
  userService = inject(UserService);
  storageService = inject(StorageService);
  directMessagesService = inject(DirectMessageService);
  threadsService = inject(ThreadsService);

  activeUser: User = new User();
  unsubscribeActiveUser: Subscription;

  @Input() isThread: boolean = false;
  @Input() channel: Channel = {} as Channel;
  @Input() directMessage: DirektMessage = {} as DirektMessage;
  @Input() colId: 'Channels' | 'directMessages' | undefined;
  unsubChannels: Subscription;
  channels: Channel[] = [];

  newMessage: Message = new Message();
  messages: Message[] = [];
  unsubMessages: Subscription;

  showEmojiPicker: boolean = false;

  storageRef!: StorageReference;
  files: File[] = [];

  newUsers: User[] = [];
  @Input() selectedUsers: User[] = [];
  selectMember: boolean = false;
  unsubUsersList: Subscription;
  userList: User[] = [];
  filteredUserList: User[] = [];

  @ViewChild('textarea') private textarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('emojiPicker') emojiPicker!: ElementRef<HTMLDivElement>;
  @ViewChild('userListDiv') userListDiv!: ElementRef<HTMLDivElement>;

  constructor(private elementRef: ElementRef) {
    this.unsubChannels = this.channelService.channels$.subscribe(
      (channelList) => (this.channels = channelList)
    );

    this.unsubscribeActiveUser = this.userService.activeUser$.subscribe(
      (user) => {
        this.activeUser = user;
      }
    );

    this.unsubMessages = this.messageService.messages$.subscribe((messages) => {
      this.messages = messages;
    });

    this.unsubUsersList = this.userService.usersList$.subscribe((data) => {
      this.userList = data;
    });
    this.filteredUserList = this.userList;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (
      this.emojiPicker &&
      !this.emojiPicker.nativeElement.contains(event.target as Node)
    ) {
      this.showEmojiPicker = false;
    }
    if (
      this.userListDiv &&
      !this.userListDiv.nativeElement.contains(event.target as Node)
    ) {
      this.selectMember = false;
    }
  }

  addEmoji(event: any) {
    let textareaElement = this.textarea.nativeElement;
    let [caretStart, caretEnd] = [
      textareaElement.selectionStart,
      textareaElement.selectionEnd,
    ];
    this.newMessage.content =
      this.newMessage.content.substring(0, caretStart) +
      this.getEmoji(event) +
      this.newMessage.content.substring(caretEnd);
    this.toggleEmojiPicker();
  }

  getEmoji(event: any) {
    return event['emoji'].native;
  }

  toggleEmojiPicker(event?: Event) {
    if (event) event.stopPropagation();
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  async sendNewMessage() {
    if (this.isThread) {
      let message = new Message();
      message.creator = this.userService.activeUser$.value;
      message.content = this.newMessage.content;
      message.date = new Date();
      message.files = []; // add filenames
      message.reactions = [];
      this.threadsService.saveThread(message);
      this.newMessage.content = '';
    } else {
      this.fullfillMsgData();
      let id =
        this.colId === 'Channels' ? this.channel.id : this.directMessage.id;
      let msgId = await this.messageService.addMessageToCollection(
        this.colId,
        id,
        this.newMessage
      );

      if (msgId && this.files.length > 0) {
        this.storageRef = this.storageService.getChannelMsgRef(
          this.channel.id,
          msgId
        );
        this.files.forEach((file) => {
          this.storageService.uploadFile(this.storageRef, file);
        });
      }
      this.newMessage = new Message();
      this.files = [];
    }
  }

  fullfillMsgData() {
    this.newMessage.creator = this.activeUser;
    this.newMessage.date = new Date();
    this.files.forEach((file) => this.newMessage.files.push(file.name));
  }

  addUser(user: User) {
    let textareaElement = this.textarea.nativeElement;
    let [caretStart, caretEnd] = [
      textareaElement.selectionStart,
      textareaElement.selectionEnd,
    ];
    this.newMessage.content =
      this.newMessage.content.substring(0, caretStart) +
      '@' +
      user.name +
      this.newMessage.content.substring(caretEnd);
  }

  toggleUserList() {
    this.selectMember = !this.selectMember;
  }

  openFileExplorer() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.click();
    fileInput.addEventListener('change', (event) => {
      const fileList: any = (event.target as HTMLInputElement).files;
      if (fileList && fileList.length > 0) {
        const file: File = fileList[0];

        if (this.checkFileType(file)) {
          this.files.push(file);
        } else {
          alert(
            'Es werden nur folgende Dokumente akzeptiert (png. jpg, jpeg, svg, tif, bmp emf, gif, png, pdf, excel, word, zip, ppt'
          );
        }
      }
    });
  }

  checkFileType(file: File): boolean {
    let type = this.getFileType(file.name);
    return (
      type === 'img' ||
      type === 'pdf' ||
      type === 'excel' ||
      type === 'word' ||
      type === 'zip' ||
      type === 'ppt'
    );
  }

  getFileImgPath(fileName: string) {
    let imgPath = 'assets/img/fileType/document.png';
    let fileType = this.getFileType(fileName);
    switch (fileType) {
      case 'img':
        imgPath = 'assets/img/fileType/image.png';
        break;
      case 'pdf':
        imgPath = 'assets/img/fileType/pdf.png';
        break;
      case 'word':
        imgPath = 'assets/img/fileType/word.png';
        break;
      case 'zip':
        imgPath = 'assets/img/fileType/zip.png';
        break;
      case 'ppt':
        imgPath = 'assets/img/fileType/ppt.png';
        break;
      case 'excel':
        imgPath = 'assets/img/fileType/excel.png';
        break;
      default:
        break;
    }
    return imgPath;
  }

  getFileType(fileName: string) {
    let type = fileName.split('.').splice(-1)[0].toLocaleLowerCase();
    if (
      ['png', 'jpg', 'jpeg', 'svg', 'tif', 'bmp', 'emf', 'gif'].includes(type)
    ) {
      type = 'img';
    }
    return type;
  }

  deleteFile(idx: any) {
    this.files.splice(idx, 1);
  }

  ngOnDestroy() {
    this.unsubMessages.unsubscribe();
    this.unsubscribeActiveUser.unsubscribe();
  }

  async downloadFile() {
    this.storageRef = this.storageService.getChannelMsgRef(
      this.channel.id,
      'XhiAiZSa8eBIXzdJPdbG'
    );
    await this.storageService.downloadFile(
      this.storageRef,
      'alternate_email.svg'
    );
  }
}
