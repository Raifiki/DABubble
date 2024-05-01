import { Injectable, inject, signal } from '@angular/core';
import { FirebaseInitService } from './firebase-init.service';
import { UserService } from './user.service';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { ChannelService } from './channel.service';



@Injectable({
  providedIn: 'root'
})
export class ThreadsService {

  channelService = inject(ChannelService)

  constructor(private firebaseInitService: FirebaseInitService, private userService: UserService) { }

  isShowingSig = signal(false)


  subThread(messageId: string) {
    onSnapshot(collection(doc(collection(doc(collection(this.firebaseInitService.getDatabase(), 'Channels'), this.channelService.activeChannel$.value.id), 'messages'), messageId ), 'threads'), (datas) => {
      datas.forEach((data) => console.log(data.data()))
  })
    
  }



}
