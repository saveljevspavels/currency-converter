import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConverterPageComponent } from './pages/converter/converter.page';
import { CurrenciesResolver } from '../../resolvers/currencies.resolver';
import { RatesResolver } from '../../resolvers/rates.resolver';

const routes: Routes = [
  {
    path: '',
    component: ConverterPageComponent,
    resolve: { currencies: CurrenciesResolver, rates: RatesResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrencyRoutingModule {}
