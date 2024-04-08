import { Component} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserprofileComponent } from '../userprofile/userprofile.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-general-view',
  standalone: true,
  imports: [CommonModule, FormsModule, UserprofileComponent],
  templateUrl: './general-view.component.html',
  styleUrl: './general-view.component.scss'
})
export class GeneralViewComponent {

  constructor(private userService: UserService, private router: Router){
    this.unsubscribe = this.userService.user$.subscribe(user => this.activeUser = user)
  }

  showMenu: boolean = false
  showUserProfile: boolean = false
  activeUser!: User;
  search!: string;
  private unsubscribe!: Subscription

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe()
  }

  openMenu() {
    this.showMenu = true
  }

  openProfile() {
    this.showUserProfile = true
  }

  logOut() {
    this.router.navigate(['/'])
  }

  closeMenu() {
    
    this.showMenu = false
    this.showUserProfile = false

  }
}
