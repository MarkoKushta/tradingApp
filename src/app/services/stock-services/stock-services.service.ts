import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockServicesService {

  constructor(private http: HttpClient) {}

  searchStocks(symbol: string): Observable<any> {

    let stocksUrl = `https://localhost:44385/api/Stocks/${symbol}`;

    return this.http.get(stocksUrl);

  }

}


