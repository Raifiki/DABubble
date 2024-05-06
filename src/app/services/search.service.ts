import { Injectable, inject } from '@angular/core';
import { FirebaseInitService } from './firebase-init.service';
import { collection } from 'firebase/firestore';
import { UserService } from './user.service';
import { ThreadsService } from './ThreadsService';
import { MessageService } from './message.service';
import { ChannelService } from './channel.service';
import { Subscription } from 'rxjs';
import { User } from '../shared/models/user.class';
import { Channel } from '../shared/models/channel.class';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  firebaseInitService = inject(FirebaseInitService)
  userService = inject(UserService)
  threadsService = inject(ThreadsService)
  messageService = inject(MessageService)
  channelService = inject(ChannelService)

  
  searchUserResult:User[] = [];
  searchChannelsResult:Channel[] = [];
  threads = [];
  listOfAllUsers: User[] = [];
  listOfAllChannels: Channel[] = []
 
  unsubUsers: Subscription
  unsubChannel: Subscription

  constructor() {

    this.unsubUsers = this.userService.usersList$.subscribe((list) => {
      this.listOfAllUsers = list
    })
    this.unsubChannel = this.channelService.channels$.subscribe((list) => {
      this.listOfAllChannels = list
    })
   }

   ngOnDestroy(): void {
    this.unsubUsers.unsubscribe()
    this.unsubChannel.unsubscribe()
   }


searchUsers(input: string) {
  this.searchUserResult = [];
  return this.listOfAllUsers.forEach((user) => {
    let nameToCompareWith = user.name.toLowerCase();
    if (nameToCompareWith.includes(input.toLowerCase())) {
      this.searchUserResult.push(user);
      console.log(this.searchUserResult)
    }
  })
}


seachUsersAt(input: string) {
  this.searchUserResult = [];
  return this.listOfAllUsers.forEach((user) => {
    let nameToCompareWith = user.name.toLowerCase();
      if (nameToCompareWith.includes(input.slice(1).toLowerCase())) {
        this.searchUserResult.push(user);
        console.log(this.searchUserResult)
      }
    })
}


searchChannels(input: string) {
  this.searchChannelsResult = [];
  return this.listOfAllChannels.forEach(channel => {
      let channelToCompareWith = channel['name'].toLowerCase();
      let docId = channel.id;
        if (channelToCompareWith.includes(input.toLowerCase())) {
          this.searchChannelsResult.push(channel);
          console.log(this.searchChannelsResult)
        }
    })
}

searchChannelsAt(input: string) {
  this.searchChannelsResult = [];
  return this.listOfAllChannels.forEach(channel => {
      let channelToCompareWith = channel['name'].toLowerCase();
      let docId = channel.id;
        if (channelToCompareWith.includes(input.slice(1).toLowerCase())) {
          this.searchChannelsResult.push(channel);
          console.log(this.searchChannelsResult)
        }
  })
}


// searchThreads(input: string) {
//   this.threads = [];
//   return onSnapshot(q, (list) => {
//     list.forEach((element) => {
//       let members = element.data()['members'];
//       let docId = element.id;
//       let channelName = element.data()['name'];
//         this.findThreads(input, docId, channelName)
//     });
//   });
// }


// findThreads(input: string, docId: string, channelName: string) {
//   let channelDocRef = doc(this.channelRef, docId);
//   let threadsRef = collection(channelDocRef, 'threads');
//   onSnapshot(threadsRef, (threadSnapshot) => {
//     threadSnapshot.forEach((threadDoc) => {
//       let compare = threadDoc.data()['message'].toLowerCase();
//       if (compare.includes(input.toLowerCase())) {
//         this.threads.push({ id: docId, channelName: channelName, ...threadDoc.data() });
//       }
//     });
//   });
// }


noResultFound() {
  if (this.searchChannelsResult.length === 0 && this.searchUserResult.length === 0 && this.threads.length === 0) {
    return true;
  } else {
    return false;
  }
}


}