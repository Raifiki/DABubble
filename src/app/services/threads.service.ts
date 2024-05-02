import { Injectable, inject, signal } from '@angular/core';
import { FirebaseInitService } from './firebase-init.service';
import { UserService } from './user.service';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { ChannelService } from './channel.service';
import { MessageService } from './message.service';
import { Message } from '../shared/models/message.class';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Unsubscribe } from 'firebase/auth';
import { User } from '../shared/models/user.class';
import { DirektMessage } from '../shared/models/direct-message.class';




@Injectable({
  providedIn: 'root'
})
export class ThreadsService {

  channelService = inject(ChannelService)
  messagesService = inject(MessageService)


  constructor(private firebaseInitService: FirebaseInitService, private userService: UserService) { }

  isShowingSig = signal(false)
  messages: Message[] = []
  threadMessages$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([])
  


  //   async getThread(messageId: string) {
  //     await onSnapshot(collection(this.getThreadDocRef(messageId), 'threads'), (messages) => {
  //     messages.forEach((message) => {
  //       let newMessage = new Message(message.data());
  //     newMessage.id = messageId
  //   })  
  //   console.log(this.messages)
  //   this.messages = this.messagesService.sortMessagesChronologically(this.messages)
  //   this.threadMessages$.next(this.messages)
  // }
  async getThread(messageId: string) {
    await onSnapshot(collection(this.getThreadDocRef(messageId), 'threads'), (messages) => {
        messages.forEach((message) => {
            let newMessage = new Message(message.data());
            newMessage.id = message.id;
            newMessage.creator = new User(this.userService.getUser(message.data()['creatorID']))
            this.messages.push(newMessage)
        });
        this.messages = this.messagesService.sortMessagesChronologically(this.messages)
        this.threadMessages$.next(this.messages)
    });
}

  getChannelColRef() {
    return collection(this.firebaseInitService.getDatabase(), 'Channels')
  }

  getChannelMessageDocRef() {
    return doc(this.getChannelColRef(), this.channelService.activeChannel$.value.id)
  }

  getSubMessagesColRef() {
    return (collection(this.getChannelMessageDocRef(), 'messages'))
  }

  getThreadDocRef(messageID: string) {
    return doc(this.getSubMessagesColRef(), messageID)
  }

 








}
