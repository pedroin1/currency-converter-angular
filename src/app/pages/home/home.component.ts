import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ContentComponent } from '../../components/content/content.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiCurrencyService } from '../../services/api-currency.service';
import { LucideAngularModule } from 'lucide-angular';
import { HistoryService } from '../../services/history.service';
import { combineLatest } from 'rxjs';
import { createCoinConverterFrom } from '../../form/coin-converter-form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ContentComponent,
    CommonModule,
    FormsModule,
    LucideAngularModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  providers: [ApiCurrencyService],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  protected conversionRate = signal<number>(0);
  protected showHistory = signal<boolean>(false);
  protected coinConverterForm = createCoinConverterFrom();

  constructor(
    protected apiCurrencyService: ApiCurrencyService,
    protected historyService: HistoryService,
    private destroyRef: DestroyRef
  ) {}

  protected handleShowHistory() {
    this.showHistory.update((value) => (value = !value));
  }

  protected handleCotationResult() {
    return (
      this.coinConverterForm.controls.firstInitialValue.value! *
      this.conversionRate()
    );
  }

  private handleConvertCoin() {
    const combinedInputsValue$ = combineLatest([
      this.coinConverterForm.controls.firstInitial.valueChanges,
      this.coinConverterForm.controls.firstInitialValue.valueChanges,
      this.coinConverterForm.controls.secondInitial.valueChanges,
    ]);

    combinedInputsValue$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([firstInital, firstInitialValue, secondInitial]) => {
        this.apiCurrencyService.convertCoin(firstInital!, secondInitial!);
        this.onSaveHistory(firstInital!, firstInitialValue!, secondInitial!);
      });
  }

  private onSaveHistory(
    firstInitial: string,
    firstInitialValue: number,
    secondInitial: string
  ) {
    this.historyService.saveHistory(
      firstInitial,
      firstInitialValue,
      secondInitial,
      this.coinConverterForm.controls.secondInitialValue.value!
    );
  }

  private getConversionRate() {
    this.apiCurrencyService.conversionRate$.subscribe((result: number) => {
      this.conversionRate.set(result);
    });
  }

  ngOnInit(): void {
    this.handleConvertCoin();
    this.getConversionRate();
  }
}
