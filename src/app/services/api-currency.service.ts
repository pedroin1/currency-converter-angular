import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCurrencyService {
  constructor(private httpClient: HttpClient) {}

  public listarSiglasPaises(): Observable<ICountryCodesResponse> {
    return this.httpClient.get<ICountryCodesResponse>(
      'https://v6.exchangerate-api.com/v6/56574e96dd31305f65bbb010/codes'
    );
  }

  public realizarConversao(
    primeiraSigla: string,
    segundaSigla: string
  ): Observable<IConversionRateResponse> {
    return this.httpClient.get<IConversionRateResponse>(
      `https://v6.exchangerate-api.com/v6/56574e96dd31305f65bbb010/pair/${primeiraSigla}/${segundaSigla}`
    );
  }

  public infoBandeira(siglaBandeira: string): Observable<IFlags[]> {
    return this.httpClient.get<IFlags[]>(
      `https://restcountries.com/v3.1/currency/${siglaBandeira}`
    );
  }
}

export interface ICountryCodesResponse {
  result: string;
  supported_codes: Array<string[]>;
}
export interface IConversionRateResponse {
  result: string;
  conversion_rate: number;
}

export interface IFlags {
  flags: FlagsType;
}

interface FlagsType {
  png: string;
  svg: string;
  alt: string;
}
