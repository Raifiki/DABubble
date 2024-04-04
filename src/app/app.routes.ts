import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
 { path: '', component: AuthenticationComponent },
 { path: 'imprint', component: ImprintComponent },
 { path: 'privacy', component: PrivacyPolicyComponent }

];
