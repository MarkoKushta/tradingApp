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

  marketStatus!: string;
  intervalId: any;
  userId = localStorage.getItem('userId');
  Balance: any;
  isKycCompleted: any;
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



  ngOnInit() {
    this.updateMarketStatus();
    this.getBalance();
    this.intervalId = setInterval(() => {
      this.updateMarketStatus();
    }, 5 * 60 * 1000);
  }

  //searchQuery = '';
  filteredStocks: string[] = this.stocks;
/*
  searchStocks(): void {
    this.filteredStocks = this.stocks.filter(stock => stock.toLowerCase().includes(this.searchQuery.toLowerCase()));
    this.currentPage = 1;
  }
*/

  currentPage = 1;
  itemsPerPage = 7;

  constructor(
    private stockService: StockServicesService,
    private router: Router
  ) {}


  get randomInt(): number {
    return Math.floor(Math.random() * (500 - 100 + 1)) + 100;
  }

  get totalPages(): number {
    return Math.ceil(this.stocks.length / this.itemsPerPage);
  }

  get paginatedStocks(): string[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

	  return this.stocks.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  navigateToStocks(symbol: string) {
	  this.router.navigate(['/stocks', symbol]);
  }

  navigateToPortfolio() {
    this.router.navigate(['/portfolio']);
  }

  getBalance() {
    console.log(this.userId);
    this.stockService.getBalanceByUser(this.userId).subscribe(
      (balance) => {
        // Round down balance to nearest integer
        this.Balance = Math.floor(balance.balance);
        console.log(this.Balance);

        if(balance.status === 0){
          this.isKycCompleted = 'False';
        }
        else{
          this.isKycCompleted = 'True';
        }
        localStorage.setItem('isKycCompleted', this.isKycCompleted);
        console.log(this.isKycCompleted);
        return this.Balance;
      },
      (error) => {
        // Handle error
        console.error(error);
      }
    );
  }

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

  navigateToDashboard() {
    this.router.navigate(['/stocks-dashboard']);
  }

  navigateToOptions() {
    this.router.navigate(['/options']);
  }


}
