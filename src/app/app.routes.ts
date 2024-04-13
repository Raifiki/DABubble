import { Routes } from '@angular/router';

// import components
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { GeneralViewComponent } from './general-view/general-view.component';
import { SigninComponent } from './register/signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { combineLatest } from 'rxjs';
import { AddMembersComponent } from './general-view/overlay/add-members/add-members.component';
import { MembersListComponent } from './general-view/overlay/members-list/members-list.component';
import { MembersComponent } from './general-view/overlay/members/members.component';

export const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'resetPW', component: ResetpasswordComponent },
  { path: 'generalView', component: GeneralViewComponent },
  {path: 'testing', component: MembersComponent},
];
