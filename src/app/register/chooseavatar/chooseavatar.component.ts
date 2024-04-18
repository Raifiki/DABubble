import { Component, EventEmitter, Output } from '@angular/core';

// import costumer components
import { OverlayaccountcreatedComponent } from './overlayaccountcreated/overlayaccountcreated.component';
import { UserService } from '../../services/user.service';

// import classes
import { User } from '../../shared/models/user.class';

@Component({
  selector: 'app-chooseavatar',
  standalone: true,
  imports: [OverlayaccountcreatedComponent],
  templateUrl: './chooseavatar.component.html',
  styleUrl: './chooseavatar.component.scss'
})
export class ChooseavatarComponent {
  user:User = new User();
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
      this.user = userData;
    });
    this.userService.user.next(this.user);
    console.log(this.user);
    
  }

  changeAvatarImg(imgPath:string){
    this.user.imgPath = imgPath;
    this.userService.user.next(this.user)
  }

  createAccount(){
    if(this.user.password)this.userService.createAcc(this.user.email, this.user.password)
    this.toggleOverlay = !this.toggleOverlay;
    this.deleteUserData()
    this.goBack()
  }

  goBack() {
    this.isShowen.emit(false)
  }

  deleteUserData() {
    this.user = new User();
  }

  ngOnDestroy(): void {
    this.unsubscribe()
  }
  unsubscribe() {
    this.subscription.unsubscribe()
  }
}
