import { CommonModule } from '@angular/common';
import { Component, inject, Output, EventEmitter, OnInit } from '@angular/core';
import { MembersListComponent } from '../overlay/members-list/members-list.component';

//services
import { MessageService } from '../../services/message.service'
import { OverlaycontrolService } from '../../services/overlaycontrol.service';
import { StorageService } from '../../services/storage.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-left-side',
  standalone: true,
  imports: [CommonModule, MembersListComponent],
  templateUrl: './left-side.component.html',
  styleUrl: './left-side.component.scss'
})
export class LeftSideComponent implements OnInit{
  userData?: any[];

  @Output() buttonClick = new EventEmitter<void>();
  overlayCtrlService = inject(OverlaycontrolService);
  messageService = inject(MessageService);
  storageService = inject(StorageService);

  constructor(){
    this.messageService.getDirectMessagesList();
    
    }

  ngOnInit(): void {
    this.getDataFromLocalStorage('user')
    console.log("signed user Data: ", this.userData);

  }
  openNewMessageComponent(){
    this.buttonClick.emit();
  }

  getDataFromLocalStorage(key: string): void{
    this.userData = this.storageService.getData(key);
  }





}
