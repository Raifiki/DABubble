import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserlistitemComponent } from '../../../shared/components/userlistitem/userlistitem.component';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [CommonModule, UserlistitemComponent],
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.scss',
})
export class MembersListComponent {
  @Output() openNewMessageComponent = new EventEmitter<void>();
  @Input() users: any[] = []; // Annahme: Array von Benutzern
  @Input() signedInUser: any; // Annahme: angemeldeter Benutzer

  onItemClick() {
    this.openNewMessageComponent.emit();
  }
}
