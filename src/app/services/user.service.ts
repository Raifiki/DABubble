import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseInitService } from './firebase-init.service';
import { doc, collection,  onSnapshot, addDoc, setDoc } from "firebase/firestore";
import { User } from '../shared/models/user.class';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  enteredPassword!: string;
  usersList: any[] = [];
  unsubUserList: any;
  unsubUser: any;
  activeUser!: User;

  constructor(private firebaseInitService: FirebaseInitService, private router: Router) {
    this.getUserListRef()
    this.getUsersList()
    }

  async createAcc(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.firebaseInitService.getAuth(),
        email,
        password
      );
      console.log(userCredential.user);
      this.user.value.id = userCredential.user.uid
      this.saveUser()

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
      await this.loadUser(userCredential.user.uid)
      setTimeout(() => {
        this.router.navigate(['/generalView'])
      }, 1000);
    } catch (error: any) {
      alert(
        'Es ist bei der Anmeldung etwas schief gelaufen. Folgender Fehler trat auf: ' +
          error
      );
      console.log(error);
    }
  }

  private getUserListRef() {
    return collection(this.firebaseInitService.getDatabase(), 'users')
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
        console.log(this.usersList)
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
        const user = new User(userData)
        this.saveUserToLocalStorage(user)
        console.log(user)
      })
    } 
   
  async saveUser() {
    let user = this.user.value
    let docId = user.id
    let newUser = user.toJSON()
    console.log(user)
    await setDoc(doc(this.firebaseInitService.getDatabase(), 'users', docId), newUser)
    }

    saveUserToLocalStorage(user:any) {
    localStorage.setItem('user',(JSON.stringify(user)))
    }

  getUserImgPath(user: User){
    // Pfad des User img setzten wenn ein custom IMG verwendet wird. Sonst keine Änderung nötig. Erkennung durch 'assets' im Pfad. custom img pfad beinhalet nur den IMG-Namen
  }

  loadingUserFromStorage() {
    let currentUser = localStorage.getItem('user')
    if (currentUser) {
      return (JSON.parse(currentUser))
    } else {
      return null
    }
  }

}


