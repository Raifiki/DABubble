import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
checkboxChecked = false


  constructor(private router: Router, private route: ActivatedRoute) {
  }


  goBack() {
    this.router.navigate(['..'] ,{relativeTo: this.route})
  }

  onSubmit(form: NgForm){

  }

  checkboxChange() {
   this.checkboxChecked = !this.checkboxChecked

  }


}
