import { CommonModule } from '@angular/common';
import { Component, inject, Output, EventEmitter, OnInit } from '@angular/core';
import { MembersListComponent } from '../overlay/members-list/members-list.component';

//services
import { MessageService } from '../../services/message.service'
import { OverlaycontrolService } from '../../services/overlaycontrol.service';

@Component({
  selector: 'app-left-side',
  standalone: true,
  imports: [CommonModule, MembersListComponent],
  templateUrl: './left-side.component.html',
  styleUrl: './left-side.component.scss'
})
export class LeftSideComponent{
  @Output() buttonClick = new EventEmitter<void>();
  overlayCtrlService = inject(OverlaycontrolService);


  openNewMessageComponent(){
    this.buttonClick.emit();
  }

}
