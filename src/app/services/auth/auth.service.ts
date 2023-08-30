import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl: string = "https://localhost:44385/api/User/"
  constructor(private http : HttpClient) { }

  signUp(userObj : any) {

    return this.http.post<any>(`${this.apiUrl}register`, userObj);

  }

  login(loginObj : any){

    return this.http.post<any>(`${this.apiUrl}authenticate`, loginObj);

  }

  isAuthenticated(): boolean {
    // Check if user is authenticated
    // For example, you can check if a token is stored in localStorage
    const token = localStorage.getItem('token');
    return !!token;
  }

}
