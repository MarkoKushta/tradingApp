import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { StocksDashboardComponent } from './components/stocks-dashboard/stocks-dashboard.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { StockServicesService } from './services/stock-services/stock-services.service';
import { FormsModule } from '@angular/forms';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { StockSellComponent } from './stock-sell/stock-sell.component';
import { OptionsComponent } from './options/options.component';
import { KycFormComponent } from './components/kyc-form/kyc-form.component';



const routes: Routes = [

  {path: '', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'stocks-dashboard', component: StocksDashboardComponent},
  {path:'stocks/:symbol', component: StocksComponent},
  {path: 'portfolio', component: PortfolioComponent},
  {path:'stockSell/:symbol', component: StockSellComponent},
  {path:'options', component: OptionsComponent},
  {path:'kyc', component: KycFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
