import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input()
  public class: string;

  @Output()
  private close = new EventEmitter();

  closeNotification() {
    this.close.emit();
  }
}
