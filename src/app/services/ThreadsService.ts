import { Injectable, inject, signal } from '@angular/core';
import { FirebaseInitService } from './firebase-init.service';
import { UserService } from './user.service';
import { collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { ChannelService } from './channel.service';
import { MessageService } from './message.service';
import { Message } from '../shared/models/message.class';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../shared/models/user.class';

@Injectable({
  providedIn: 'root',
})
export class ThreadsService {
  channelService = inject(ChannelService);
  messagesService = inject(MessageService);

  activeUser!: User

  unsubUser!: Subscription

  isShowingSig = signal(false);
  messages: Message[] = [];
  threadMessages$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>(
    []
  );

  idOfThisThreads!: string;


  constructor(
    private firebaseInitService: FirebaseInitService,
    private userService: UserService
  ) {
    this.unsubUser = this.userService.activeUser$.subscribe((user) => {
      this.activeUser = user
    })
  }




  async getThread(messageId: string) {
    this.idOfThisThreads = messageId
    await onSnapshot(
      collection(this.getThreadDocRef(messageId), 'threads'),
      (messages) => {
        this.messages = []
        messages.forEach((message) => {
          let newMessage = new Message(message.data());
          newMessage.id = message.id;
          newMessage.creator = new User(
            this.userService.getUser(message.data()['creatorID'])
          );
          this.messages.push(newMessage);
        });
        this.messages = this.messagesService.sortMessagesChronologically(
          this.messages
        );
        this.threadMessages$.next(this.messages);
      }
    );
  }

  getChannelColRef() {
    return collection(this.firebaseInitService.getDatabase(), 'Channels');
  }

  getChannelMessageDocRef() {
    return doc(this.getChannelColRef(), this.channelService.activeChannel$.value.id);
  }

  getSubMessagesColRef() {
    return collection(this.getChannelMessageDocRef(), 'messages');
  }

  getThreadDocRef(messageID: string) {
    return doc(this.getSubMessagesColRef(), messageID);
  }

  getSingleDocRef(messageID: string, docID: string) {
    return doc(collection(this.getThreadDocRef(messageID), 'threads'), docID)
  }

  async updateThread(messageID: string , docID: string, threadContent: any) {
    await updateDoc(this.getSingleDocRef(messageID, docID), threadContent);
  }

  async deleteThread(messageID: string, docID: string) {
    await deleteDoc(this.getSingleDocRef(messageID, docID))
  }

  async saveThread(threadContent: any) {
    let threadID = this.idOfThisThreads
    let message = {
      date: new Date().getTime(),
      reactions: [],
      files: [],
      creatorID: this.activeUser.id,
      content: threadContent,
    }
    await setDoc(doc(collection(this.getThreadDocRef(threadID), 'threads')) , message)
  }

  ngOnDestroy(): void {
    this.unsubUser.unsubscribe()
  }

}
