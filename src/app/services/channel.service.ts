import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

// import firebase
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { Unsubscribe } from 'firebase/auth';

// import classes
import { Channel } from '../shared/models/channel.class';
import { User } from '../shared/models/user.class';

// import services
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  firestore: Firestore = inject(Firestore);

  userService = inject(UserService);

  activeUser!: User;
  unsubActiveUser: Subscription;

  channels$: BehaviorSubject<Channel[]> = new BehaviorSubject<Channel[]>([]);
  unsubChannels;
 
  activeChannel$: BehaviorSubject<Channel> = new BehaviorSubject<Channel>(new Channel('','',''));;
  unsubChannel!: Unsubscribe;

  constructor() {
    this.unsubActiveUser = this.userService.activeUser$.subscribe(activeUser => {this.activeUser = activeUser});
    this.unsubChannels = this.subChannels();
  }

  subChannels() {
    return onSnapshot(this.getChannelsRef(), (channels) => {
      let channelList: Channel[] = [];
      channels.forEach((channel) => {
        let data = channel.data();
        if(data['userID'].includes(this.activeUser.id)) {
          channelList.push(
            new Channel(
              channel.id,
              data['name'],
              data['creatorID'],
              data['description'],
              data['userID']
            )
          );
        }
      });
      this.channels$.next(channelList);
    });
  }

  async createChannel(channel: Channel) {
    let newId;
    await addDoc(this.getChannelsRef(), channel.getCleanBEJSON())
      .catch((err) => {
        alert([
          'Channel konnte nicht erstellt werden aufgrund folgenden Fehlers: ' +
            err,
        ]);
      })
      .then((docRef) => {
        console.log(
          'Channel wurde mit der folgenden ID erstellt:',
          docRef?.id,
          'new Channel ID muss noch zu allen usern/membern hinzugefügt werden'
        );
        newId = docRef?.id;
      });
    return newId;
  }

  async deleteChannel(channelID: string) {
    await deleteDoc(this.getChannelRef(channelID))
      .catch((err) => {
        alert([
          'Channel konnte nicht gelöscht werden aufgrund folgenden Fehlers: ' +
            err,
        ]);
      })
      .then((docRef) => {
        console.log(
          'channel mit folgender ID wurde gelöscht: ',
          channelID,
          'channel ID muss bei den Users noch gelöscht werden'
        );
      });
  }

  async updateChannel(channel: Channel) {
    await updateDoc(this.getChannelRef(channel.id), channel.getCleanBEJSON())
      .catch((err) => {
        alert([
          'Channel konnte nicht geupdatet werden aufgrund folgenden Fehlers: ' +
            err,
        ]);
      })
      .then((docRef) => {
        console.log(
          'channel mit folgender ID wurde geupdatet: ',
          channel.id,
          'channel ID muss bei den Users noch gelöscht werden'
        );
      });
  }

  getChannelsRef() {
    return collection(this.firestore, 'Channels');
  }

  getChannelRef(docID: string) {
    return doc(collection(this.firestore, 'Channels'), docID);
  }

  ngOnDestroy() {
    this.unsubChannels();
    this.unsubChannel();
    this.unsubActiveUser.unsubscribe();
  }

  subChannel(channelID: string) {
    this.unsubChannel = onSnapshot(this.getChannelRef(channelID), (channel) => {
      let data = channel.data();
      let activeChannel = new Channel('','','');
      if (data) {
          activeChannel.id = channel.id;
          activeChannel.name = data['name'];
          activeChannel.creator = data['creatorID'];
          activeChannel.description = data['description'];
          activeChannel.members = data['userID'];
      }
      this.activeChannel$.next(activeChannel);
    });
  }

  getChannelsNameList(){
    return this.channels$.value.map(channel => channel.name);
  }
}
