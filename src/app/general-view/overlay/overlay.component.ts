import { Component, inject, input, output } from '@angular/core';

// import customer components
import { DropdownusermenuComponent } from './dropdownusermenu/dropdownusermenu.component';
import { RegistereduserprofileComponent } from './registereduserprofile/registereduserprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { CreatechannelComponent } from './createchannel/createchannel.component';
import { EditchannelComponent } from './editchannel/editchannel.component';

// import services
import { OverlaycontrolService } from '../../services/overlaycontrol.service';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [
    CreatechannelComponent,
    EditprofileComponent,
    RegistereduserprofileComponent,
    DropdownusermenuComponent,
    UserprofileComponent,
    EditchannelComponent],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss'
})
export class OverlayComponent {

  overlayCtrlService = inject(OverlaycontrolService);

  stopHideOvly(event: Event){
    event.stopPropagation();
  }

}
