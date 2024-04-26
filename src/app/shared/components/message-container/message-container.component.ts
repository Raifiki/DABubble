import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Message } from '../../models/message.class';

@Component({
  selector: 'app-message-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-container.component.html',
  styleUrl: './message-container.component.scss',
})
export class MessageContainerComponent {
  @Input() message: Message = new Message();

  constructor() {}
}
