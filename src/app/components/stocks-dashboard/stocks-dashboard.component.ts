import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StockServicesService } from 'src/app/services/stock-services/stock-services.service';

@Component({
  selector: 'app-stocks-dashboard',
  templateUrl: './stocks-dashboard.component.html',
  styleUrls: ['./stocks-dashboard.component.scss']
})
export class StocksDashboardComponent implements OnInit {

  closingPrice !: any[];

  ngOnInit() {
    this.getStocks()
  }

  constructor(private stockService: StockServicesService) {}

  getStocks() {
    this.stockService.searchStocks('TSLA').subscribe((res) => {
      this.closingPrice = res;
      console.log(res);
    });
  }

}

