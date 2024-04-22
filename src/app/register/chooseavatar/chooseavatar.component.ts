import { Component, EventEmitter, Output, inject } from '@angular/core';

// import costumer components
import { OverlayaccountcreatedComponent } from './overlayaccountcreated/overlayaccountcreated.component';
import { UserService } from '../../services/user.service';

// import classes
import { User } from '../../shared/models/user.class';

// import services
import { StorageService } from '../../services/storage.service';

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
  @Output() isShowen = new EventEmitter();

  storageService = inject(StorageService);

  customImage: File | undefined;
  customImgPath: string | undefined;

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
   this.subscription = this.userService.user$.subscribe(userData => {
      this.user = userData;
    });
    this.userService.user$.next(this.user);
    console.log(this.user);
    
  }

  changeAvatarImg(imgPath:string){
    this.user.imgPath = imgPath;
    this.userService.user$.next(this.user);
  }

  async createAccount(){
    if(this.user.password){
      await this.userService.createAcc(this.user.email, this.user.password);
      this.toggleOverlay = !this.toggleOverlay;
      this.uploadUserImage(this.userService.user$.value.id);
      this.deleteUserData();
      this.goBack();
    };
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

  onFileSelected(event: Event){
    const fileList: FileList | null = (event.target as HTMLInputElement).files;
    if (fileList && fileList[0].type.includes('image') ) {
      this.customImage = fileList[0];
      this.customImgPath = URL.createObjectURL(this.customImage);
      this.changeAvatarImg('customProfileIMG');
    }
  }

  uploadUserImage(userID:string){
    if (this.customImage) this.storageService.uploadProfileIMG(userID,this.customImage);
  }

  clearCustomImg(){
    this.customImage = undefined;
    this.customImgPath = undefined;
  }

}
