import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
} from '@angular/forms';
import { Rate } from '../../../../dto/rate.dto';
import {
  CONVERTER_INIT_VALUE,
  DEFAULT_CURRENCY,
} from '../../../../constants/constants';
import { CurrencyService } from '../../../../services/currency.service';
import { AccountingService } from '../../../../services/accounting.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  @Input()
  public currencies: string[];

  public rates: Rate[];

  public currencyFromSwap = null;

  @ViewChild('formDirective', { static: false })
  public formDirective: NgForm;

  public form: FormGroup = null;
  public valueFrom: AbstractControl;
  public currencyFrom: AbstractControl;
  public valueTo: AbstractControl;
  public currencyTo: AbstractControl;

  constructor(
    private formBuilder: FormBuilder,
    private currencyService: CurrencyService,
    private route: ActivatedRoute,
    private accountingService: AccountingService
  ) {}

  ngOnInit() {
    this.rates = this.route.snapshot.data.rates;
    this.initForm();
  }

  getRates() {
    return this.currencyService
      .getConversionRates(this.currencyFrom.value)
      .subscribe((rates: Rate[]) => {
        this.rates = rates;
        const newCurrencyTo = this.rates.find(
          (rate) => rate.name === this.currencyFromSwap
        );
        this.currencyTo.patchValue(newCurrencyTo || rates[0]);
      });
  }

  initForm() {
    this.form = this.formBuilder.group({
      valueFrom: [CONVERTER_INIT_VALUE],
      currencyFrom: [DEFAULT_CURRENCY],
      valueTo: [
        {
          value: this.accountingService.convertCurrency(
            CONVERTER_INIT_VALUE,
            this.rates[0].value
          ),
          disabled: false,
        },
      ],
      currencyTo: [{ value: this.rates[0], disabled: false }],
    });

    this.valueFrom = this.form.get('valueFrom');
    this.currencyFrom = this.form.get('currencyFrom');
    this.valueTo = this.form.get('valueTo');
    this.currencyTo = this.form.get('currencyTo');

    this.setFormWatchers();
  }

  setFormWatchers() {
    this.valueFrom.valueChanges.subscribe((val) => {
      this.valueTo.patchValue(
        this.accountingService.convertCurrency(
          val || 0,
          this.currencyTo.value.value
        ),
        { emitEvent: false }
      );
    });

    this.valueTo.valueChanges.subscribe((val) => {
      this.valueFrom.patchValue(
        this.accountingService.convertCurrencyReverse(
          val || 0,
          this.currencyTo.value.value
        ),
        { emitEvent: false }
      );
    });

    this.currencyTo.valueChanges.subscribe((val) => {
      if (val) {
        this.valueTo.patchValue(
          this.accountingService.convertCurrency(
            val.value,
            this.valueFrom.value
          ),
          { emitEvent: false }
        );
      }
    });

    this.currencyFrom.valueChanges.subscribe((val) => {
      if (val) {
        this.getRates();
      }
    });
  }

  swapCurrencies() {
    this.currencyFromSwap = this.currencyFrom.value;
    this.currencyFrom.patchValue(this.currencyTo.value.name);
  }
}
