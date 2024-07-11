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
  protected siglas: string[] = [];

  protected primeiraSigla: string = '';
  protected inputPrimeiraSigla: number = 0;
  protected segundaSigla: string = '';

  protected cotacaoMinima: number = 0;
  protected resultado: number = 0;

  protected urlPrimeiraSigla: string = '';

  constructor(private apiCurrency: ApiCurrencyService) {}

  protected realizarConversao() {
    if (this.primeiraSigla !== '' && this.segundaSigla !== '') {
      this.apiCurrency
        .realizarConversao(this.primeiraSigla, this.segundaSigla)
        .subscribe((data) => {
          this.cotacaoMinima = data.conversion_rate;
          this.resultado = this.inputPrimeiraSigla * data.conversion_rate;
        });
    }
  }

  protected infoBandeira() {
    let info = this.apiCurrency
      .infoBandeira('BRL')
      .subscribe((data) => data.flags);
    console.log(info);
  }

  ngOnInit(): void {
    this.apiCurrency.listarSiglasPaises().subscribe((data) => {
      this.siglas = data.supported_codes.map((item) => item[0]);
    });
  }
}
