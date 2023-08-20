import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockServicesService } from 'src/app/services/stock-services/stock-services.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  closingPrice !: any[];
  symbol: any;

  constructor(
    private stockService: StockServicesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.getStocks();
  }

  getStocks() {
    this.stockService.searchStocks(this.symbol).subscribe((res) => {
      this.closingPrice = res;
      console.log(res);
    });
  }

}
