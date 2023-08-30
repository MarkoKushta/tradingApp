import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  private apiUrl = 'https://localhost:44385/api/User'
  constructor(private http : HttpClient) { }

  changePassword(userId: number, oldPassword: string, newPassword: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/ChangePassword?Id=${userId}&oldPassword=${oldPassword}&newPassword=${newPassword}`, {}
    );
  }

  changeEmail(userId: number, newEmail: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/ChangeEmail?Id=${userId}&newEmail=${newEmail}`, {}
    );
  }

  changeUsername(userId: number, newUsername: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/ChangeUsername?Id=${userId}&newUsername=${newUsername}`, {}
    );
  }

  postKYC(userId: any, kycObj : any){
    return this.http.post<any>(`${this.apiUrl}/KYC?userId=${userId}`, kycObj);
  }

  addMoney(userId : any, Amount: any ){
    return this.http.post<any>(`${this.apiUrl}/AddMoney?dollas=${Amount}&userId=${userId}`, {});
  }

}
