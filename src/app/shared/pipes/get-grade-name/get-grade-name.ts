import { Pipe, PipeTransform } from '@angular/core';
import User from 'src/app/models/User';
import { GradeService } from '../../services/grade.service';

@Pipe({
  name: 'getGradeName',
  standalone: true,
})
export class getGradeNamePipe implements PipeTransform {
  constructor(private gradeService: GradeService) { }

  transform(user: User): string {
    return this.gradeService.getGradeName(user.moviesSeen.length)
  }
}
