import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockServicesService } from 'src/app/services/stock-services/stock-services.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  boughtStocksList!: any[];
  userId = localStorage.getItem('userId');
  marketStatus!: string;
  intervalId: any;
  Balance: any;
  isKycCompleted: any;

  constructor( private router : Router, private stockService: StockServicesService, private route: ActivatedRoute, ) { }


  ngOnInit(): void {
    this.getBalance();
    this.getBoughtStocks();
    //this.updateMarketStatus();
    this.intervalId = setInterval(() => {
     // this.updateMarketStatus();
    }, 5 * 60 * 1000);
  }



  getBoughtStocks() {
    if (this.userId !== null) {
      this.stockService.getStocksByUser(this.userId).subscribe(res => {
        this.boughtStocksList = res.response;
        console.log(res);

      });
    }
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

  navigateToPortfolio() {
    this.router.navigate(['/portfolio']);
  }

  onStockClick(stock: any) {
    localStorage.setItem('stock', JSON.stringify(stock));
    this.router.navigate(['/stockSell', stock.stockName]);
  }

  navigateToDashboard() {
    this.router.navigate(['/stocks-dashboard']);
  }

  navigateToOptions() {
    this.router.navigate(['/options']);
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
}
