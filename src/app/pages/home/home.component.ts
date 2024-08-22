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
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContentComponent, CommonModule, FormsModule, LucideAngularModule],
  providers: [ApiCurrencyService],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  protected siglas: string[] = [];
  protected historico: IHistory[] = [];

  protected primeiraSigla: string = '';
  protected inputPrimeiraSigla: number = 0;
  protected segundaSigla: string = '';

  protected cotacaoMinima: number = 0;
  protected resultado: number = 0;

  protected urlPrimeiraSigla: string = '';

  protected showHistoric: boolean = false;

  constructor(private apiCurrency: ApiCurrencyService) {}

  protected realizarConversao() {
    if (this.primeiraSigla !== '' && this.segundaSigla !== '') {
      this.apiCurrency
        .realizarConversao(this.primeiraSigla, this.segundaSigla)
        .subscribe((data) => {
          this.cotacaoMinima = data.conversion_rate;
          this.resultado = this.inputPrimeiraSigla * data.conversion_rate;
        });

      this.historico.push({
        dataHora: new Date().toLocaleString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        }),
        sigla1: this.primeiraSigla,
        valor1: this.inputPrimeiraSigla,
        sigla2: this.segundaSigla,
        valor2: this.resultado,
      });
    }
  }

  ngOnInit(): void {
    this.apiCurrency.listarSiglasPaises().subscribe((data) => {
      this.siglas = data.supported_codes.map((item) => item[0]);
    });
  }
}

interface IHistory {
  dataHora: string;
  sigla1: string;
  valor1: number;
  sigla2: string;
  valor2: number;
}
