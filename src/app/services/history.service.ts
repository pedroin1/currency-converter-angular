import { Injectable } from '@angular/core';
import { IHistory } from '../entities/history';

const DATE_NOW = new Date().toLocaleString('pt-BR', {
  timeZone: 'America/Sao_Paulo',
});

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private _history: IHistory[] = [];

  constructor() {}

  public getHistory(): IHistory[] {
    return this._history;
  }

  public saveHistory(
    firstInitial: string,
    firstInitialValue: number,
    secondInitial: string,
    secondInitialValue: number
  ): void {
    this._history.push({
      dataHora: DATE_NOW,
      sigla1: firstInitial,
      valor1: firstInitialValue,
      sigla2: secondInitial,
      valor2: secondInitialValue,
    });
  }
}
