import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ContentComponent } from '../../components/content/content.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiCurrencyService } from '../../services/api-currency.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContentComponent, CommonModule, FormsModule],
  providers: [ApiCurrencyService],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  protected primeiraSigla: string = '';
  protected inputPrimeiraSigla: number = 0;
  protected segundaSigla: string = '';
  protected inputSegundaSigla: number = 0;
  protected resultado: number = 0;
  protected siglas: string[] = [];

  constructor(private apiCurrency: ApiCurrencyService) {}

  protected setPrimeiraSigla(e: any) {
    this.primeiraSigla = e.target.value;
  }
  protected setSegundaSigla(e: any) {
    this.segundaSigla = e.target.value;
  }

  protected realizarConversao() {
    if (this.primeiraSigla !== '' && this.segundaSigla !== '') {
      this.apiCurrency
        .realizarConversao(this.primeiraSigla, this.segundaSigla)
        .subscribe((data) => {
          this.resultado = this.inputPrimeiraSigla * data.conversion_rate;
        });
    }
  }

  ngOnInit(): void {
    this.apiCurrency.listarSiglasPaises().subscribe((data) => {
      this.siglas = data.supported_codes.map((item) => item[0]);
    });
  }
}
