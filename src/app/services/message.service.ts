import { Injectable, inject } from '@angular/core';
import { FirebaseInitService } from './firebase-init.service';
import { Observable } from 'rxjs';
import {
  Firestore,
  doc,
  collection,
  onSnapshot,
  addDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  unsubDirectMessages: any;
  directMessagesList: any[] = [];

  constructor(private firebaseInitService: FirebaseInitService) {
    this.getDirectMessagesRef();
  }

  getDirectMessagesRef() {
    return collection(this.firebaseInitService.getDatabase(), 'directMessages');
  }
  getSingleDocRef(id: string) {
    return doc(this.getDirectMessagesRef(), id);
  }

  async getDirectMessagesList() {
    this.unsubDirectMessages = await onSnapshot(
      this.getDirectMessagesRef(),
      (list) => {
        this.directMessagesList = [];
        list.forEach((element) => {
          let id = element.id;
          this.directMessagesList.push(id);
          console.log('direct Messages List: ', this.directMessagesList);
        });
      }
    );
  }

  async createDirectMessage(
    userIds: string[],
    content: string,
    creatorId: string,
    date: any,
    files: string[],
    reactions: any[]
  ): Promise<void> {
    const newDirectMessage = {
      userIds: userIds,
      messages: [],
    };
    try {
      const docRef = await addDoc(
        this.getDirectMessagesRef(),
        newDirectMessage
      );
      const messageId = docRef.id;

      const newMessage = {
        content: content,
        creatorId: creatorId,
        date: date,
        files: files,
        reactions: reactions,
      };

      await this.addMessageToDirectMessage(messageId, newMessage);
      console.log('Direct message added successfully');
    } catch (error) {
      console.error('Error adding direct message: ', error);
    }
  }

  async addMessageToDirectMessage(directMessageId: string, message: any): Promise<void> {
    try {
      const database = this.firebaseInitService.getDatabase();
      const messageRef = collection(database, 'directMessages', directMessageId, 'messages');
      await addDoc(messageRef, message);
      console.log('Message added to direct message successfully');
    } catch (error) {
      console.error('Error adding message to direct message: ', error);
    }
  }
  
}
