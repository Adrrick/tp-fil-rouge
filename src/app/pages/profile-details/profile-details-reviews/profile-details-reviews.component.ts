import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import Review from 'src/app/models/Review';

@Component({
  selector: 'tp-fil-rouge-profile-details-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-details-reviews.component.html',
  styleUrls: ['./profile-details-reviews.component.scss'],
})
export class ProfileDetailsReviewsComponent{
  @Input() reviews?: Review[];

  constructor(
    private route: ActivatedRoute,
    private usersService: UserService
  ) {}
}
