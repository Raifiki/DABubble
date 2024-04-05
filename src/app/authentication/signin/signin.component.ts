import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
checkboxChecked = false


  constructor(private router: Router, private route: ActivatedRoute, private animationService: AnimationService) {
  }


  goBack() {
    this.router.navigate(['..'] ,{relativeTo: this.route})
    this.animationService.amountPlayed.set(1)
  }

  onSubmit(form: NgForm){

  }

  checkboxChange() {
   this.checkboxChecked = !this.checkboxChecked

  }


}
