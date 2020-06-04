import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConverterPageComponent } from './pages/converter/converter.page';
import { CurrencyRoutingModule } from './currency-routing.module';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CurrencyInputComponent } from './components/currency-input/currency-input.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { RateExampleComponent } from './components/rate-example/rate-example.component';

@NgModule({
  declarations: [
    ConverterPageComponent,
    DropdownComponent,
    CurrencyInputComponent,
    CurrencyConverterComponent,
    RateExampleComponent,
  ],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CurrencyModule {}
