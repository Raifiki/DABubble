import { Injectable } from '@angular/core';

// import interfaces
import { OverlayType } from '../shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OverlaycontrolService {
  overlayType: OverlayType = 'hide';

  constructor() { }

  hideOverlay(){
    this.overlayType = 'hide';
  }

  showOverlay(ovlyName: OverlayType, event?: Event){
    if (event) event.stopPropagation();
    this.overlayType = ovlyName;
    console.log(this.overlayType);
  }
}
