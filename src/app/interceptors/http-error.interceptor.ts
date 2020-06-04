import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';

import { NotificationService } from '../services/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      map((evt) => evt),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status) {
          switch (err.status) {
            case 500:
            default:
              NotificationService.addError('Service error');
          }
        }
        throw err;
      })
    );
  }
}
