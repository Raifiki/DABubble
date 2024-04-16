import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"dabubble-26c87","appId":"1:464602998455:web:69e854dd4600f5eb11cf32","storageBucket":"dabubble-26c87.appspot.com","apiKey":"AIzaSyAdtnj-8zQYhytRPXDOpVnKB7Pn2znzIhc","authDomain":"dabubble-26c87.firebaseapp.com","messagingSenderId":"464602998455"}))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage()))
  ]
};
