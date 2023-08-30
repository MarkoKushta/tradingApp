import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StocksTable } from 'src/app/models/StocksTable.model';
import { StockServicesService } from 'src/app/services/stock-services/stock-services.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit {
  closingPrice!: any[];
  symbol: any;
  intervalId: any;
  Quantity: any;
  showForm = false;
  userId = localStorage.getItem('userId');
  stocksObj!: StocksTable;
  marketStatus!: string;
  stockId: any;
  Balance: any;
  isKycCompleted: any;

  ngOnInit() {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.getStocks();
    this.getBalance();
    this.isKycCompleted = localStorage.getItem('isKycCompleted');
    this.intervalId = setInterval(() => {
      this.getStocks();
    //  this.updateMarketStatus();
    }, 5 * 60 * 1000);

    this.stocksObj = new StocksTable('', this.userId, 0, 0, '');
   // this.updateMarketStatus();
  }

  constructor(
    private stockService: StockServicesService,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router : Router
  ) {}

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  getStocks() {
    this.stockService.searchStocks(this.symbol).subscribe((res) => {
      this.closingPrice = res;
      console.log(res);
    });
  }

  get latestPrice(): number {
    return this.closingPrice[0];
  }

  buyStock() {
    // Check if the market is closed
    if (this.marketStatus === 'Closed') {
      // Market is closed, do not allow buying
      alert('The market is currently closed. You cannot buy stocks at this time.');
      return;
    }

    // Market is open, proceed with buying
    this.stocksObj.StockName = this.symbol;
    this.stocksObj.UserId = this.userId;
    this.stocksObj.buyingPrice = this.closingPrice[0];
    this.stocksObj.Quantity = this.Quantity;
    this.stocksObj.DateBought = new Date().toISOString();

    this.stockService
      .buyStock(this.symbol, this.userId, this.stocksObj, this.Quantity)
      .subscribe((response) => {
        console.log(response);
      });

    this.getBalance();
    this.router.navigate(['/stocks-dashboard']);
  }
/*
  sellStock() {
    this.stockService
      .buyStock(this.symbol, this.userId, this.Quantity, this.stockId)
      .subscribe((response) => {
        console.log(response);
      });
  }
*/
  /*

  updateMarketStatus() {
    const currentTime = new Date();
    const currentHour = currentTime.getUTCHours();
    const currentMinute = currentTime.getUTCMinutes();

    // Market is open from 9:30 AM to 4:00 PM (UTC-4)
    if (
      (currentHour === 13 && currentMinute >= 30) ||
      (currentHour > 13 && currentHour < 20) ||
      (currentHour === 20 && currentMinute === 0)
    ) {
      // Market is open
      this.marketStatus = 'Open';
    } else {
      // Market is closed
      this.marketStatus = 'Closed';
    }
  }
*/

getBalance() {
  console.log(this.userId);
  this.stockService.getBalanceByUser(this.userId).subscribe(
    (balance) => {
      // Round down balance to nearest integer
      this.Balance = Math.floor(balance);
      console.log(this.Balance);
      return this.Balance;
    },
    (error) => {
      // Handle error
      console.error(error);
    }
  );
}

  navigateToPortfolio() {
    this.router.navigate(['/portfolio']);
  }

  navigateToDashboard() {
    this.router.navigate(['/stocks-dashboard']);
  }

  navigateToOptions() {
    this.router.navigate(['/options']);
  }

  navigateToKyc() {
    this.router.navigate(['/kyc']);
  }

}
