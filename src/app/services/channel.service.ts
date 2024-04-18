import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// import firebase
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

// import classes
import { Channel } from '../shared/models/channel.class';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  // ++++++++++++++++++++ old stuff start +++++++++++++++++++++
  private openedChannel: BehaviorSubject<Channel> = new BehaviorSubject<Channel>(
    new Channel('', 'Test-Channel', '', 'Dummy Channel for development' )
  );
  openedChannel$ = this.openedChannel.asObservable();
  // ++++++++++++++++++++ old stuff end +++++++++++++++++++++

  channels: Channel[] = [];

  firestore: Firestore = inject(Firestore);
  unsubChannels;

  constructor(){
    this.unsubChannels = this.subChannels();
  }

  subChannels(){
    return onSnapshot(this.getChannelsRef(), (channels) => {
      this.channels = [];
      channels.forEach(channel => {
          this.channels.push( 
            new Channel(
              channel.id,
              channel.data()['name'],
              channel.data()['creatorID'],
              channel.data()['description'],
              channel.data()['userID']
            )
          );
        console.log('unfiltered Channels:', this.channels);
      });
    })
  }

  async createChannel(channel: Channel){
    await addDoc(this.getChannelsRef(),channel.getCleanBEJSON())
      .catch( 
        (err) => {alert(['Channel konnte nicht erstellt werden aufgrund folgenden Fehlers: ' + err])})
      .then( 
        (docRef) => { console.log('Channel wurde mit der folgenden ID erstellt:' , docRef?.id , 'new Channel ID muss noch zu allen usern/membern hinzugefügt werden')})
  }

  async deleteChannel(id:string){
    await deleteDoc(this.getChannelRef(id))
    .catch(
      (err) => {alert(['Channel konnte nicht gelöscht werden aufgrund folgenden Fehlers: ' + err]);})
    .then(
      (docRef) => {console.log('channel mit folgender ID wurde gelöscht: ' , id , 'channel ID muss bei den Users noch gelöscht werden');}
    );
  }

  getChannelsRef(){
    return collection(this.firestore,'Channels');
  }

  getChannelRef(docID: string){
    return doc(collection(this.firestore,'Channels'),docID);
  }

  ngOnDestroy(){
    this.unsubChannels();
  }
}
