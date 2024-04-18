import { Injectable, inject} from '@angular/core';
import { FirebaseInitService } from './firebase-init.service';
import { Observable } from 'rxjs';
import { Firestore, doc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  firestore: Firestore = inject(Firestore);

  constructor(){

  }

  getDirectMessagesRef(){
    return collection(this.firestore, 'directMessages')
  }
  getSingleDocRef(colId: string, docId: string){
    return doc(collection(this.firestore, colId), docId)
  }
}