import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  amountPlayed = signal(0)

  constructor() { }
}
