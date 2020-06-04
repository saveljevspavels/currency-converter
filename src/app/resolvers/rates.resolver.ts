import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CurrencyService } from '../services/currency.service';
import { DEFAULT_CURRENCY } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class RatesResolver implements Resolve<any> {
  constructor(private currencyService: CurrencyService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.currencyService.getConversionRates(DEFAULT_CURRENCY);
  }
}
