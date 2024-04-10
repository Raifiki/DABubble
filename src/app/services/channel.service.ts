import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// import classes
import { Channel } from '../shared/models/channel.class';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private openedChannel: BehaviorSubject<Channel> = new BehaviorSubject<Channel>(
    {
      name : 'Test-Channel',
      description : 'Dummy Channel for development',
      members : [],
      creator : {
        name: 'Leo Weiß',
        avatarImgPath: 'assets/img/avatar/avatar1.svg',
        email: 'test@dev.com',
        status: 'Aktiv' ,
        password: 'Test12345!',
      },
      messages : []
    }
  );
  openedChannel$ = this.openedChannel.asObservable();

}
