import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { StocksDashboardComponent } from './components/stocks-dashboard/stocks-dashboard.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { CookieService } from 'ngx-cookie-service';
import { StockSellComponent } from './components/stock-sell/stock-sell.component';
import { OptionsComponent } from './components/options/options.component';
import { KycFormComponent } from './components/kyc-form/kyc-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    StocksDashboardComponent,
    StocksComponent,
    PortfolioComponent,
    StockSellComponent,
    OptionsComponent,
    KycFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
