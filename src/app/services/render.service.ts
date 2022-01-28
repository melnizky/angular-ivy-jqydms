import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RenderService {
  private subj = new BehaviorSubject<boolean>(true);
  render$ = this.subj.asObservable();

  private subjEntitlement = new BehaviorSubject<boolean>(true);
  entitle$ = this.subjEntitlement.asObservable();

  reRender(): void {
    window.setTimeout((_) => this.subj.next(false), 50);
    window.setTimeout((_) => this.subj.next(true), 100);
  }

  triggerEntitlement() {
    this.subjEntitlement.next(true);
  }
}
