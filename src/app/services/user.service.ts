import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseInitService } from './firebase-init.service';
import { doc, collection, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
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
  googleProvider = new GoogleAuthProvider();


  constructor(
    private firebaseInitService: FirebaseInitService,
    private router: Router
  ) {
    this.getUsersList()
    if (!this.activeUser$.value.isAuth) {
      this.loadingUserFromStorage();
    }
  }


  async logInWithGoogle() {
    await signInWithPopup(
      this.firebaseInitService.getAuth(),
      this.googleProvider
    )
      .then(async (result) => {
        let user = new User({
          id: result.user.uid,
          name: result.user.displayName,
          channelIDs: [],
          directMessagesIDs: [],
          email: result.user.email,
          imgPath: result.user.photoURL,
          status: 'Aktiv',
          password: '',
          isAuth: true,
        });
        this.activeUser$.next(user);
        await this.saveUser(user);
        this.router.navigate(['/generalView']);
      })
      .catch((error) => {
        alert(
          'Es ist bei der Anmeldung etwas schief gelaufen. Folgender Fehler trat auf: ' +
            error.message
        );
      });
  }

  async createAcc(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.firebaseInitService.getAuth(),
        email,
        password
      );
      this.user$.value.id = userCredential.user.uid;
      await this.saveUser(this.user$.value);
    } catch (error: any) {
      alert(
        'Es ist bei der Erstellung des Kontos etwas schief gelaufen. Folgender Fehler trat auf: ' +
          error.message
      );
    }
  }

  async logUserIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.firebaseInitService.getAuth(),
        email,
        password
      );
      await this.loadUser(userCredential.user.uid);
      this.saveIdToLocalStorate(userCredential.user.uid);
    } catch (error: any) {
      alert(
        'Es ist bei der Anmeldung etwas schief gelaufen. Folgender Fehler trat auf: ' +
          error.message
      );
    }
  }

  async logInTestUser() {
    await this.logUserIn('TestEmail@test.de', '123456Test!');
  }

  private getUserListRef() {
    return collection(this.firebaseInitService.getDatabase(), 'users');
  }

  private getUserRef(id: string) {
    return doc(this.getUserListRef(), id);
  }

  async getUsersList() {
    this.unsubUserList = await onSnapshot(this.getUserListRef(), (list) => {
      this.usersList = [];
      list.forEach((element) => {
        let userData = {...element.data(),...{id:element.id}};
        let user = new User(userData);
        this.usersList.push(user);
      });
    });
  }

  getUser(userID:string): User | undefined{
    return this.usersList.find( user => user.id == userID)
  }

  getFilterdUserList(userIDs: string[]): User[]{
    let list: User[] = []; 
    userIDs.forEach(userID => {
      let user = this.getUser(userID);
      if(user) list.push(user);
    });
    return list;
  }

  ngOnDestroy(): void {
    this.unsubUserList.unsubscribe();
    this.unsubUser.unsubscribe();
  }

  async loadUser(userID: string) {
    let userRef = this.getUserRef(userID);
     await getDoc(userRef).then((data) => {
      const userData = data.data();
      const user = new User(userData);
      this.activeUser$.next(user);
      this.activeUser$.value.isAuth = true;
      this.activeUser$.value.status = 'Aktiv'
      this.router.navigate(['/generalView']);
      this.saveUser(this.activeUser$.value)
    });  
    this.unsubUser = onSnapshot(userRef, (data:any) => {
      const userData = data.data();
      const user = new User(userData);
      this.activeUser$.next(user);
    })
  }

  async saveUser(user: User) {
    await setDoc(
      doc(this.firebaseInitService.getDatabase(), 'users', user.id),
      user.toJSON()
    );
  }

  saveIdToLocalStorate(userId: string) {
    localStorage.setItem('user', userId);
  }

  getUserImgPath(user: User) {
    // Pfad des User img setzten wenn ein custom IMG verwendet wird. Sonst keine Änderung nötig. Erkennung durch 'assets' im Pfad. custom img pfad beinhalet nur den IMG-Namen
  }

  async loadingUserFromStorage() {
    let currentUserId = localStorage.getItem('user');
    if (currentUserId) {
      await this.loadUser(currentUserId);
    } else {
      return undefined;
    }
  }

 
  async userLogOut() {
    await this.firebaseInitService.getAuth().signOut()
    this.activeUser$.value.isAuth = false
    this.activeUser$.value.status = 'Abwesend'
    await this.saveUser(this.activeUser$.value).then(() => {
      this.router.navigate(['/']);
    });
  }
}
