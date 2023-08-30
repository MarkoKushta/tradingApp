import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { StocksDashboardComponent } from './components/stocks-dashboard/stocks-dashboard.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { StockServicesService } from './services/stock-services/stock-services.service';
import { FormsModule } from '@angular/forms';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { StockSellComponent } from './components/stock-sell/stock-sell.component';
import { OptionsComponent } from './components/options/options.component';
import { KycFormComponent } from './components/kyc-form/kyc-form.component';
import { AuthGuardGuard } from './auth-guard.guard';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // Add AuthGuardGuard to canActivate property of protected routes
  {
    path: 'stocks-dashboard',
    component: StocksDashboardComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'stocks/:symbol',
    component: StocksComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'stockSell/:symbol',
    component: StockSellComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'options',
    component: OptionsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'kyc',
    component: KycFormComponent,
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
