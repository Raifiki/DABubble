import { Routes } from '@angular/router';

// import components
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ChooseavatarComponent } from './chooseavatar/chooseavatar.component';
import { SendemailComponent } from './sendemail/sendemail.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { CreatechannelComponent } from './createchannel/createchannel.component';
import { GeneralViewComponent } from './general-view/general-view.component';
import { SigninComponent } from './register/signin/signin.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'chooseAvatar', component: ChooseavatarComponent }, // nur temprär, diskussion in Team wie wir das ganze einbinden
  { path: 'signin', component: SigninComponent },
  { path: 'sendemail', component: SendemailComponent }, // nur temprär, diskussion in Team wie wir das ganze einbinden
  { path: 'resetPW', component: ResetpasswordComponent }, // nur temprär, diskussion in Team wie wir das ganze einbinden
  { path: 'userProfile', component: EditprofileComponent }, // nur temprär, diskussion in Team wie wir das ganze einbinden
  { path: 'createChannel', component: CreatechannelComponent }, // nur temprär, diskussion in Team wie wir das ganze einbinden
  { path: 'generalView', component: GeneralViewComponent },
];
