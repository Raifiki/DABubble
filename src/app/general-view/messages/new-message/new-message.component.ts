import { Component, inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.scss',
})
export class NewMessageComponent {
  messageService = inject(MessageService);

  content = '';
  userIds = [];
  creatorId = '';
  files = [''];

  async createNewDirectMessage() {
    await this.messageService.createNewDirectMessage(
      this.userIds,
      this.content,
      this.creatorId,
      this.files
    );
  }
}
