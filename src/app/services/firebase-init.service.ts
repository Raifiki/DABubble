import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../../environment/environment';

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
    const firebaseConfig = environment.firebase;

    
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