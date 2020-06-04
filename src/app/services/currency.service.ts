import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from './base.service';
import { ServiceResponse } from '../dto/service-response.dto';
import { Rate } from '../dto/rate.dto';
import { DEFAULT_CURRENCY } from '../constants/constants';
import { AccountingService } from './accounting.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService extends BaseService {
  private _latestRates: ServiceResponse;

  public set latestRates(latestRates: ServiceResponse) {
    this._latestRates = latestRates;
  }

  public get latestRates(): ServiceResponse {
    return this._latestRates;
  }

  constructor(http: HttpClient, private accountingService: AccountingService) {
    super(http);
  }

  static mapRate(name: string, value: number): Rate {
    return {
      name,
      value,
    };
  }

  getConversionRates(currency: string): Observable<Rate[]> {
    return this.getLatestRates().pipe(
      map((res: ServiceResponse) => {
        switch (currency) {
          case DEFAULT_CURRENCY:
            return Object.keys(res.rates).map((rate: string) => {
              if (res.rates.hasOwnProperty(rate)) {
                return CurrencyService.mapRate(rate, res.rates[rate]);
              }
            });
          default:
            // Mock for different currencies
            return [
              CurrencyService.mapRate(
                DEFAULT_CURRENCY,
                this.accountingService.convertCurrencyReverse(
                  1,
                  res.rates[currency]
                )
              ),
            ];
        }
      })
    );
  }

  getCurrencies(): Observable<string[]> {
    return this.getLatestRates().pipe(
      map((res: ServiceResponse) => {
        return Object.keys(res.rates);
      })
    );
  }

  getLatestRates(): Observable<ServiceResponse> {
    if (!this.latestRates) {
      return this.http.get<ServiceResponse>(this.baseUrl('latest.json')).pipe(
        map((res: ServiceResponse) => {
          this.latestRates = res;
          return res;
        })
      );
    } else {
      return of(this.latestRates);
    }
  }
}
