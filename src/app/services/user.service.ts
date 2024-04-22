import { Injectable, inject } from '@angular/core';
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
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  enteredPassword!: string;
  usersList: User[] = [];
  unsubUserList: any;
  unsubUser: any;
  activeUser$: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  private userIsLoggedIn: boolean = false

  
  constructor(private firebaseInitService: FirebaseInitService, private router: Router) {
    this.getUsersList()
  }

  public isLoggedIn(): boolean {
    return this.userIsLoggedIn
  }


  async createAcc(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.firebaseInitService.getAuth(),
        email,
        password
      );
      this.user$.value.id = userCredential.user.uid
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
      this.userIsLoggedIn = true
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


  async logInTestUser() {
      await this.loadUser('lT5yqLbBxXb2Jj0wgEy5FRGbBKA3')
      this.userIsLoggedIn = true
      setTimeout(() => {
        this.router.navigate(['/generalView'])
      }, 1000);
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
        let user = new User({id, data})
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
        const user = new User(userData)
        this.activeUser$.next(user)
        this.saveUserToLocalStorage(user)
      })
    } 
   
  async saveUser() {
    let user;
    console.log('active: ',this.activeUser$.value,'; user: ',this.user$.value);
    if (this.activeUser$.value.email != '') {
       user = this.activeUser$.value
    } else {
      user = this.user$.value
    }
    let docId = user.id
    let newUser = user.toJSON()
    console.log(user);
    
    await setDoc(doc(this.firebaseInitService.getDatabase(), 'users', docId), newUser)    
    this.activeUser$.next(user)
    }

    saveUserToLocalStorage(user:User) {
      let newUser = new User(user)
      newUser.password = ''
      localStorage.setItem('user',(JSON.stringify(newUser)))
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

  userLogOut() {
    localStorage.setItem('user', '')
    this.userIsLoggedIn = false
  }


}


