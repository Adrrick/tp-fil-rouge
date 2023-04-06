import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tp-fil-rouge-switch-language',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './switch-language.component.html',
  styleUrls: ['./switch-language.component.scss'],
})
export class SwitchLanguageComponent {
  public readonly translateService = inject(TranslateService);

  languages = [
    { key: 'en', label: 'english' },
    { key: 'fr', label: 'french' },
  ]

  public switchLanguage(lang: string) {
    this.translateService.use(lang);
  }

  public isCurrentLanguage(lang: string) {
    return this.translateService.currentLang === lang;
  }
}
