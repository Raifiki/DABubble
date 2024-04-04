import { Routes } from '@angular/router';

// import components
import { AuthenticationComponent } from './authentication/authentication.component';
import { ChooseavatarComponent } from './chooseavatar/chooseavatar.component';

export const routes: Routes = [
 {path: '', component: AuthenticationComponent},
 {path: 'chooseAvatar', component: ChooseavatarComponent} // nur temprär, diskussion in Team wie wir das ganze einbinden

];
