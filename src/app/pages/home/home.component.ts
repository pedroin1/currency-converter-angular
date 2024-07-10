import { Component, Input, OnInit } from '@angular/core';
import { ContentComponent } from '../../components/content/content.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiCurrencyService, ICode } from '../../services/api-currency.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContentComponent, CommonModule, FormsModule],
  providers: [ApiCurrencyService],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  @Input() selectedUrl: string = '';

  private list: string[] = [];

  constructor(private apiCurrency: ApiCurrencyService) {}

  onSelectChange(event: any): void {
    this.selectedUrl = event.target.value;
  }

  ngOnInit(): void {
    this.apiCurrency.listarPaises().subscribe((data) => {
      this.list = data.map((item) => item.supported_codes[0]);
    });
    console.log(this.list);
  }
}

interface ITag {
  tag: string;
  url: string;
}
