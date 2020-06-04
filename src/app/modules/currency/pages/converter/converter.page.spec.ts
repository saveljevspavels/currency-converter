import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterPageComponent } from './converter.page';
import { CurrencyConverterComponent } from '../../components/currency-converter/currency-converter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyInputComponent } from '../../components/currency-input/currency-input.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { RateExampleComponent } from '../../components/rate-example/rate-example.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AccountingService } from '../../../../services/accounting.service';

describe('ConverterPageComponent', () => {
  let component: ConverterPageComponent;
  let fixture: ComponentFixture<ConverterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConverterPageComponent,
        CurrencyConverterComponent,
        CurrencyInputComponent,
        DropdownComponent,
        RateExampleComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                currencies: ['USD', 'EUR'],
                rates: [
                  {
                    name: 'USD',
                    value: 1,
                  },
                  {
                    name: 'EUR',
                    value: 1.1,
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
    fixture = TestBed.createComponent(ConverterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
