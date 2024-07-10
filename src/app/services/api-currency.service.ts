import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCurrencyService {
  constructor(private httpClient: HttpClient) {}

  listarPaises(): Observable<ICode[]> {
    return this.httpClient.get<ICode[]>(
      'https://v6.exchangerate-api.com/v6/56574e96dd31305f65bbb010/codes'
    );
  }
}

export interface ICode {
  supported_codes: Array<string[]>;
}
