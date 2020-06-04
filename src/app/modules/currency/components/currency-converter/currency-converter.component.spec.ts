import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConverterComponent } from './currency-converter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyInputComponent } from '../currency-input/currency-input.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { RateExampleComponent } from '../rate-example/rate-example.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { AccountingService } from '../../../../services/accounting.service';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CurrencyConverterComponent,
        CurrencyInputComponent,
        DropdownComponent,
        RateExampleComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                rates: [
                  {
                    name: 'USD',
                    value: 1,
                  },
                  {
                    name: 'EUR',
                    value: 2,
                  },
                ],
              },
            },
          },
        },
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
    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
    component.currencies = ['USD', 'EUR'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct data', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector(
        '.currency-converter__input-group:nth-child(1) input'
      ).value
    ).toContain(1);
    expect(
      compiled.querySelector(
        '.currency-converter__input-group:nth-child(2) input'
      ).value
    ).toContain(2);
  });
});
