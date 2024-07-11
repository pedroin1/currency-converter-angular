import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCurrencyService {
  constructor(private httpClient: HttpClient) {}

  public listarSiglasPaises(): Observable<IResponseExchageApi> {
    return this.httpClient.get<IResponseExchageApi>(
      'https://v6.exchangerate-api.com/v6/56574e96dd31305f65bbb010/codes'
    );
  }

  public realizarConversao(
    primeiraSigla: string,
    segundaSigla: string
  ): Observable<IResponseExchage> {
    return this.httpClient.get<IResponseExchage>(
      `https://v6.exchangerate-api.com/v6/56574e96dd31305f65bbb010/pair/${primeiraSigla}/${segundaSigla}`
    );
  }

  public infoBandeira(siglaBandeira: string): Observable<IFlags> {
    return this.httpClient.get<IFlags>(
      `https://restcountries.com/v3.1/currency/${siglaBandeira}`
    );
  }
}

export interface IResponseExchageApi {
  result: string;
  documentation: string;
  terms_of_use: string;
  supported_codes: Array<string[]>;
}
export interface IResponseExchage {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  target_code: string;
  conversion_rate: number;
}

export interface IFlags {
  flags: Flags;
}

type Flags = 'png' | 'svg' | 'alt';
