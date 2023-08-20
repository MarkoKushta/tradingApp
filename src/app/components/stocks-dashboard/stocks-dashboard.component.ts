import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StockServicesService } from 'src/app/services/stock-services/stock-services.service';


@Component({
  selector: 'app-stocks-dashboard',
  templateUrl: './stocks-dashboard.component.html',
  styleUrls: ['./stocks-dashboard.component.scss']
})
export class StocksDashboardComponent implements OnInit {

  stocks: string[] = [
    "AAPL",
    "GOOGL",
    "MSFT",
    "AMZN",
    "FB",
    "TSLA",
    "NVDA",
    "JPM",
    "JNJ",
    "V",
    "UNH",
    "PG",
    "HD",
    "MA",
    "DIS",
    "BAC",
    "VZ",
    "XOM",
    "KO",
    "CMCSA",
    "PFE",
    "CSCO",
    "MRK",
    "BA",
    "WMT",
    "INTC",
    "CVX",
    "MCD",
    "IBM",
    "NKE",
    "AXP",
    "GS",
    "CAT",
    "MMM",
    "GE",
    "UTX",
    "HON",
    "DD",
    "TRV",
    "RTX",
    "LLY",
    "WBA",
    "DOW",
    "EMR",
    "DELL",
    "HPQ",
    "ORCL",
    "TXN",
    "QCOM",
    "ADBE"
  ];

  constructor(
    private stockService: StockServicesService,
    private router: Router
  ) {}

  ngOnInit() {}

  navigateToStocks(symbol: string) {
    this.router.navigate(['/stocks', symbol]);
  }

}

