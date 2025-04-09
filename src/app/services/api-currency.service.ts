import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, Subject } from 'rxjs';
import { IConversionRateResponse } from '../entities/conversion-rate';
import { ICountryCodesResponse } from '../entities/contry-codes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class ApiCurrencyService {
  private _statesInitial$ = new BehaviorSubject<string[]>([]);

  public readonly statesInitial$ = this._statesInitial$.asObservable();

  private _conversionRate$ = new BehaviorSubject<number>(0);

  public readonly conversionRate$ = this._conversionRate$.asObservable();

  constructor(private httpClient: HttpClient, private destroyRef: DestroyRef) {
    this.getStateInitials();
  }

  private getStateInitials(): void {
    this.httpClient
      .get<ICountryCodesResponse>(
        'https://v6.exchangerate-api.com/v6/56574e96dd31305f65bbb010/codes'
      )
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((data) => data.supported_codes.map((item) => item[0])),
        catchError((error) => {
          console.log('Erro ao buscar as siglas dos paises.', error);
          alert('Erro ao buscar as siglas dos paises.');
          return of([]);
        })
      )
      .subscribe(this._statesInitial$);
  }

  public convertCoin(firstInitial: string, secondInitial: string): void {
    this.httpClient
      .get<IConversionRateResponse>(
        `https://v6.exchangerate-api.com/v6/56574e96dd31305f65bbb010/pair/${firstInitial}/${secondInitial}`
      )
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((data: IConversionRateResponse) => data.conversion_rate),
        catchError((error) => {
          console.log('Erro ao converter moeda:', error);
          alert('Erro ao converter moeda:');
          return of(0);
        })
      )
      .subscribe((result) => this._conversionRate$.next(result));
  }
}
