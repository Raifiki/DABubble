import { Component, inject } from '@angular/core';
import { MembersListComponent } from '../members-list/members-list.component';
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [MembersListComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent {
  overlayCtrlService = inject(OverlaycontrolService);
}
