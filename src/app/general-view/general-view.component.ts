import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

// import services
import { UserService } from '../services/user.service';
import { OverlaycontrolService } from '../services/overlaycontrol.service';

// import customer components
import { OverlayComponent } from './overlay/overlay.component';

// import interfaces
import { User } from '../shared/interfaces/interfaces';
import { LeftSideComponent } from './overlay/left-side/left-side.component';
import { NewMessageComponent } from './overlay/new-message/new-message.component';

@Component({
  selector: 'app-general-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OverlayComponent,
    LeftSideComponent,
    NewMessageComponent,
  ],
  templateUrl: './general-view.component.html',
  styleUrl: './general-view.component.scss',
})
export class GeneralViewComponent {
  constructor(private userService: UserService) {
    this.unsubscribe = this.userService.user$.subscribe(
      (user) => (this.activeUser = user)
    );
  }

  activeUser!: User;
  search!: string;
  private unsubscribe!: Subscription;

  overlayCtrlService = inject(OverlaycontrolService);

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
