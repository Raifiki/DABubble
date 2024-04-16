import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/interfaces/interfaces';


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
  


  constructor() {

  }




}
