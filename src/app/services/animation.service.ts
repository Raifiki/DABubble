import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  amountPlayed = signal(0)
}
