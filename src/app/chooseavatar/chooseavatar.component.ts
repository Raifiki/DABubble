import { Component } from '@angular/core';

// import interfaces
import { User } from '../shared/interfaces/interfaces';

@Component({
  selector: 'app-chooseavatar',
  standalone: true,
  imports: [],
  templateUrl: './chooseavatar.component.html',
  styleUrl: './chooseavatar.component.scss'
})
export class ChooseavatarComponent {
  user!:User;

  avatarImgPathList: string[] = [
    'assets/img/avatar/avatar0.svg',
    'assets/img/avatar/avatar1.svg',
    'assets/img/avatar/avatar2.svg',
    'assets/img/avatar/avatar3.svg',
    'assets/img/avatar/avatar4.svg',
    'assets/img/avatar/avatar5.svg',
  ];

  constructor(){
    // just for static use
    this.user = {
      name: 'Leo Weiß',
      avatarImgPath: 'assets/img/avatar/profile.svg',
    };
  }

  changeAvatarImg(imgPath:string){
    this.user.avatarImgPath = imgPath;
  }

}
