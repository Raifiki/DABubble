import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MembersListComponent } from '../overlay/members-list/members-list.component';

@Component({
  selector: 'app-left-side',
  standalone: true,
  imports: [CommonModule, MembersListComponent],
  templateUrl: './left-side.component.html',
  styleUrl: './left-side.component.scss'
})
export class LeftSideComponent {

}
