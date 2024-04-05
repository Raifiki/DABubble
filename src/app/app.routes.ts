import { Routes } from '@angular/router';

// import components
import { AuthenticationComponent } from './authentication/authentication.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ChooseavatarComponent } from './chooseavatar/chooseavatar.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SendemailComponent } from './sendemail/sendemail.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

export const routes: Routes = [
 { path: '', component: AuthenticationComponent },
 { path: 'imprint', component: ImprintComponent },
 { path: 'privacy', component: PrivacyPolicyComponent },
 { path: 'chooseAvatar', component: ChooseavatarComponent }, // nur temprär, diskussion in Team wie wir das ganze einbinden
 { path: 'signin', component: SigninComponent },
 { path: 'sendemail', component: SendemailComponent }, // nur temprär, diskussion in Team wie wir das ganze einbinden
 { path: 'resetPW', component: ResetpasswordComponent }, // nur temprär, diskussion in Team wie wir das ganze einbinden
 { path: 'userProfile', component: UserprofileComponent }, // nur temprär, diskussion in Team wie wir das ganze einbinden
 

];
