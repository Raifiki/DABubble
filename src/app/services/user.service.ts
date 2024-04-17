import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/interfaces/interfaces';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseInitService } from './firebase-init.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: BehaviorSubject<User> = new BehaviorSubject<User>({
    id:'',
    name: '',
    avatarImgPath: '',
    email: '',
    password: '',
    status: 'Aktiv'
  });
   
 
  constructor(private firebaseInitService: FirebaseInitService ) {
  }

  async createAcc(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.firebaseInitService.getAuth(), email, password);
      console.log(userCredential.user);
    } catch (error: any) {
      alert('Es ist bei der Erstellung des Kontos etwas schief gelaufen. Folgender Fehler trat auf: ' + error)
      console.log(error)
    }
  }




}
