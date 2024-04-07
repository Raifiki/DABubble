import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// import customer component
import { UserlistitemComponent } from '../shared/components/userlistitem/userlistitem.component';

// import classes
import { Channel } from '../shared/models/channel.class';

// import interfaces
import { User } from '../shared/interfaces/interfaces';

@Component({
  selector: 'app-createchannel',
  standalone: true,
  imports: [FormsModule,UserlistitemComponent],
  templateUrl: './createchannel.component.html',
  styleUrl: './createchannel.component.scss'
})
export class CreatechannelComponent {
  channel: Channel = new Channel();

  formState: 'channelName' | 'addMember' = 'addMember';
  memberSelection: 'all' | 'select' = 'all';

  users: User[] = [
    {
      name: 'User0',
      avatarImgPath: 'assets/img/avatar/avatar0.svg',
      email: 'user0@DABubble.com',
      status: 'Aktiv',
      password: ''
    }, 
    {
      name: 'User1',
      avatarImgPath: 'assets/img/avatar/avatar2.svg',
      email: 'user1@DABubble.com',
      status: 'Abwesend',
      password: ''
    },
    {
      name: 'User2',
      avatarImgPath: 'assets/img/avatar/avatar3.svg',
      email: 'user2@DABubble.com',
      status: 'Aktiv',
      password: ''
    },
    {
      name: 'User3',
      avatarImgPath: 'assets/img/avatar/avatar4.svg',
      email: 'user3@DABubble.com',
      status: 'Abwesend',
      password: ''
    },
    {
      name: 'User4',
      avatarImgPath: 'assets/img/avatar/avatar5.svg',
      email: 'user4@DABubble.com',
      status: 'Aktiv',
      password: ''
    }
  ];

  onSubmitName(form:NgForm){
    if (form.valid) {
      this.formState = 'addMember';
    }
  }

  onSubmit(form:NgForm){

  }

}
