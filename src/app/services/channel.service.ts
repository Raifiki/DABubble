import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

// import firebase
import { Firestore } from '@angular/fire/firestore';
import { collection, onSnapshot } from 'firebase/firestore';

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
        console.log(this.channels);
      });
    })
  }

  getChannelsRef(){
    return collection(this.firestore,'Channels');
  }

  ngOnDestroy(){
    this.unsubChannels();
  }

}
