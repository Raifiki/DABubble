import { Component, inject } from '@angular/core';
import { OverlaycontrolService } from '../../../services/overlaycontrol.service';

@Component({
  selector: 'app-add-members',
  standalone: true,
  imports: [],
  templateUrl: './add-members.component.html',
  styleUrl: './add-members.component.scss',
})
export class AddMembersComponent {
  overlayCtrlService = inject(OverlaycontrolService);
}
