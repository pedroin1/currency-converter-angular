import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ApiCurrencyService } from './services/api-currency.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, FooterComponent, HeaderComponent],
  providers: [ApiCurrencyService],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'coin-conversor-angular';
}
