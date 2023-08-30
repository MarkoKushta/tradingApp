import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { StocksTable } from 'src/app/models/StocksTable.model';
import { StockServicesService } from 'src/app/services/stock-services/stock-services.service';


@Component({
  selector: 'app-stock-sell',
  templateUrl: './stock-sell.component.html',
  styleUrls: ['./stock-sell.component.scss']
})
export class StockSellComponent implements OnInit {

    symbol: any;
    intervalId: any;
    currentQuantity: any;
    showForm = false;
    userId : any;
    stocksObj!: StocksTable;
    marketStatus!: string;
    stockId : any;
    latestPrice : any;
    Quantity: any;
    Balance: any;
    isKycCompleted: any;


    ngOnInit() {
      const stock = JSON.parse(localStorage.getItem('stock') || '{}');
      this.symbol = stock.stockName;
      this.stockId = stock.id;
      this.userId = stock.userId;
      this.currentQuantity = stock.quantity;
      this.getBalance();
      this.Price();
      this.isKycCompleted = localStorage.getItem('isKycCompleted');
      this.stocksObj = new StocksTable('', this.userId, 0, 0, '');
      this.intervalId = setInterval(() => {
        this.Price();
      //  this.updateMarketStatus();
      }, 5 * 60 * 1000);

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

    Price() {
      console.log(this.userId);
      console.log(this.stockId);
      this.stockService.getBuyingPrice(this.userId, this.stockId).subscribe((price) => {
        // Use price
        this.latestPrice = price;
        console.log(this.latestPrice);
        return this.latestPrice;
      },
      (error) => {
        // Handle error
        console.error(error);
      });
    }


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

/*
    get latestPrice(): number {
      return this.closingPrice[0];
    }
*/
    /*
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
    }
*/
    sellMyStock() {
      this.stockService
        .sellStock(this.symbol, this.userId, this.Quantity, this.stockId, this.latestPrice)
        .subscribe((response) => {
          console.log(response);
          this.router.navigate(['/portfolio']);
        });
      this.getBalance();
    }

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



