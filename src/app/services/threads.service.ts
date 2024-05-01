import { Injectable, signal } from '@angular/core';
import { FirebaseInitService } from './firebase-init.service';
import { UserService } from './user.service';
import { collection } from 'firebase/firestore';
import { Threads } from '../shared/models/thread.class';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {
  allThreads!: Threads[]

  constructor(private firebaseInitService: FirebaseInitService, private userService: UserService) { }

  isShowingSig = signal(false)

  getAllThreads() {

  }

  getChannelRef() {
    return collection(this.firebaseInitService.getDatabase(), 'threads' )
  }


}
