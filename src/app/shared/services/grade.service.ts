import { Injectable } from '@angular/core';
import grades from '../constants/grades';


@Injectable({
  providedIn: 'root'
})
export class GradeService {

  getGradeName(moviesSeenNb: number): string {
    return grades.find(grade => grade.moviesSeenNb <= moviesSeenNb)?.name || "Inconnu";
  }
}