import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateExampleComponent } from './rate-example.component';
import { AccountingService } from '../../../../services/accounting.service';

describe('RateExampleComponent', () => {
  let component: RateExampleComponent;
  let fixture: ComponentFixture<RateExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RateExampleComponent],
      providers: [
        {
          provide: AccountingService,
          useValue: {
            convertCurrency: (amount, rate) => 2,
            convertCurrencyReverse: (amount, rate) => 0.5,
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateExampleComponent);
    component = fixture.componentInstance;
    component.baseCurrency = 'USD';
    component.convertRate = { name: 'EUR', value: 2 };
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct data', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p:nth-child(1)').textContent).toContain(
      '2EUR'
    );
    expect(compiled.querySelector('p:nth-child(2)').textContent).toContain(
      '0.5USD'
    );
  });
});
