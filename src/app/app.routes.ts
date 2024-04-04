import { Routes } from '@angular/router';

// import components
import { AuthenticationComponent } from './authentication/authentication.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ChooseavatarComponent } from './chooseavatar/chooseavatar.component';
import { SendemailComponent } from './sendemail/sendemail.component';

export const routes: Routes = [
 { path: '', component: AuthenticationComponent },
 { path: 'imprint', component: ImprintComponent },
 { path: 'privacy', component: PrivacyPolicyComponent },
 { path: 'chooseAvatar', component: ChooseavatarComponent }, // nur temprär, diskussion in Team wie wir das ganze einbinden
 { path: 'sendemail', component: SendemailComponent } // nur temprär, diskussion in Team wie wir das ganze einbinden
 

];
