import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { StocksDashboardComponent } from './components/stocks-dashboard/stocks-dashboard.component';
import { StocksComponent } from './components/stocks/stocks.component';


const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'stocks-dashboard', component: StocksDashboardComponent},
  {path:'stocks/:symbol', component: StocksComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
