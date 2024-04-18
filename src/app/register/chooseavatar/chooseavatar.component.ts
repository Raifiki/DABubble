import { Component, EventEmitter, Output } from '@angular/core';

// import costumer components
import { OverlayaccountcreatedComponent } from './overlayaccountcreated/overlayaccountcreated.component';
import { User } from '../../shared/interfaces/interfaces';
import { UserService } from '../../services/user.service';


// import interfaces


@Component({
  selector: 'app-chooseavatar',
  standalone: true,
  imports: [OverlayaccountcreatedComponent],
  templateUrl: './chooseavatar.component.html',
  styleUrl: './chooseavatar.component.scss'
})
export class ChooseavatarComponent {
  user!:User;
  toggleOverlay:boolean = false;
  @Output() isShowen = new EventEmitter()

  avatarImgPathList: string[] = [
    'assets/img/avatar/avatar0.svg',
    'assets/img/avatar/avatar1.svg',
    'assets/img/avatar/avatar2.svg',
    'assets/img/avatar/avatar3.svg',
    'assets/img/avatar/avatar4.svg',
    'assets/img/avatar/avatar5.svg',
  ];

  subscription;

  constructor(private userService: UserService){
   this.subscription = this.userService.user.subscribe(userData => {
      this.user = {
        id: userData.id,
        name: userData.name,
        avatarImgPath: this.avatarImgPathList[0],
        email: userData.email,
        password: userData.password
      };
    });
    this.userService.user.next(this.user)
  }

  changeAvatarImg(imgPath:string){
    this.user.avatarImgPath = imgPath;
    this.userService.user.next(this.user)
  }

  createAccount(){
    this.userService.createAcc(this.user.email, this.user.password)
    this.toggleOverlay = !this.toggleOverlay;
    this.deleteUserData()
    this.goBack()
  }

  goBack() {
    this.isShowen.emit(false)
  }

  deleteUserData() {
    this.user = {
       id: '',
       name: '',
       avatarImgPath: '',
       email: '',
       password: ''
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe()
  }
  unsubscribe() {
    this.subscription.unsubscribe()
  }
}
