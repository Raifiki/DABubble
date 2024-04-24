import { Injectable, OnInit, inject } from '@angular/core';
import { FirebaseInitService } from './firebase-init.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Firestore,
  doc,
  collection,
  onSnapshot,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { DirektMessage } from '../shared/models/direct-message.class';
import { deleteDoc, updateDoc } from 'firebase/firestore';
import { UserService } from './user.service';
import { User } from '../shared/models/user.class';
import { Message } from '../shared/models/message.class';
import { Unsubscribe } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class MessageService implements OnInit {
  firebaseInitService = inject(FirebaseInitService);
  
  unsubDirectMessagesList;
  directMessagesList!: {id: string ; users: User[];}[];

  userService = inject(UserService);

  unsubDirectMessage!: Unsubscribe;

  activeDirectMessage$: BehaviorSubject<DirektMessage | undefined> = new BehaviorSubject<DirektMessage | undefined>(undefined);
  private activeDirectMessage: DirektMessage | undefined;

  unsubMessages!: Unsubscribe;

  constructor() {
    this.unsubDirectMessagesList = this.subDirectMessagesList();    
  }

  ngOnDestroy() {
    this.unsubDirectMessagesList();
    this.unsubDirectMessage();
    this.unsubMessages();
  }

  ngOnInit(): void {}

  getDirectMessagesRef() {
    return collection(this.firebaseInitService.getDatabase(), 'directMessages');
  }
  getSingleDocRef(id: string) {
    return doc(this.getDirectMessagesRef(), id);
  }

  getMessagesRef(directMsgId:string){
    return collection(this.getSingleDocRef(directMsgId),'messages')
  }

  setDirectMessageObj(obj: any, id: string) {
    let userList: User[] = [];
    obj.userIds.forEach((userId:string) => {
      let user = this.userService.getUser(userId);
      if(user) userList.push(user);
    });
    return {
      id: id,
      users: userList,
    };
  }

  subDirectMessagesList() {
    return onSnapshot(this.getDirectMessagesRef(), (list) => {
      this.directMessagesList = [];
      list.forEach((element) => {
        let messageData = element.data();
        // if Abfrage in snapshot durch filter integrieren
        if (messageData['userIds'].includes(this.userService.activeUser$.value.id)) {
          this.directMessagesList.push(this.setDirectMessageObj(messageData, element.id));
        }
      });
      console.log('message List: ',this.directMessagesList);
    });
  }

  async createNewDirectMessage(
    userIds: string[],
    content: string,
    creatorId: string,
    files: string[]
  ): Promise<void> {
    const newDirectMessage = {userIds: userIds};
    try {
      const docRef = await addDoc(
        this.getDirectMessagesRef(),
        newDirectMessage
      );
      const messageId = docRef.id;

      const newMessage = {
        content: content,
        creatorId: creatorId,
        date: new Date().getTime(),
        files: files,
        reactions: [],
      };

      await this.addMessageToDirectMessage(messageId, newMessage);
      console.log('Direct message added successfully');
    } catch (error) {
      console.error('Error adding direct message: ', error);
    }
  }

  async addMessageToDirectMessage(directMsgId: string, message: any): Promise<void> {
    try {
      await addDoc(this.getMessagesRef(directMsgId), message);
      console.log('Message added to direct message successfully');
    } catch (error) {
      console.error('Error adding message to direct message: ', error);
    }
  }

  async updateDirectMessage(docId: string, msg: any) {
    await updateDoc(this.getSingleDocRef(docId), msg).catch((error) => {
      console.log(
        'Es ist ein Fehle aufgetreten bei updaten der Nachricht:',
        error
      );
    });
  }

  async deleteDirectMessage(docId: string) {
    await deleteDoc(this.getSingleDocRef(docId)).catch((error) => {
      console.log(
        'Es ist ein Fehler aufgetreten bei löschen der Nachricht:',
        error
      );
    });
  }

  subDirectMessage(directMsgId: string){
    this.unsubDirectMessage = onSnapshot(this.getSingleDocRef(directMsgId), (directMessage) => {
      let data = directMessage.data();      
      if (data) {
        this.activeDirectMessage = new DirektMessage([],directMsgId,[]);
        data['userIds'].forEach((userId:string) => { 
          let user = this.userService.getUser(userId);       
          if(user) this.activeDirectMessage?.users.push(user);
        });
        this.subMessages(directMsgId);
        this.activeDirectMessage$.next(this.activeDirectMessage);
      }
    });
  }

  subMessages(directMsgId: string){
    this.unsubMessages = onSnapshot(this.getMessagesRef(directMsgId), (msgList) => {
      if (this.activeDirectMessage) {
        this.activeDirectMessage.messages = [];
        msgList.forEach(msg => {
          const MASSAGE = new Message(this.getCleanMessageObj(msg.data()),msg.id);
          this.activeDirectMessage?.messages.push(MASSAGE);
        });
        this.activeDirectMessage$.next(this.activeDirectMessage);
      }
    })
  }

  getCleanMessageObj(obj:any){
    return {
      creator : this.userService.getUser(obj.creatorId),
      date : obj.date,
      content : obj.content,
      answers : obj.answers,
      reactions : obj.Reaction,
      files : obj.files,
    }
  }

}
