import { Component} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-general-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './general-view.component.html',
  styleUrl: './general-view.component.scss'
})
export class GeneralViewComponent {

  constructor(private userService: UserService){
    this.unsubscribe = this.userService.user$.subscribe(user => this.activeUser = user)
  }

  activeUser!: User;
  search!: string;
  private unsubscribe!: Subscription

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe()
  }


}
