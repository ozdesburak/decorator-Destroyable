import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <div>
    <button (click)="showComponent = true">Create</button>
    &nbsp;
    <button (click)="showComponent = false">Destroy</button>

    <p>
    Check the console while creating and destroying the component. Notice that after the component destruction the subscription is closed hence no further logs are seen.
    </p>
    
    <using-destroyable-decorator *ngIf="showComponent"></using-destroyable-decorator>
  </div>
  `
})
export class AppComponent {
  showComponent: boolean;
}
