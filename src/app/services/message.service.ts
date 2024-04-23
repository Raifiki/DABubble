import { Injectable, OnInit, inject } from '@angular/core';
import { FirebaseInitService } from './firebase-init.service';
import { Observable } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class MessageService implements OnInit {
  firebaseInitService = inject(FirebaseInitService);
  unsubDirectMessagesList;

  directMessagesList!: {id: string ; users: User[];}[];

  userService = inject(UserService);

  constructor() {
    this.unsubDirectMessagesList = this.subDirectMessagesList();    
  }

  ngOnDestroy() {
    this.unsubDirectMessagesList();
  }

  ngOnInit(): void {}

  getDirectMessagesRef(coldId: string) {
    return collection(this.firebaseInitService.getDatabase(), coldId);
  }
  getSingleDocRef(coldId: string, id: string) {
    return doc(this.getDirectMessagesRef(coldId), id);
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
    return onSnapshot(this.getDirectMessagesRef('directMessages'), (list) => {
      this.directMessagesList = [];
      list.forEach((element) => {
        let messageData = element.data();
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
        this.getDirectMessagesRef('directMessages'),
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

  async addMessageToDirectMessage(
    directMessageId: string,
    message: any
  ): Promise<void> {
    try {
      const database = this.firebaseInitService.getDatabase();
      const messageRef = collection(
        database,
        'directMessages',
        directMessageId,
        'messages'
      );
      await addDoc(messageRef, message);
      console.log('Message added to direct message successfully');
    } catch (error) {
      console.error('Error adding message to direct message: ', error);
    }
  }

  async updateMessage(colId: string, docId: string, msg: any) {
    await updateDoc(this.getSingleDocRef(colId, docId), msg).catch((error) => {
      console.log(
        'Es ist ein Fehle aufgetreten bei updaten der Nachricht:',
        error
      );
    });
  }

  async deleteMessage(colId: string, docId: string) {
    await deleteDoc(this.getSingleDocRef(colId, docId)).catch((error) => {
      console.log(
        'Es ist ein Fehler aufgetreten bei löschen der Nachricht:',
        error
      );
    });
  }
}
