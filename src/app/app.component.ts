import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { BottomNavbarComponent } from './shared/components/bottom-navbar/bottom-navbar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [RouterOutlet, BottomNavbarComponent, HeaderComponent, MatSnackBarModule],
  selector: 'tp-fil-rouge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly translateService = inject(TranslateService);

  public ngOnInit() {
    this.translateService.use('fr');
    this.translateService.setDefaultLang('en');
  }
}
