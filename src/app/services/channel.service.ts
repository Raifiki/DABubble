import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// import firebase
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';

// import classes
import { Channel } from '../shared/models/channel.class';
import { Unsubscribe } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  channels: Channel[] = [];
  activeChannel: Channel = {} as Channel;
  channelsList: string[] = [];

  firestore: Firestore = inject(Firestore);
  unsubChannels;
  unsubChannel!: Unsubscribe;

  constructor() {
    this.unsubChannels = this.subChannels();
  }

  subChannels() {
    return onSnapshot(this.getChannelsRef(), (channels) => {
      this.channels = [];
      channels.forEach((channel) => {
        this.channels.push(
          new Channel(
            channel.id,
            channel.data()['name'],
            channel.data()['creatorID'],
            channel.data()['description'],
            channel.data()['userID']
          )
        );
      });
      this.subChannel('LbzEitGqaO3A2U8Jl6lj');
    });
  }

  async createChannel(channel: Channel) {
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
      });
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
  }

  subChannel(channelID: string) {
    this.unsubChannel = onSnapshot(this.getChannelRef(channelID), (channel) => {
      let data = channel.data();
      if (data) {
        this.activeChannel = new Channel(
          channel.id,
          data['name'],
          data['creatorID'],
          data['description'],
          data['userID']
        );
      }
    });
  }

  async getChannelList() {
    this.unsubChannels = await onSnapshot(this.getChannelsRef(), (list) => {
      this.channelsList = [];
      list.forEach((element) => {
        let id = element.id;
        this.channelsList.push(id);
      });
      console.log('channel Messages List: ', this.channelsList);
    });
  }
}
