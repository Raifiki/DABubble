import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AnimationService } from '../../services/animation.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  animationService = inject(AnimationService)
  lgnDisabled: boolean = true;
  animationPlayed =  this.animationService.amountPlayed()


ngOnInit(): void {
  if (this.animationPlayed === 0) {
    setTimeout(() => {
      this.animationService.amountPlayed.set(1)
      console.log(this.animationPlayed)
    }, 2000);
  }
}


  onSubmit(f: NgForm) {}



  }
