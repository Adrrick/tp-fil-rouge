import { Injectable, inject } from '@angular/core';
import grades from '../constants/grades';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private readonly translateService = inject(TranslateService);


  getGradeName(moviesSeenNb: number): string {
    const gradeName = grades.find(grade => grade.moviesSeenNb <= moviesSeenNb)?.name || "unknown";
    return this.translateService.instant(gradeName);
  }
}