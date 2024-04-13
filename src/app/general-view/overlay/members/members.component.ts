import { Component } from '@angular/core';
import { MembersListComponent } from '../members-list/members-list.component';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [MembersListComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {

}
