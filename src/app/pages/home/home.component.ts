import { Component, Input } from '@angular/core';
import { ContentComponent } from '../../components/content/content.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContentComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  @Input() selectedUrl: string = '';
  onSelectChange(event: any): void {
    this.selectedUrl = event.target.value;
  }
  list: ITag[] = [
    {
      tag: 'USD',
      url: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    },
    {
      tag: 'BRL',
      url: 'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg',
    },
    {
      tag: 'EUR',
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg',
    },
    {
      tag: 'JPY',
      url: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg',
    },
    {
      tag: 'GBP',
      url: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg',
    },
    {
      tag: 'AUD',
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg',
    },
    {
      tag: 'CAD',
      url: 'https://upload.wikimedia.org/wikipedia/en/c/cf/Flag_of_Canada.svg',
    },
    {
      tag: 'CHF',
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg',
    },
    {
      tag: 'CNY',
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    },
    {
      tag: 'SEK',
      url: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg',
    },
    {
      tag: 'NZD',
      url: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg',
    },
    {
      tag: 'MXN',
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg',
    },
    {
      tag: 'SGD',
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg',
    },
    {
      tag: 'HKD',
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Flag_of_Hong_Kong.svg',
    },
    {
      tag: 'NOK',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg',
    },
    {
      tag: 'KRW',
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg',
    },
    {
      tag: 'TRY',
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg',
    },
    {
      tag: 'RUB',
      url: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg',
    },
    {
      tag: 'INR',
      url: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg',
    },
    {
      tag: 'ZAR',
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg',
    },
    {
      tag: 'PLN',
      url: 'https://upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg',
    },
    {
      tag: 'ILS',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg',
    },
  ];
}

interface ITag {
  tag: string;
  url: string;
}
