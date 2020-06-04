import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-converter-page',
  templateUrl: './converter.page.html',
  styleUrls: ['./converter.page.scss'],
})
export class ConverterPageComponent implements OnInit {
  public currencies: string[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.currencies = this.route.snapshot.data.currencies;
  }
}
