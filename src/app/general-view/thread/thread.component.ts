import { Component, Input, inject, signal } from '@angular/core';
import { Message } from '../../shared/models/message.class';
import { CommonModule } from '@angular/common';
import { Channel } from '../../shared/models/channel.class';
import { MessageContainerComponent } from '../../shared/components/message-container/message-container.component';
import { ThreadsService } from '../../services/threads.service';
import { FirebaseInitService } from '../../services/firebase-init.service';

import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [CommonModule, MessageContainerComponent, MessageContainerComponent],
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss',

})
export class ThreadComponent{
  threadService = inject(ThreadsService)
  firebaseInitService = inject(FirebaseInitService)
  messageService = inject(MessageService)

  @Input() message: Message = new Message();
  @Input() channel: Channel = new Channel();


  constructor() {

  }

  


}
