// Inspired by: https://github.com/juliemr/ngconf-2016-zones

import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: `
    <div>Progress: {{progress}}</div>
    <button (click)="go()">Go</button>
    <button (click)="goOutsideAngular()">Go (outside Angular Zone)</button>
    <p>Open console to see progress</p>`
})
export class ProgressBarComponent {
  progress = 0;

  constructor(public ngZone: NgZone) {}

  increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log('progress: ' + this.progress);
    if (this.progress < 100) {
      window.setTimeout(() => this.increaseProgress(doneCallback), 10);
    } else {
      doneCallback();
    }
  }

  go() {
    this.progress = 0;
    this.increaseProgress(() => {});
  }

  goOutsideAngular() {
    this.progress = 0;
    this.ngZone.runOutsideAngular(() => {
      this.increaseProgress(() => {
        this.ngZone.run(() => {
          console.log('Done!');
        });
      });
    });
  }
}
