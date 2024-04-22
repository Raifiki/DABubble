import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseInitService } from './firebase-init.service';
import { doc, collection, onSnapshot, setDoc } from 'firebase/firestore';
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
  private userIsLoggedIn: boolean = false;
  googleProvider = new GoogleAuthProvider();

  constructor(
    private firebaseInitService: FirebaseInitService,
    private router: Router
  ) {
    this.getUsersList();
  }

  public isLoggedIn(): boolean {
    return this.userIsLoggedIn;
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
        });
        this.activeUser$.next(user);
        await this.saveUser(user);
        this.saveUserToLocalStorage(user);
        this.router.navigate(['/generalView']);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('code' + errorCode + 'message' + errorMessage);
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
      this.saveUser(this.user$.value);
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
      this.userIsLoggedIn = true;
      await this.loadUser(userCredential.user.uid);
      setTimeout(() => {
        this.router.navigate(['/generalView']);
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
    await this.loadUser('lT5yqLbBxXb2Jj0wgEy5FRGbBKA3');
    this.userIsLoggedIn = true;
    setTimeout(() => {
      this.router.navigate(['/generalView']);
    }, 1000);
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
        let id = element.id;
        let data = element.data();
        let user = new User({ id, data });
        this.usersList.push(user);
      });
      console.log(this.usersList);
    });
  }

  ngOnDestroy(): void {
    this.unsubUserList.unsubscribe();
    this.unsubUser.unsubscribe();
  }

  async loadUser(userID: string) {
    let userRef = this.getUserRef(userID);
    this.unsubUser = onSnapshot(userRef, (data) => {
      const userData = data.data();
      const user = new User(userData);
      this.activeUser$.next(user);
      this.saveUserToLocalStorage(user);
    });
  }

  async saveUser(user: User) {
    let docId = user.id;
    let newUser = user.toJSON();
    await setDoc(
      doc(this.firebaseInitService.getDatabase(), 'users', docId),
      newUser
    );
    this.activeUser$.next(user);
  }

  saveUserToLocalStorage(user: User) {
    let newUser = new User(user);
    newUser.password = '';
    localStorage.setItem('user', JSON.stringify(newUser));
  }

  getUserImgPath(user: User) {
    // Pfad des User img setzten wenn ein custom IMG verwendet wird. Sonst keine Änderung nötig. Erkennung durch 'assets' im Pfad. custom img pfad beinhalet nur den IMG-Namen
  }

  loadingUserFromStorage() {
    let currentUser = localStorage.getItem('user');
    if (currentUser) {
      return JSON.parse(currentUser);
    } else {
      return null;
    }
  }

  userLogOut() {
    localStorage.setItem('user', '');
    this.userIsLoggedIn = false;
  }
}
