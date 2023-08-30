import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StocksTable } from 'src/app/models/StocksTable.model';

@Injectable({
  providedIn: 'root'
})
export class StockServicesService {

  private apiUrl = 'https://localhost:44385/api/Stocks';

  constructor(private http: HttpClient) {}

  searchStocks(symbol: any): Observable<any> {

    let stocksUrl = `${this.apiUrl}/${symbol}`;

    return this.http.get(stocksUrl);

  }

  buyStock(symbol: any, userId: any, stocksObj: StocksTable, quantity: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${symbol}/buyStock?userId=${userId}&quantity=${quantity}`,
      stocksObj
    );
  }

  getBuyingPrice(userId: any, stockId: any) : Observable<any>{
    return this.http.get(`${this.apiUrl}/getBuyingPrice/${userId}?stockId=${stockId}`);
  }

  sellStock(symbol: any, userId: any, quantity: any, stockId: any, price:any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${symbol}/sellStock?userId=${userId}&quantity=${quantity}&stockId=${stockId}&price=${price}`, {}
      );
  }

  getStocksByUser(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAllStocksByUser/${userId}`);
  }

  getBalanceByUser(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetBalanceByUser/${userId}`);
  }


}


