import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { BottomNavbarComponent } from './shared/components/bottom-navbar/bottom-navbar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FullScreenLoaderComponent } from './shared/components/full-screen-loader/full-screen-loader.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, BottomNavbarComponent, HeaderComponent, MatSnackBarModule, FullScreenLoaderComponent],
  selector: 'tp-fil-rouge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly translateService = inject(TranslateService);
  private readonly router = inject(Router);

  loadingRoute = false;

  public ngOnInit() {
    this.translateService.use('en');
    this.translateService.setDefaultLang('en');

    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRoute = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRoute = false;
      }
    });
  }
}
