import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sendemail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sendemail.component.html',
  styleUrl: './sendemail.component.scss'
})
export class SendemailComponent {
  test!:string;
}
