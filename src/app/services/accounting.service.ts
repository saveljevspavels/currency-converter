import { Injectable } from '@angular/core';
import accounting from 'accounting';

import { CURRENCY_PRECISION } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AccountingService {
  constructor() {}

  convertCurrency(amount: number, rate: number): number {
    return accounting.toFixed(Math.abs(amount) * rate, CURRENCY_PRECISION);
  }

  convertCurrencyReverse(amount: number, rate: number): number {
    return accounting.toFixed(
      Math.abs(amount) * (1 / rate),
      CURRENCY_PRECISION
    );
  }
}
