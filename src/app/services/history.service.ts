import { Injectable } from '@angular/core';
import { IHistory } from '../entities/history';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private history: IHistory[] = [];

  constructor() {}

  public getHistory(): IHistory[] {
    return this.history;
  }

  public saveHistory(
    dataHora: string,
    sigla1: string,
    valor1: number,
    sigla2: string,
    valor2: number
  ): void {
    this.history.push({ dataHora, sigla1, valor1, sigla2, valor2 });
  }
}
