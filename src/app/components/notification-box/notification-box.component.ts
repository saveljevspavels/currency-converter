import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss'],
})
export class NotificationBoxComponent implements OnInit {
  public messages;
  public removeMessage;

  constructor() {
    this.messages = NotificationService.messages;
    this.removeMessage = NotificationService.removeMessage;
  }

  ngOnInit() {}
}
