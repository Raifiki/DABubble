import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { OverlayemailsendComponent } from './overlayemailsend/overlayemailsend.component';

@Component({
  selector: 'app-sendemail',
  standalone: true,
  imports: [FormsModule,
  OverlayemailsendComponent],
  templateUrl: './sendemail.component.html',
  styleUrl: './sendemail.component.scss'
})
export class SendemailComponent {
  eMail!:string;
  test!:string;
  @Output() isShowen = new EventEmitter()
  toggleOverlay:boolean = true;

  onSubmit(form:NgForm){
    if(form.valid){
      this.toggleOverlay = !this.toggleOverlay;
      form.reset();
    }
    this.isShowen.emit(true)
  }

  
  goBack() {
    this.isShowen.emit(false)
   }

}
