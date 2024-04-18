import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/interfaces/interfaces';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseInitService } from './firebase-init.service';
import { doc, collection,  onSnapshot } from "firebase/firestore";
import { docData } from '@angular/fire/firestore';
import { UserClass } from '../shared/models/user.class';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: BehaviorSubject<User> = new BehaviorSubject<User>({
    id: '',
    name: '',
    avatarImgPath: '',
    email: '',
    password: '',
    status: 'Aktiv',
  });

  usersList: any[] = [];
  unsubUserList: any;
  unsubUser: any;

  constructor(private firebaseInitService: FirebaseInitService) {
    this.getUserListRef()
    this.getUsersList()
    this.loadUser('APO3A94aSybOXtERYhx48l4N1B93')
    }

  async createAcc(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.firebaseInitService.getAuth(),
        email,
        password
      );
      console.log(userCredential.user);
    } catch (error: any) {
      alert(
        'Es ist bei der Erstellung des Kontos etwas schief gelaufen. Folgender Fehler trat auf: ' +
          error
      );
      console.log(error);
    }
  }

  async logUserIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.firebaseInitService.getAuth(),
        email,
        password
      );
      console.log(userCredential.user);
    } catch (error: any) {
      alert(
        'Es ist bei der Anmeldung etwas schief gelaufen. Folgender Fehler trat auf: ' +
          error
      );
      console.log(error);
    }
  }

  private getUserListRef() {
    return collection(this.firebaseInitService.getDatabase(), "users")
  }

  private getUserRef(id:string) {
    return doc(this.getUserListRef(), id)
  }

   async getUsersList() {
    this.unsubUserList = await onSnapshot(this.getUserListRef(), (list) => {
      this.usersList = [];
      list.forEach((element) => {
        let id = element.id
        let data = element.data()
        let user = {id, data}
        this.usersList.push(user)
      });
    })
  }

  ngOnDestroy(): void {
    this.unsubUserList.unsubscribe()
    this.unsubUser.unsubscribe()
  }

  async loadUser(userID: string) {
    let userRef = this.getUserRef(userID);
     this.unsubUser = onSnapshot(userRef, (data) => {
        const userData = data.data();
        const user = new UserClass(userData)
        console.log(user)
      })
    } 
   
}



