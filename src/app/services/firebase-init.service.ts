import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseInitService {
  private app: any;
  private auth: any;

  constructor() {
    this.initializeApp();
  }

  private initializeApp() {
    const firebaseConfig = {
      apiKey: "AIzaSyAdtnj-8zQYhytRPXDOpVnKB7Pn2znzIhc",
      authDomain: "dabubble-26c87.firebaseapp.com",
      projectId: "dabubble-26c87",
      storageBucket: "dabubble-26c87.appspot.com",
      messagingSenderId: "464602998455",
      appId: "1:464602998455:web:69e854dd4600f5eb11cf32"
    };
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
  }

  getApp() {
    return this.app;
  }

  getAuth() {
    return this.auth;
  }
}