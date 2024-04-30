import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Message } from '../../models/message.class';
import { ThreadsService } from '../../../services/threads.service';



@Component({
  selector: 'app-message-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-container.component.html',
  styleUrl: './message-container.component.scss',
})
export class MessageContainerComponent {
  threadService = inject(ThreadsService)
  @Input() message: Message = new Message();


  constructor() {}

  toggleThreads() {
    this.threadService.isShowingSig.set(true)
  }

}
