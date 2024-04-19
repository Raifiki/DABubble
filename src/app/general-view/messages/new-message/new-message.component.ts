import { Component, inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.scss'
})
export class NewMessageComponent {
  messageService = inject(MessageService)


  async createNewDirectMessage() {
    const userIds = ['HRfRvEYEIbTEDh7N0Pgu6KzEeP13', 'Icv6CcMnu6PVBq6f2X5TE7ssF4G2'];
    const content = 'Das sollte eine neue Direktnachricht werden';
    const creatorId = 'HRfRvEYEIbTEDh7N0Pgu6KzEeP13';
    const date = new Date().getTime();
    const files = [''];
    const reactions = [''];
    await this.messageService.createDirectMessage(userIds, content, creatorId, date, files, reactions);
  }

}
