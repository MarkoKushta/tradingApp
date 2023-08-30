import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StockServicesService } from '../services/stock-services/stock-services.service';
import { UserServicesService } from '../services/user-services/user-services.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {


    symbol: any;
    intervalId: any;
    currentQuantity: any;
    userId : any;
    marketStatus!: string;
    stockId : any;
    latestPrice : any;
    Quantity: any;
    Balance: any;
    userName: any;
    email: any;
    showPasswordForm = false;
    showUsernameForm = false;
    showEmailForm = false;
    oldPassword: string = '';
    newPassword: string = '';
    passwordChanged = false;
    newEmail: string = '';
    emailChanged = false;
    newUsername: string = '';
    usernameChanged = false;
    isKycCompleted: any;


    ngOnInit() {
      const stock = JSON.parse(localStorage.getItem('stock') || '{}');
      this.symbol = stock.stockName;
      this.stockId = stock.id;
      this.userId = stock.userId;
      this.currentQuantity = stock.quantity;
      this.userName = localStorage.getItem('userName');
      this.email = localStorage.getItem('email');
      this.getBalance();
      this.isKycCompleted = localStorage.getItem('isKycCompleted');
      //this.Price();
      this.intervalId = setInterval(() => {
      //  this.Price();
      //  this.updateMarketStatus();
      }, 5 * 60 * 1000);

     // this.updateMarketStatus();

    }


    constructor(
      private stockService: StockServicesService,
      private route: ActivatedRoute,
      private cookieService: CookieService,
      private router : Router,
      private userService: UserServicesService
    ) {}

    ngOnDestroy() {
      clearInterval(this.intervalId);
    }

    /*
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
/*
    sellMyStock() {
      this.stockService
        .sellStock(this.symbol, this.userId, this.Quantity, this.stockId, this.latestPrice)
        .subscribe((response) => {
          console.log(response);
          this.router.navigate(['/portfolio']);
        });
      this.getBalance();
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

    changePassword() {
      this.userService.changePassword(this.userId, this.oldPassword, this.newPassword)
        .subscribe(response => {
          // Handle the response
          console.log(response);
          console.log(this.oldPassword);
          console.log(this.newPassword);


          this.passwordChanged = true;
          this.showPasswordForm = false;
        }, error => {
          // Handle any errors
          console.error(error);
          this.passwordChanged = false;
        });
    }

    changeUsername() {
      this.userService.changeUsername(this.userId, this.newUsername)
        .subscribe(response => {
          // Handle the response
          console.log(response);
          console.log(this.newUsername);

          this.usernameChanged = true;
          this.userName = this.newUsername
          this.showUsernameForm = false;
        }, error => {
          // Handle any errors
          console.error(error);
          this.passwordChanged = false;
        });
    }

    changeEmail() {
      this.userService.changeEmail(this.userId, this.newEmail)
        .subscribe(response => {
          // Handle the response
          console.log(response);
          console.log(this.newEmail);

          this.emailChanged = true;
          this.email = this.newEmail;
          this.showPasswordForm = false;
        }, error => {
          // Handle any errors
          console.error(error);
          this.emailChanged = false;
        });
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
