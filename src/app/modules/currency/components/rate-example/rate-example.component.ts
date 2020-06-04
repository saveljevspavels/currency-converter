import { Component, Input, OnChanges } from '@angular/core';

import { Rate } from '../../../../dto/rate.dto';
import { AccountingService } from '../../../../services/accounting.service';

@Component({
  selector: 'app-rate-example',
  templateUrl: './rate-example.component.html',
  styleUrls: ['./rate-example.component.scss'],
})
export class RateExampleComponent implements OnChanges {
  @Input()
  public baseCurrency: string;

  @Input()
  public convertRate: Rate;

  public reverseRate: number;

  constructor(private accountingService: AccountingService) {}

  ngOnChanges() {
    this.reverseRate = this.accountingService.convertCurrencyReverse(
      1,
      this.convertRate.value
    );
  }
}
