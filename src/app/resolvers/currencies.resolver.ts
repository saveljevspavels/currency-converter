import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CurrencyService } from '../services/currency.service';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesResolver implements Resolve<any> {
  constructor(private currencyService: CurrencyService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.currencyService.getCurrencies();
  }
}
