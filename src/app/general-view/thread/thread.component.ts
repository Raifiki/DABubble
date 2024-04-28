import { Component, Input } from '@angular/core';
import { Message } from '../../shared/models/message.class';
import { CommonModule } from '@angular/common';
import { Channel } from '../../shared/models/channel.class';
import { MessageContainerComponent } from '../../shared/components/message-container/message-container.component';

@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [CommonModule, MessageContainerComponent],
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss',
})
export class ThreadComponent {
  @Input() message: Message = new Message();
  @Input() channel: Channel = new Channel();
}
