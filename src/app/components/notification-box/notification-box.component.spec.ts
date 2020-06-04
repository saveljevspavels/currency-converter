import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBoxComponent } from './notification-box.component';
import { NotificationComponent } from '../notification/notification.component';

describe('NotificationBoxComponent', () => {
  let component: NotificationBoxComponent;
  let fixture: ComponentFixture<NotificationBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationBoxComponent, NotificationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders error with correct class', () => {
    component.messages = {
      errors: ['Error message'],
    };
    fixture.detectChanges();
    const message = fixture.debugElement.nativeElement.querySelector(
      'app-notification'
    );
    expect(message.textContent).toContain('Error message');
    expect(message.querySelector('.notification')).toHaveClass(
      'notification--danger'
    );
  });
});
