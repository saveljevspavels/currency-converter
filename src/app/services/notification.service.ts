import { NavigationStart, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        NotificationService.clearNotifications();
      });
  }

  public static messages = {
    errors: [],
  };

  static addError(message: string) {
    NotificationService.addMessage(message, 'errors');
  }

  private static addMessage(message: string, category: string) {
    if (this.messages[category].indexOf(message) === -1) {
      this.messages[category] = [...this.messages[category], message];
    }
  }

  static removeMessage(index: number, category: string) {
    if (this.messages[category][index]) {
      this.messages[category].splice(index, 1);
    }
  }

  static clearNotifications() {
    this.messages.errors = [];
  }
}
